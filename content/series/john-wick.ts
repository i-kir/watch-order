import type { Series } from '@/lib/types';

/**
 * 本編4作は一続きで、順番に迷う余地がない。
 * 唯一の論点が『バレリーナ』(2025) で、公開は『コンセクエンス』(2023) の後なのに、
 * 作中では『パラベラム』と同時期、つまり『コンセクエンス』より前にあたる。
 * ここだけで年代順タブを出す価値がある。
 */
export const johnWick: Series = {
  slug: 'john-wick',
  category: 'film',
  name: 'ジョン・ウィック',
  tagline: '『バレリーナ』だけが、公開順と作中の順番で入れ替わる',
  description:
    'ジョン・ウィックの本編4作は一続きで、それぞれ前作の直後から始まります。順番に迷う余地はほとんどありません。唯一の論点が2025年の『バレリーナ』です。公開は『コンセクエンス』（2023年）の後ですが、作中では『パラベラム』と同時期、つまり『コンセクエンス』より前の出来事を描いています。このページでは、この1点がどう影響するかを整理しています。',
  films: [
    {
      slug: 'jw1',
      title: 'ジョン・ウィック',
      originalTitle: 'John Wick',
      year: 2014,
      note: '第1作。引退した殺し屋が愛犬を殺されて戻る',
    },
    {
      slug: 'jw2',
      title: 'ジョン・ウィック：チャプター2',
      originalTitle: 'John Wick: Chapter 2',
      year: 2017,
      note: '第1作の数日後から始まる',
    },
    {
      slug: 'jw3',
      title: 'ジョン・ウィック：パラベラム',
      originalTitle: 'John Wick: Chapter 3 - Parabellum',
      year: 2019,
      note: '前作の直後。1分後から始まる',
    },
    {
      slug: 'ballerina',
      title: 'バレリーナ The World of John Wick',
      originalTitle: 'Ballerina',
      year: 2025,
      setting: '『パラベラム』と同時期',
      note: '公開順では最新作だが、作中では『パラベラム』と同時期で、『コンセクエンス』より前にあたる。ジョン・ウィックも登場する',
    },
    {
      slug: 'jw4',
      title: 'ジョン・ウィック：コンセクエンス',
      originalTitle: 'John Wick: Chapter 4',
      year: 2023,
      note: '本編の完結編',
    },
  ],
  releaseOrder: [
    'jw1',
    'jw2',
    'jw3',
    'jw4',
    'ballerina',
  ],
  // 『バレリーナ』だけが公開順と入れ替わる
  chronoOrder: [
    'jw1',
    'jw2',
    'jw3',
    'ballerina',
    'jw4',
  ],
  recommendedLabel: '初めて観る人の順',
  recommendedDescription:
    '本編を順番に観て、『バレリーナ』を『コンセクエンス』の前に挟む順です。『バレリーナ』にはジョン・ウィック本人が登場し、『パラベラム』を観ていることが前提になっています。',
  recommendedOrder: [
    { slug: 'jw1', reason: '第1作。予備知識は要らない' },
    { slug: 'jw2', reason: '第1作の数日後から始まる' },
    { slug: 'jw3', reason: '前作の1分後から始まる' },
    {
      slug: 'ballerina',
      reason: '『パラベラム』と同時期。ここで観るのが作中の流れに沿う',
    },
    { slug: 'jw4', reason: '本編の完結編' },
  ],
  caveats: [
    '本編4作は一続きです。『チャプター2』は第1作の数日後、『パラベラム』は前作の1分後から始まります。この4作は公開順に観れば問題ありません。',
    '唯一の例外が『バレリーナ』（2025年）です。公開は『コンセクエンス』（2023年）の後ですが、作中では『パラベラム』と同時期の出来事で、『コンセクエンス』より前にあたります。ジョン・ウィック本人も登場します。',
    '『バレリーナ』を『コンセクエンス』の後に観ても話は分かりますが、『コンセクエンス』の結末を知ったうえで観ることになるため、作中の時間の流れとは逆になります。気にする場合は『パラベラム』の次に観てください。',
    'ドラマ『ザ・コンチネンタル』（2023年）は、本編の40年以上前にあたる1970年代を描く前日譚です。映画だけを追う場合、観ていなくても支障はありません。',
  ],
  sources: [
    {
      label: '『バレリーナ The World of John Wick』作品情報（映画.com）',
      url: 'https://eiga.com/movie/103607/',
    },
    {
      label: 'バレリーナ:The World of John Wick - Wikipedia',
      url: 'https://ja.wikipedia.org/wiki/%E3%83%90%E3%83%AC%E3%83%AA%E3%83%BC%E3%83%8A:The_World_of_John_Wick',
    },
  ],
};
