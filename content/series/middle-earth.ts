import type { Series } from '@/lib/types';

export const middleEarth: Series = {
  slug: 'middle-earth',
  name: '中つ国（ロード・オブ・ザ・リング／ホビット）',
  tagline: '公開順と時系列順が、まるごと逆になるシリーズ',
  description:
    'ピーター・ジャクソン監督による中つ国の実写映画6作。『ホビット』3部作は『ロード・オブ・ザ・リング』の約60年前を描くため、公開順と時系列順が前半と後半で入れ替わります。',
  films: [
    { slug: 'fotr', title: 'ロード・オブ・ザ・リング', originalTitle: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, setting: '第三紀3001〜3019年', note: 'プロローグは第二紀（最後の同盟の戦い）' },
    { slug: 'ttt', title: 'ロード・オブ・ザ・リング／二つの塔', originalTitle: 'The Lord of the Rings: The Two Towers', year: 2002, setting: '第三紀3019年' },
    { slug: 'rotk', title: 'ロード・オブ・ザ・リング／王の帰還', originalTitle: 'The Lord of the Rings: The Return of the King', year: 2003, setting: '第三紀3019年' },
    { slug: 'hobbit1', title: 'ホビット 思いがけない冒険', originalTitle: 'The Hobbit: An Unexpected Journey', year: 2012, setting: '第三紀2941年', note: '冒頭に第三紀2770年のエレボール陥落、第三紀3001年のビルボの執筆場面を枠として含む' },
    { slug: 'hobbit2', title: 'ホビット 竜に奪われた王国', originalTitle: 'The Hobbit: The Desolation of Smaug', year: 2013, setting: '第三紀2941年' },
    { slug: 'hobbit3', title: 'ホビット 決戦のゆくえ', originalTitle: 'The Hobbit: The Battle of the Five Armies', year: 2014, setting: '第三紀2941年' },
  ],
  releaseOrder: ['fotr', 'ttt', 'rotk', 'hobbit1', 'hobbit2', 'hobbit3'],
  chronoOrder: ['hobbit1', 'hobbit2', 'hobbit3', 'fotr', 'ttt', 'rotk'],
  recommendedOrder: [
    { slug: 'fotr', reason: 'まずは本編から。中つ国の説明が最も丁寧で、シリーズの評価もここが最高です' },
    { slug: 'ttt' },
    { slug: 'rotk', reason: '本編はここで完結します。ここまでで満足しても構いません' },
    { slug: 'hobbit1', reason: '約60年前の前日譚。本編を知っているほど、指輪の意味が効いてきます' },
    { slug: 'hobbit2' },
    { slug: 'hobbit3' },
  ],
  caveats: [
    '時系列順では『ホビット』3部作が先に来ますが、初見では勧めません。『ホビット』は本編を観た人が「あの指輪はこうして見つかった」と分かる作りになっており、先に観ると仕掛けが機能しません。',
    '日本公開年は本国と異なります（『ロード・オブ・ザ・リング』は2002年2月公開）。ここでは本国公開年で並べています。',
    '劇場版と、より長いエクステンデッド・エディションがあります。初見なら劇場版で十分です。',
  ],
  sources: [
    { label: 'アルダの年表 | Wikipedia', url: 'https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%AB%E3%83%80%E3%81%AE%E5%B9%B4%E8%A1%A8' },
  ],
};
