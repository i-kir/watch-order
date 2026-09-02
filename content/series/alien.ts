import type { Series } from '@/lib/types';

export const alien: Series = {
  slug: 'alien',
  name: 'エイリアン',
  tagline: '前日譚が後から作られ、時系列が入れ子になったシリーズ',
  description:
    '1979年の『エイリアン』から始まる本編4作に、後年に作られた前日譚『プロメテウス』『コヴェナント』、そして『1』と『2』の間を描く『ロムルス』を加えた7作。',
  films: [
    { slug: 'alien', title: 'エイリアン', originalTitle: 'Alien', year: 1979, setting: '2122年' },
    { slug: 'aliens', title: 'エイリアン2', originalTitle: 'Aliens', year: 1986, setting: '2179年' },
    { slug: 'alien3', title: 'エイリアン3', originalTitle: 'Alien³', year: 1992, setting: '2179年', note: '『2』の直後。冷凍睡眠期間を加味して2180年前後とする説もある' },
    { slug: 'alien4', title: 'エイリアン4', originalTitle: 'Alien: Resurrection', year: 1997, setting: '2379年', note: '前作から200年後' },
    { slug: 'prometheus', title: 'プロメテウス', originalTitle: 'Prometheus', year: 2012, setting: '2093年', note: '太古の描写と2089年の遺跡発見シーンを含む。主部は2093年' },
    { slug: 'covenant', title: 'エイリアン: コヴェナント', originalTitle: 'Alien: Covenant', year: 2017, setting: '2104年' },
    { slug: 'romulus', title: 'エイリアン: ロムルス', originalTitle: 'Alien: Romulus', year: 2024, setting: '2142年', note: '『エイリアン』と『エイリアン2』の間の時代' },
  ],
  releaseOrder: ['alien', 'aliens', 'alien3', 'alien4', 'prometheus', 'covenant', 'romulus'],
  chronoOrder: ['prometheus', 'covenant', 'alien', 'romulus', 'aliens', 'alien3', 'alien4'],
  recommendedOrder: [
    { slug: 'alien', reason: 'すべての原点。まずこの1本です' },
    { slug: 'aliens', reason: '作風が一変します。この2本でシリーズの評価はほぼ決まっています' },
    { slug: 'romulus', reason: '1作目と2作目の間の話。前の2本を観ていると最も効きます' },
    { slug: 'alien3', reason: 'ここから先は好みが分かれます。無理に観る必要はありません' },
    { slug: 'alien4' },
    { slug: 'prometheus', reason: '前日譚。単独作として観ても成立します' },
    { slug: 'covenant', reason: 'エイリアンの起源に触れる一作' },
  ],
  caveats: [
    '時系列順で観ると『プロメテウス』から始まりますが、初見には勧めません。『プロメテウス』はシリーズを知っている前提で「起源」を描いており、1作目の恐怖が先に説明されてしまいます。',
    '『エイリアンVS.プレデター』2作はこのシリーズに含めていません。2004年の地球にゼノモーフがいる設定が、『プロメテウス』（2093年）以降が示す起源と両立しないためです。公式に正史と明言されたことも確認できませんでした。',
    '邦題の表記ゆれがあります（「エイリアン: コヴェナント」「エイリアン：コヴェナント」など、コロンが全角・半角で混在）。',
  ],
  sources: [
    { label: 'エイリアン: ロムルス | Wikipedia', url: 'https://ja.wikipedia.org/wiki/%E3%82%A8%E3%82%A4%E3%83%AA%E3%82%A2%E3%83%B3:%E3%83%AD%E3%83%A0%E3%83%AB%E3%82%B9' },
    { label: 'エイリアン シリーズの時系列 | SCREEN ONLINE', url: 'https://screenonline.jp/_ct/17717701' },
  ],
};
