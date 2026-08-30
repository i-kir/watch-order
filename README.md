# 観る順ナビ

映画シリーズを観る順番を、**公開順・時系列順・おすすめ順**で比較できるサイトです。

Filmarks や個人ブログとの違いは2つ。

- **切り替えられる** — 記事は1つの順番しか示せませんが、ここでは並べ替えて比べられます
- **論点を隠さない** — 順番に異説がある箇所、公式設定に矛盾がある箇所を、出典つきで明記します

## 収録シリーズ

| シリーズ | 作品数 | 論点 |
| --- | --- | --- |
| マーベル・シネマティック・ユニバース | 37 | 公式順が設定年代の昇順になっていない箇所がある |
| スター・ウォーズ | 11 | 時系列順で観ると『帝国の逆襲』の仕掛けが潰れる |
| ウィザーディング・ワールド | 11 | 前日譚が本編の知識を前提にしている |
| X-MEN 映画シリーズ | 13 | 歴史改変で時系列が分岐しており、一直線に並ばない |
| ワイルド・スピード | 11 | 3作目が後年になって時系列上の位置を変えられた |

## 技術構成

| 領域 | 使用技術 |
| --- | --- |
| フレームワーク | Next.js 16（App Router） |
| UI | React 19 + TypeScript |
| スタイル | Tailwind CSS 4 |
| ホスティング | Vercel |

シリーズページは**静的生成**されます。検索エンジンに本文が届くことが、このサイトの前提だからです。

## セットアップ

**Node.js 20 以上が必要です。**

```bash
node -v          # v20 未満なら nvm install 20 && nvm use 20
npm install
npm run dev      # http://localhost:3000
```

## ディレクトリ構成

```
app/
├── page.tsx                シリーズ一覧
├── series/[slug]/page.tsx  各シリーズ（静的生成）
├── sitemap.ts / robots.ts
components/
└── WatchOrder.tsx          順番の切り替えと視聴済みチェック
content/series/             シリーズ定義（ここがこのサイトの中身）
lib/                        型と並べ替えのロジック
scripts/fetch-tmdb.mjs      ポスター画像とあらすじの取得（任意）
```

## シリーズを追加する

1. `content/series/新シリーズ.ts` を作る（既存ファイルが雛形になります）
2. `content/series/index.ts` の `seriesList` に足す

`releaseOrder` と `chronoOrder` は**全作品を過不足なく含む**必要があります。
slug の綴り違いや漏れは `npm run build` が検出して止めます。黙って作品が消えることはありません。

## ポスター画像を取り込む（任意）

```bash
# https://www.themoviedb.org/settings/api で無料のキーを取得
TMDB_API_KEY=xxxx node scripts/fetch-tmdb.mjs
```

`content/tmdb.json` が更新されます。**この結果はコミットしてください。**
ビルド時に API キーが不要になり、Vercel 側の設定も要らなくなります。

TMDb の規約により、画面に次の表記が必要です（`app/layout.tsx` に記載済み）。

> This product uses the TMDB API but is not endorsed or certified by TMDB.

## この試みの目的

これは**実験**です。確かめたいのは1つだけ。

> 「見る順番」系の検索需要は実在するのに、ツール化されていない。
> 静的生成のサイトを出したとき、実際に検索流入は取れるのか。

公開後は Google Search Console で表示回数と順位を見ます。
数字が出れば広告やアフィリエイトを検討し、出なければ「収益化は難しい」と結論して、
別のことに時間を使う判断材料にします。

## デプロイ

Vercel に GitHub リポジトリを接続すれば、push のたびに自動デプロイされます。
環境変数は `NEXT_PUBLIC_SITE_URL` を1つだけ設定してください（sitemap の絶対 URL に使います）。
