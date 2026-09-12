import type { Series } from '@/lib/types';

/**
 * 論点はひとつ。『ファースト・エージェント』(2021) が第一次世界大戦期を描く前日譚で、
 * 本編2作とは100年ほど離れていること。
 * 登場人物が一人も重ならないので、どちらから観ても支障はない。
 */
export const kingsman: Series = {
  slug: 'kingsman',
  category: 'film',
  name: 'キングスマン',
  tagline: '3作目だけが100年前の話。どちらから観ても困らない',
  description:
    'キングスマンは3作あります。1作目と2作目は現代を舞台にした続きものですが、3作目の『ファースト・エージェント』だけは第一次世界大戦期が舞台で、キングスマンという組織がどう生まれたかを描いています。本編2作とは100年ほど離れており、登場人物も重なりません。このため、どちらから観ても支障はありません。このページでは、その違いを整理しています。',
  films: [
    {
      slug: 'kingsman1',
      title: 'キングスマン',
      originalTitle: 'Kingsman: The Secret Service',
      year: 2015,
      setting: '2010年代',
      note: '第1作。予備知識は要らない',
    },
    {
      slug: 'golden-circle',
      title: 'キングスマン：ゴールデン・サークル',
      originalTitle: 'Kingsman: The Golden Circle',
      year: 2017,
      setting: '2010年代',
      note: '第1作の直接の続き',
    },
    {
      slug: 'first-agent',
      title: 'キングスマン：ファースト・エージェント',
      originalTitle: "The King's Man",
      year: 2021,
      setting: '第一次世界大戦期',
      note: 'キングスマンという組織がどう生まれたかを描く前日譚。本編2作とは100年ほど離れている',
    },
  ],
  releaseOrder: [
    'kingsman1',
    'golden-circle',
    'first-agent',
  ],
  // 『ファースト・エージェント』(第一次世界大戦期) が先頭に来る
  chronoOrder: [
    'first-agent',
    'kingsman1',
    'golden-circle',
  ],
  recommendedLabel: '初めて観る人の順',
  recommendedDescription:
    '公開順そのままです。第1作が最も評価が高く、予備知識も要りません。『ファースト・エージェント』は作風がかなり違うので、本編2作を観てから判断するのが確実です。',
  recommendedOrder: [
    { slug: 'kingsman1', reason: '第1作。予備知識は要らない' },
    { slug: 'golden-circle', reason: '第1作の直接の続き' },
    {
      slug: 'first-agent',
      reason: '100年前の前日譚。作風が違うので、本編を観てから決めればよい',
    },
  ],
  caveats: [
    '『キングスマン：ファースト・エージェント』（2021年）は第一次世界大戦期が舞台で、本編2作より100年ほど前の出来事です。キングスマンという組織がどう生まれたかを描いています。',
    'ただし本編2作と登場人物が重ならないため、どちらを先に観ても支障はありません。年代順に観たい場合は『ファースト・エージェント』から始めても構いません。',
    '『ファースト・エージェント』は作風がかなり違います。本編2作が現代的なアクション・コメディなのに対し、こちらは戦争を題材にした重い場面が多くを占めます。同じ調子を期待すると印象が変わります。',
    '『キングスマン』（2015年）と『ゴールデン・サークル』（2017年）は続きものです。後者は前者の出来事を前提にしているので、この2本は順番に観てください。',
  ],
  sources: [
    {
      label: 'キングスマン（映画シリーズ）- Wikipedia',
      url: 'https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%B3%E3%82%B0%E3%82%B9%E3%83%9E%E3%83%B3',
    },
  ],
};
