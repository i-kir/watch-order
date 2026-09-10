import type { Series } from '@/lib/types';

/**
 * トランスフォーマーは「どこまでが繋がっているか」が公式に曖昧なまま置かれている。
 * 『バンブルビー』(2018) はバンブルビーの地球到着を1987年としており、
 * ベイ版1作目(2007年到着)と噛み合わない。それでも製作陣はリブートとも
 * 前日譚とも明言していない。
 *
 * 年代順は公開順と大きく異なるので、こちらはタブを出す。
 * ただし上の矛盾があるため、年代順が唯一の正解とは書かない。
 */
export const transformers: Series = {
  slug: 'transformers',
  category: 'film',
  name: 'トランスフォーマー',
  tagline: 'バンブルビーは作り直しなのか、前日譚なのか',
  description:
    'トランスフォーマーの映画は8作あります。マイケル・ベイ監督の5作（2007〜2017年）のあと、『バンブルビー』（2018年）から作風も設定も切り替わりました。ところが製作陣は、これを作り直しとも前日譚とも明言していません。実際、バンブルビーが地球に来た年が両者で食い違っています。さらにアニメの『ONE』が加わり、関係はいっそう分かりにくくなりました。このページでは、どこまでが繋がっているのかを整理しています。',
  films: [
    {
      slug: 'tf1',
      title: 'トランスフォーマー',
      originalTitle: 'Transformers',
      year: 2007,
      setting: '2007年',
      note: 'マイケル・ベイ監督。実写シリーズの1作目。バンブルビーが地球に来たのはこの年という設定',
    },
    {
      slug: 'revenge',
      title: 'トランスフォーマー／リベンジ',
      originalTitle: 'Transformers: Revenge of the Fallen',
      year: 2009,
      setting: '2009年',
      note: '1作目の直接の続き',
    },
    {
      slug: 'dotm',
      title: 'トランスフォーマー／ダークサイド・ムーン',
      originalTitle: 'Transformers: Dark of the Moon',
      year: 2011,
      setting: '2011年',
      note: 'ベイ版の主人公サムが登場する最後の作品',
    },
    {
      slug: 'age-of-extinction',
      title: 'トランスフォーマー／ロストエイジ',
      originalTitle: 'Transformers: Age of Extinction',
      year: 2014,
      setting: '2010年代半ば',
      note: '主人公が交代する。前3作の出来事は踏まえられている',
    },
    {
      slug: 'last-knight',
      title: 'トランスフォーマー／最後の騎士王',
      originalTitle: 'Transformers: The Last Knight',
      year: 2017,
      setting: '2017年頃',
      note: 'ベイ版の最終作',
    },
    {
      slug: 'bumblebee',
      title: 'バンブルビー',
      originalTitle: 'Bumblebee',
      year: 2018,
      setting: '1987年',
      note: 'ゆるやかな作り直し。バンブルビーが1987年に地球へ来たことになっており、ベイ版1作目の設定と噛み合わない',
    },
    {
      slug: 'rise-of-the-beasts',
      title: 'トランスフォーマー／ビースト覚醒',
      originalTitle: 'Transformers: Rise of the Beasts',
      year: 2023,
      setting: '1994年',
      note: '『バンブルビー』の続き。ベイ版との繋がりは意図的に曖昧にされている',
    },
    {
      slug: 'tf-one',
      title: 'トランスフォーマー／ONE',
      originalTitle: 'Transformers One',
      year: 2024,
      setting: '太古のサイバトロン星',
      note: 'アニメ。オプティマスとメガトロンが敵対する前を描く。実写版の直接の前日譚ではないと監督が明言している',
    },
  ],
  releaseOrder: [
    'tf1',
    'revenge',
    'dotm',
    'age-of-extinction',
    'last-knight',
    'bumblebee',
    'rise-of-the-beasts',
    'tf-one',
  ],
  // 太古のサイバトロン星 → 1987年 → 1994年 → 2007年以降、と公開順とは別の並びになる
  chronoOrder: [
    'tf-one',
    'bumblebee',
    'rise-of-the-beasts',
    'tf1',
    'revenge',
    'dotm',
    'age-of-extinction',
    'last-knight',
  ],
  recommendedLabel: 'いま観るならこの2本から',
  recommendedDescription:
    '『バンブルビー』とその続編だけを観る順です。ベイ版5作を観ていなくても入れるように作られており、作風も落ち着いています。8作すべてを追う必要はありません。',
  recommendedOrder: [
    {
      slug: 'bumblebee',
      reason: '1987年が舞台。ベイ版5作の予習は要らず、単体で完結している',
    },
    { slug: 'rise-of-the-beasts', reason: '『バンブルビー』の7年後にあたる続き' },
    { slug: 'tf-one', reason: 'アニメ。実写を観ていなくても入れる独立した1本' },
  ],
  caveats: [
    'このシリーズ最大の分かりにくさは、『バンブルビー』（2018年）がベイ版5作と繋がるのかが公式に示されていない点です。作中ではバンブルビーが1987年に地球へ来ますが、ベイ版1作目では2007年に来たことになっています。両立しない設定ですが、製作陣は作り直しとも前日譚とも明言していません。',
    '実務的には、『バンブルビー』以降を新しいシリーズとして扱うのが分かりやすいです。『ビースト覚醒』（2023年）は『バンブルビー』の続きとして作られており、ベイ版との連続性には触れていません。',
    'ベイ版5作（2007〜2017年）は互いに繋がっています。ただし『ロストエイジ』で主人公が交代するため、前半3作と後半2作で登場人物が入れ替わります。',
    'アニメの『トランスフォーマー／ONE』（2024年）について、ジョシュ・クーリー監督は「これまでの実写版の直接的なプリクエルというわけではない」と述べています。オプティマスとメガトロンが敵対する前を描く独立した作品で、実写を観ていなくても入れます。',
    '1986年のアニメ映画『トランスフォーマー ザ・ムービー』は、1980年代のTVアニメの続きにあたる別の作品です。ここに挙げた8作とは繋がりません。',
    '年代順のタブを用意していますが、上に書いた矛盾があるため、これが唯一の正解というわけではありません。『バンブルビー』の1987年とベイ版の2007年は、そのままでは両立しません。',
  ],
  sources: [
    {
      label: '『トランスフォーマー／ONE』は実写映画の直接的な前日譚ではない（THE RIVER）',
      url: 'https://theriver.jp/tf-one-not-direct-prequel/',
    },
    {
      label: 'トランスフォーマー映画の見る順番と時系列（エンタメ文化史研究所）',
      url: 'https://rekidai-sakuhin.com/entry/Transformers',
    },
  ],
};
