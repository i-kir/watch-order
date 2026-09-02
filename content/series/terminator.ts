import type { Series } from '@/lib/types';

/**
 * リブートのたびに時間軸が分岐し、6作を一直線に並べることはできない。
 * 軸ごとの整理を caveats で示す。
 */
export const terminator: Series = {
  slug: 'terminator',
  name: 'ターミネーター',
  tagline: 'リブートのたびに時間軸が分岐し、正解が3つある',
  description:
    '実写映画6作。『2』のあとが3つの時間軸に分かれており、どれを正史とみなすかで観る順番が変わります。『ニュー・フェイト』は『3』『4』『ジェニシス』を明確に別時間軸として扱っています。',
  films: [
    { slug: 't1', title: 'ターミネーター', originalTitle: 'The Terminator', year: 1984, setting: '1984年（未来パートは2029年）', note: 'すべての軸に共通する出発点' },
    { slug: 't2', title: 'ターミネーター2', originalTitle: 'Terminator 2: Judgment Day', year: 1991, setting: '1995年', note: 'すべての軸に共通。ここから分岐する' },
    { slug: 't3', title: 'ターミネーター3', originalTitle: 'Terminator 3: Rise of the Machines', year: 2003, setting: '2004年', note: '旧正史の軸。『2』で審判の日は回避されず「延期」されたという設定' },
    { slug: 't4', title: 'ターミネーター4', originalTitle: 'Terminator Salvation', year: 2009, setting: '2018年', note: '旧正史の軸。『3』の続き' },
    { slug: 'genisys', title: 'ターミネーター:新起動／ジェニシス', originalTitle: 'Terminator Genisys', year: 2015, setting: '2029年 → 1984年 → 2017年', note: '単独のリブート。『1』の物語を土台にした別世界で、他のどの作品にも接続しない' },
    { slug: 'dark-fate', title: 'ターミネーター:ニュー・フェイト', originalTitle: 'Terminator: Dark Fate', year: 2019, setting: '1998年（プロローグ）→ 2020年', note: '現行の正史。『2』の直接の続編で、『3』『4』『ジェニシス』を別時間軸として排除する' },
  ],
  releaseOrder: ['t1', 't2', 't3', 't4', 'genisys', 'dark-fate'],
  chronoOrder: ['t1', 't2', 'dark-fate', 't3', 't4', 'genisys'],
  recommendedLabel: '現行の正史で観る',
  recommendedDescription:
    '『ニュー・フェイト』が公式に認めている流れです。3本で完結し、話も一番きれいにつながります。',
  recommendedOrder: [
    { slug: 't1', reason: 'すべての始まり' },
    { slug: 't2', reason: 'シリーズ最高傑作。ここまでの2本で完成しているとも言われます' },
    { slug: 'dark-fate', reason: '『2』の直接の続編。これで現行の正史は完結します' },
    { slug: 't3', reason: 'ここからは別の時間軸。『2』のあとの「もうひとつの続き」として観てください' },
    { slug: 't4', reason: '『3』の続き。同じ軸です' },
    { slug: 'genisys', reason: 'さらに別のリブート。他とはつながりません' },
  ],
  caveats: [
    '6作を一列の時系列に並べることはできません。『2』のあとが3つの軸に分かれているためです。時系列順は便宜上、現行正史（1・2・ニュー・フェイト）を先に置き、旧正史（3・4）、リブート（ジェニシス）と続けています。',
    '軸1（現行の正史）: ターミネーター → 2 → ニュー・フェイト',
    '軸2（旧正史）: ターミネーター → 2 → 3 → 4',
    '軸3（単独のリブート）: ジェニシス',
    '『2』のどの時点で歴史が分岐したのかは、公式に明示されていません。作品側の説明は「歴史が改変されたため審判の日の日付が変わった」までです。',
  ],
  sources: [
    { label: 'ターミネーターシリーズ | Wikipedia', url: 'https://ja.wikipedia.org/wiki/%E3%82%BF%E3%83%BC%E3%83%9F%E3%83%8D%E3%83%BC%E3%82%BF%E3%83%BC%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA' },
    { label: 'ターミネーター:ニュー・フェイト | Wikipedia', url: 'https://ja.wikipedia.org/wiki/%E3%82%BF%E3%83%BC%E3%83%9F%E3%83%8D%E3%83%BC%E3%82%BF%E3%83%BC:%E3%83%8B%E3%83%A5%E3%83%BC%E3%83%BB%E3%83%95%E3%82%A7%E3%82%A4%E3%83%88' },
  ],
};
