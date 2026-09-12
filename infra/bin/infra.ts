#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SiteStack } from '../lib/site-stack';

const app = new cdk.App();

// CloudFront に付ける証明書は us-east-1 にある必要がある。
// 別リージョンに置くとクロスリージョン参照が要り、構成が一段複雑になるので、
// S3 も含めてまとめて us-east-1 に置く。
// 配信は CloudFront が世界中のエッジから行うため、オリジンの位置は
// キャッシュが無いときの初回だけに影響する。
new SiteStack(app, 'WatchOrderSite', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-1' },
  domainName: 'miruorder.com',
  // 先に ACM で発行しておいた証明書の ARN。
  // Vercel の DNS で検証を通してから渡すことで、NS を切り替える前に
  // CloudFront を立てられる（切り替え中もサイトが止まらない）。
  certificateArn: app.node.tryGetContext('certificateArn'),
  // GitHub Actions から鍵なしでデプロイするための設定
  githubOwner: 'i-kir',
  githubRepo: 'watch-order',
  // GitHub の OIDC プロバイダはアカウントに1つしか作れない。
  // すでに別プロジェクトで作ってある場合は -c createOidcProvider=false を付ける。
  createOidcProvider: app.node.tryGetContext('createOidcProvider') !== 'false',
});
