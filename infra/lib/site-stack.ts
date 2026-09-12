import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as iam from 'aws-cdk-lib/aws-iam';

export type SiteStackProps = cdk.StackProps & {
  domainName: string;
  /** 先に ACM で発行済みの証明書 ARN（us-east-1） */
  certificateArn?: string;
  githubOwner: string;
  githubRepo: string;
  /** アカウントに GitHub の OIDC プロバイダがまだ無いなら true */
  createOidcProvider: boolean;
};

export class SiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SiteStackProps) {
    super(scope, id, props);

    const { domainName, certificateArn, githubOwner, githubRepo, createOidcProvider } = props;
    if (!certificateArn) {
      throw new Error(
        '証明書 ARN が渡されていません。先に ACM で証明書を発行し、\n' +
          '  npx cdk deploy -c certificateArn=arn:aws:acm:us-east-1:...\n' +
          'の形で渡してください（手順は README-aws.md を参照）。'
      );
    }

    // ── 置き場所 ───────────────────────────────────────────────
    // 公開はすべて CloudFront 経由。バケット自体は外から見えないようにする。
    const bucket = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      // 中身はビルドで作り直せるので、スタックを消したら一緒に消してよい
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // ── URL の形を合わせる ────────────────────────────────────
    // 静的書き出しでは /series/godzilla の実体が /series/godzilla.html になる。
    // S3 は拡張子を補ってくれないので、エッジで書き換える。
    // Lambda@Edge ではなく CloudFront Functions を使う（起動が速く、料金も桁違いに安い）。
    const rewrite = new cloudfront.Function(this, 'RewriteCleanUrls', {
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // /           → /index.html
  // /series/    → /series/index.html
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
    return request;
  }

  // 拡張子が付いていないものだけ .html を補う。
  // /_next/static/... や /sitemap.xml はそのまま通す。
  var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);
  if (lastSegment.indexOf('.') === -1) {
    request.uri = uri + '.html';
  }
  return request;
}
      `),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
    });

    const certificate = acm.Certificate.fromCertificateArn(this, 'Cert', certificateArn);

    // ── 配信 ───────────────────────────────────────────────────
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        // OAC。バケットポリシーは CDK が自動で付ける
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
        functionAssociations: [
          { function: rewrite, eventType: cloudfront.FunctionEventType.VIEWER_REQUEST },
        ],
      },
      domainNames: [domainName, `www.${domainName}`],
      certificate,
      defaultRootObject: 'index.html',
      // 静的書き出しの 404 ページを返す
      errorResponses: [
        { httpStatus: 403, responseHttpStatus: 404, responsePagePath: '/404.html', ttl: cdk.Duration.minutes(5) },
        { httpStatus: 404, responseHttpStatus: 404, responsePagePath: '/404.html', ttl: cdk.Duration.minutes(5) },
      ],
      // 日本からの閲覧が中心。北米・欧州・アジアのエッジで足りる
      priceClass: cloudfront.PriceClass.PRICE_CLASS_200,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      enableIpv6: true,
    });

    // ── DNS ────────────────────────────────────────────────────
    // ゾーンはこのスタックで作る。ネームサーバーの切り替えは、
    // CloudFront が動くことを確かめてから最後に行う。
    const zone = new route53.PublicHostedZone(this, 'Zone', { zoneName: domainName });

    new route53.ARecord(this, 'ApexA', {
      zone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });
    new route53.AaaaRecord(this, 'ApexAAAA', {
      zone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });
    new route53.ARecord(this, 'WwwA', {
      zone,
      recordName: 'www',
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });
    new route53.AaaaRecord(this, 'WwwAAAA', {
      zone,
      recordName: 'www',
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });

    // ── GitHub Actions から鍵なしでデプロイする ────────────────
    // アクセスキーを GitHub に置くと、漏れたときに取り消す手立てが要る。
    // OIDC なら一時credentialsだけで済み、保存する秘密が無くなる。
    // OIDC プロバイダはアカウントに1つだけ。既にあるなら作らずに参照する。
    // from... は存在確認をしないので、ここは try/catch では分岐できない。
    // どちらなのかは利用者しか知らないため、context で明示的に切り替える。
    const provider: iam.IOpenIdConnectProvider = createOidcProvider
      ? new iam.OpenIdConnectProvider(this, 'GithubOidc', {
          url: 'https://token.actions.githubusercontent.com',
          clientIds: ['sts.amazonaws.com'],
        })
      : iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
          this,
          'GithubOidc',
          `arn:aws:iam::${this.account}:oidc-provider/token.actions.githubusercontent.com`
        );

    const deployRole = new iam.Role(this, 'DeployRole', {
      roleName: 'watch-order-deploy',
      assumedBy: new iam.WebIdentityPrincipal(provider.openIdConnectProviderArn, {
        StringEquals: { 'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com' },
        // このリポジトリの main ブランチからのみ引き受けられる。
        // ここを緩めると、他のリポジトリからも本番を書き換えられてしまう。
        StringLike: {
          'token.actions.githubusercontent.com:sub': `repo:${githubOwner}/${githubRepo}:ref:refs/heads/main`,
        },
      }),
      // CloudFormation の Description は ASCII 系しか受け付けないため英語で書く
      description: 'Deploys the static site from GitHub Actions',
    });

    bucket.grantReadWrite(deployRole);
    bucket.grantDelete(deployRole);
    deployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['cloudfront:CreateInvalidation', 'cloudfront:GetInvalidation'],
        resources: [`arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`],
      })
    );

    // ── 出力 ───────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'BucketName', { value: bucket.bucketName });
    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });
    new cdk.CfnOutput(this, 'DistributionDomain', {
      value: distribution.distributionDomainName,
      // 切り替え前の動作確認に使う
      description: 'Open this before switching nameservers to verify the site',
    });
    new cdk.CfnOutput(this, 'DeployRoleArn', { value: deployRole.roleArn });
    new cdk.CfnOutput(this, 'NameServers', {
      value: cdk.Fn.join(' , ', zone.hostedZoneNameServers ?? []),
      // お名前.com に設定するネームサーバー（最後の手順）
      description: 'Nameservers to set at the registrar (final step)',
    });
  }
}
