# AWS への移管手順

現在は Vercel（Hobby プラン）で動いている。Hobby は非商用・個人利用に限られる
（[Vercel の記載](https://vercel.com/docs/plans/hobby)）ため、収益化するなら
Pro（月 $20）に上げるか、別の場所へ移す必要がある。AWS なら月 $0.5 程度で済む。

構成は S3 + CloudFront + Route 53 + ACM。サイトは全ページ事前生成の静的サイトなので、
サーバーは要らない。

## 順番を守る理由

ネームサーバーを先に切り替えると、証明書が発行されるまでの間サイトが止まる。
そこで **証明書を Vercel の DNS で検証してから CloudFront を立て、最後に
ネームサーバーを切り替える**。この順なら、切り替えの伝播中も
古い経路（Vercel）と新しい経路（CloudFront）の両方が同じサイトを返すので、
止まる瞬間が無い。

---

## 0. 事前確認（Vercel のままで壊れないこと）

`output: 'export'` を入れたので、まず Vercel 上で今までどおり動くか確かめる。
ここで壊れるなら、AWS へ行く前に直す。

```bash
npm run build          # out/ ができる
npx serve out          # 手元で開いて確認
```

push して Vercel のデプロイが通り、https://miruorder.com が今までどおりなら次へ。

## 1. 証明書を発行する（us-east-1）

CloudFront に付ける証明書は us-east-1 にある必要がある。

```bash
aws acm request-certificate \
  --region us-east-1 \
  --domain-name miruorder.com \
  --subject-alternative-names www.miruorder.com \
  --validation-method DNS \
  --query CertificateArn --output text
```

出た ARN を控える。続けて検証用の CNAME を確認する。

```bash
aws acm describe-certificate --region us-east-1 \
  --certificate-arn <上のARN> \
  --query 'Certificate.DomainValidationOptions[].ResourceRecord'
```

## 2. 検証用 CNAME を Vercel の DNS に追加する

Vercel ダッシュボード → Domains → miruorder.com → DNS Records で、
手順1で出た Name / Value を CNAME として追加する。
（Name は末尾の `.miruorder.com.` を除いた部分だけ入れる）

数分で発行される。確認：

```bash
aws acm describe-certificate --region us-east-1 \
  --certificate-arn <ARN> --query 'Certificate.Status'
# "ISSUED" になればよい
```

## 3. AWS 側を作る

```bash
cd infra
npm install
npx cdk bootstrap aws://<アカウントID>/us-east-1     # 初回のみ
npx cdk deploy -c certificateArn=<ARN>
```

すでに他プロジェクトで GitHub の OIDC プロバイダを作ってある場合は
`-c createOidcProvider=false` を足す（アカウントに1つしか作れない）。

出力される 5 つを控える。

| 出力 | 用途 |
| --- | --- |
| `BucketName` | GitHub の変数 `S3_BUCKET` |
| `DistributionId` | 同 `CLOUDFRONT_ID` |
| `DeployRoleArn` | 同 `AWS_DEPLOY_ROLE_ARN` |
| `DistributionDomain` | 切り替え前の動作確認に使う |
| `NameServers` | 手順6でお名前.com に入れる |

## 4. GitHub に変数を登録する

Settings → Secrets and variables → Actions → **Variables** タブに3つ。

- `S3_BUCKET`
- `CLOUDFRONT_ID`
- `AWS_DEPLOY_ROLE_ARN`

アクセスキーは登録しない。OIDC で一時的な権限だけを受け取る。

## 5. 中身を置いて、切り替え前に確認する

Actions から「本番へデプロイ」を手動実行する。完了後、
`DistributionDomain`（`dxxxx.cloudfront.net`）を開いて中身が出るか見る。

この時点ではまだ miruorder.com は Vercel を向いている。両方が生きている状態。

確認すること:
- トップが出る
- `/series/godzilla` が出る（拡張子なしで開けるか＝ CloudFront Function が効いているか）
- `/sitemap.xml` の中身が `https://miruorder.com` になっている
- 存在しない URL で 404 ページが出る

## 6. ネームサーバーを切り替える

お名前.com にログイン → ドメイン → ネームサーバーの変更 → 「その他」を選び、
手順3で出た `NameServers` の4つを入れる。

反映に数時間から48時間かかる。この間、古い経路は Vercel、新しい経路は
CloudFront を指すが、どちらも同じサイトを返すので問題ない。

確認：

```bash
dig +short NS miruorder.com
dig +short A miruorder.com
```

## 7. 後始末（切り替えが完全に終わってから）

- Vercel のプロジェクトから miruorder.com を削除する
- ACM の検証用 CNAME を Route 53 にも作っておく（更新時に必要）
- Search Console で sitemap.xml を再送信し、取得できるか見る

**7 は切り替えが完全に浸透してから行う。** 急いで Vercel 側を消すと、
まだ古い DNS を見ている利用者がサイトに入れなくなる。

---

## 移管で最も壊れやすい箇所

`NEXT_PUBLIC_SITE_URL` の設定漏れ。これが無いと `sitemap.xml` が
`http://localhost:3000` で書き出され、Search Console から見たサイトマップが
丸ごと無効になる。deploy.yml にビルド後の検査を入れてあり、
localhost が混じっていたらデプロイを止める。
