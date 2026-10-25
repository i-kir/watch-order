# 視聴先リンクの運用

## 現在の状態

- `content/watch-links.json` は空。アフィリエイト広告や広告タグは配信していない。
- 作品別の配信確認リンクは `content/providers.json` に既にある TMDB の `/watch` URL を利用する。出典は JustWatch（TMDB API 経由）。これは収益リンクではない。
- 配信データの取得日をボタン付近に表示する。見放題サービス名が空でも、作品別の確認URLが存在する場合はリンクを表示する。未取得や公開前の作品に架空のリンクを作らない。
- 「次に観る作品」は選択した順番・端末の視聴記録に連動する。作品カードのリンクと視聴済みチェックは独立している。

## 提携承認後の設定

提携先から発行されたURLを受け取ったら、`content/watch-links.json` に以下の形式で登録する。例のURLは実際のURLではなく、公開用に有効化しないこと。

```json
[
  {
    "seriesSlug": "godzilla",
    "filmSlug": "gojira-1954",
    "provider": "配信データと一致するサービス名",
    "url": "https://example.com/replace-with-approved-url",
    "enabled": false
  }
]
```

承認されたサイト・掲載方法・リンク先を確認し、実際の作品または作品を探せるページに差し替えてから `enabled: true` にする。短縮やパラメーターの付け替えをせず、発行URLをそのまま使う。報酬額・無料体験・料金・配信中の断定はこの設定から生成しない。

作品slugとサービス名が配信データに一致する場合だけ広告を表示する。配信データからサービスが消えると広告も非表示になる。これは取得日時点の照合なので、掲載前に最新の視聴可否も確認する。

広告リンク付近には「広告・PR」の表示を付け、リンクには `rel="sponsored noopener noreferrer"` を付ける。提携先で必要な広告表記・サイト情報などが追加であれば、公開前に対応する。

## 計測の接続

現在のサイトには GA4 の読み込みコードがない。今回の変更はイベント送信口だけであり、まだ GA4 に実データは蓄積されない。Search Consoleでも外部リンクのクリックは確認できない。

サイト用の測定IDを受け取り、GA4の導入と利用する計測に応じた案内を整えてから本番で送信確認する。`window.gtag` が使える場合、外部リンクのクリックで `watch_provider_click` を送る。

| パラメーター | 内容 |
| --- | --- |
| `series_slug` | シリーズ |
| `film_slug` | 作品 |
| `provider` | サービス名（配信確認は `TMDB`） |
| `placement` | `next_film` / `film_card` |
| `link_type` | `affiliate` / `availability` |
| `order` | `release` / `chrono` / `recommended` |

GA4でパラメーター別の分析をする場合は必要なカスタムディメンションを登録する。リンククリックは成約ではない。売上はASP側の承認成果と別に確認する。

GA4未設定時のQAではブラウザの `miruorder:watch_provider_click` カスタムイベントを利用できる。広告URL・視聴履歴・個人情報をイベントに含めない。

## 今回の検索改善

Search Console の2026-09-25〜2026-10-22のデータを基に、ゴジラ・キングスマン・猿の惑星だけタイトル、説明文、冒頭の短い順番案内を変更。既存のURL・canonical・順番データを維持する。

反映日を記録し、2〜4週間後にページ別・クエリ別で検索クリックとCTRを確認する。順位・検索需要の変化も併記し、CTRの変化だけで施策の因果効果を断定しない。

## 検証

```sh
node --test tests/watch-links.test.mjs
NEXT_PUBLIC_SITE_URL=https://miruorder.com npm run build
```

公開前にスマホとPCで順番切り替え、視聴済み保存、リンク先とチェックの独立動作を確認する。広告設定後はPR表記、`sponsored`、該当作品以外への誤表示がないことも確認する。
