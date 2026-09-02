import type { Series } from '@/lib/types';

/**
 * 公開順＝物語順なので、本当の悩みは「無限列車編が劇場版とTV版の2つある」こと。
 * 3つ目の順番を「重複を省いて観る順」にして、そこだけを答えている。
 */
export const kimetsu: Series = {
  slug: 'kimetsu',
  name: '鬼滅の刃',
  tagline: '無限列車編が劇場版とTV版で2回ある。どちらを観るか',
  description:
    'アニメは公開された順に観れば物語がそのまま繋がります。ただし「無限列車編」だけは劇場版とTVアニメ版の両方が存在し、内容が重複します。どちらか一方でよいのか、両方観る意味があるのかが分かりにくい部分なので、その違いを明記しました。',
  films: [
    {
      slug: 'risshi',
      title: '鬼滅の刃 竈門炭治郎 立志編',
      originalTitle: '鬼滅の刃',
      year: 2019,
      kind: 'tv',
      episodes: 26,
      tmdbId: 85937,
      note: 'シリーズの最初。ここから観る',
    },
    {
      slug: 'mugen-movie',
      title: '劇場版「鬼滅の刃」無限列車編',
      originalTitle: '劇場版「鬼滅の刃」無限列車編',
      year: 2020,
      note: '立志編の直後から続く。国内興行収入404.3億円を記録した作品',
    },
    {
      slug: 'mugen-tv',
      title: '鬼滅の刃 無限列車編（TVアニメ）',
      originalTitle: '鬼滅の刃 無限列車編',
      year: 2021,
      kind: 'tv',
      episodes: 7,
      note: '第2話以降は劇場版の再構成。第1話「炎柱・煉獄杏寿郎」だけが完全新作で、劇場版には入っていない',
    },
    {
      slug: 'yukaku',
      title: '鬼滅の刃 遊郭編',
      originalTitle: '鬼滅の刃 遊郭編',
      year: 2021,
      kind: 'tv',
      episodes: 11,
      note: '無限列車編の続き。TV版無限列車編に続けて同じ枠で放送された',
    },
    {
      slug: 'katanakaji',
      title: '鬼滅の刃 刀鍛冶の里編',
      originalTitle: '鬼滅の刃 刀鍛冶の里編',
      year: 2023,
      kind: 'tv',
      episodes: 11,
    },
    {
      slug: 'hashira',
      title: '鬼滅の刃 柱稽古編',
      originalTitle: '鬼滅の刃 柱稽古編',
      year: 2024,
      kind: 'tv',
      episodes: 8,
      note: '最終決戦の前段にあたる。第8話が最終話',
    },
    {
      slug: 'mugenjo-1',
      title: '劇場版「鬼滅の刃」無限城編 第一章 猗窩座再来',
      originalTitle: '劇場版「鬼滅の刃」無限城編 第一章 猗窩座再来',
      year: 2025,
      note: '柱稽古編の直後から始まる。三部作の第一章',
    },
  ],
  releaseOrder: [
    'risshi',
    'mugen-movie',
    'mugen-tv',
    'yukaku',
    'katanakaji',
    'hashira',
    'mugenjo-1',
  ],
  // 放送・公開された順が、そのまま物語の順になっている
  chronoOrder: [
    'risshi',
    'mugen-movie',
    'mugen-tv',
    'yukaku',
    'katanakaji',
    'hashira',
    'mugenjo-1',
  ],
  recommendedLabel: '重複を省いて観る順',
  recommendedDescription:
    '内容が重なる「無限列車編」を1回だけ観る順です。劇場版のほうを観て、TVアニメ版は飛ばします。これで物語は最初から最新作まで繋がります。',
  recommendedOrder: [
    { slug: 'risshi', reason: '全26話。ここから始まる' },
    { slug: 'mugen-movie', reason: 'TV版無限列車編と同じ内容なので、こちらを観るなら次は遊郭編へ' },
    { slug: 'yukaku', reason: '劇場版の直後から続く。TV版無限列車編を飛ばしても話は繋がる' },
    { slug: 'katanakaji' },
    { slug: 'hashira' },
    { slug: 'mugenjo-1', reason: '現時点の最新作' },
  ],
  caveats: [
    '「無限列車編」は劇場版（2020年）とTVアニメ版（2021年、全7話）の両方があり、内容が重複します。どちらか一方を観れば物語は繋がります。',
    'ただしTVアニメ版の第1話「炎柱・煉獄杏寿郎」は完全新作で、劇場版には含まれていません。煉獄杏寿郎が無限列車に向かうまでを描いた話です。煉獄の描写を重視するなら、この第1話だけ追加で観る手もあります。',
    'TVアニメ版は劇場版に約70カットの新規作画と新規楽曲を加えた再構成版です。同じ話をもう一度観ることになるので、初見で時間を節約したい場合は劇場版だけで十分です。',
    '「無限城編」は三部作として制作されており、第一章の時点では物語は完結していません。',
  ],
  sources: [
    {
      label: '鬼滅の刃 公式サイト',
      url: 'https://kimetsu.com/anime/',
    },
    {
      label: 'アニメイトタイムズ「鬼滅の刃 見る順番」（各編の放送期間・話数）',
      url: 'https://www.animatetimes.com/news/details.php?id=1753333522',
    },
    {
      label: 'アニメイトタイムズ「無限列車編 第1話は完全新作エピソード」',
      url: 'https://www.animatetimes.com/news/details.php?id=1633772807',
    },
    {
      label: '映画.com「柱稽古編 最終話は第8話」',
      url: 'https://eiga.com/news/20240618/21/',
    },
  ],
};
