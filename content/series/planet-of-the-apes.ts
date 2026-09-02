import type { Series } from '@/lib/types';

/**
 * 3つの独立した連続性からなる。
 * 一列に並べること自体が正確ではないため、caveats で明示する。
 */
export const planetOfTheApes: Series = {
  slug: 'planet-of-the-apes',
  name: '猿の惑星',
  tagline: '3つの別シリーズが同じ名前で存在する',
  description:
    '1968年からの旧シリーズ5作、2001年のティム・バートン版、2011年からの新シリーズ4作。この3つは互いに接続しない別の物語です。どれを観たいのかで、観る順番が変わります。',
  films: [
    { slug: 'apes1968', title: '猿の惑星', originalTitle: 'Planet of the Apes', year: 1968, setting: '3978年', note: '旧シリーズ。宇宙船の打ち上げは1972年、船内時間では約18か月' },
    { slug: 'beneath', title: '続・猿の惑星', originalTitle: 'Beneath the Planet of the Apes', year: 1970, setting: '前作直後（3978〜3979年頃）', note: '旧シリーズ。作中に年代の明示なし' },
    { slug: 'escape', title: '新・猿の惑星', originalTitle: 'Escape from the Planet of the Apes', year: 1971, setting: '1973年', note: '旧シリーズ。未来から現代へのタイムスリップで、ここから因果が円環になる' },
    { slug: 'conquest', title: '猿の惑星・征服', originalTitle: 'Conquest of the Planet of the Apes', year: 1972, setting: '1991年', note: '旧シリーズ' },
    { slug: 'battle', title: '最後の猿の惑星', originalTitle: 'Battle for the Planet of the Apes', year: 1973, setting: '2003年（枠物語として2670年）', note: '旧シリーズ' },
    { slug: 'burton', title: 'PLANET OF THE APES／猿の惑星', originalTitle: 'Planet of the Apes', year: 2001, setting: '2029年', note: '単独作。監督自身が「リメイクではなくリ・イマジネーション」と説明しており、他のどのシリーズにも接続しない' },
    { slug: 'rise', title: '猿の惑星：創世記（ジェネシス）', originalTitle: 'Rise of the Planet of the Apes', year: 2011, note: '新シリーズ。作中に西暦の明示なし' },
    { slug: 'dawn', title: '猿の惑星：新世紀（ライジング）', originalTitle: 'Dawn of the Planet of the Apes', year: 2014, note: '新シリーズ。『創世記』から10年後' },
    { slug: 'war', title: '猿の惑星：聖戦記（グレート・ウォー）', originalTitle: 'War for the Planet of the Apes', year: 2017, note: '新シリーズ。前作から2年後' },
    { slug: 'kingdom', title: '猿の惑星／キングダム', originalTitle: 'Kingdom of the Planet of the Apes', year: 2024, note: '新シリーズ。『聖戦記』から約300年後' },
  ],
  releaseOrder: ['apes1968', 'beneath', 'escape', 'conquest', 'battle', 'burton', 'rise', 'dawn', 'war', 'kingdom'],
  chronoOrder: ['rise', 'dawn', 'war', 'kingdom', 'escape', 'conquest', 'battle', 'apes1968', 'beneath', 'burton'],
  recommendedLabel: '今から観るなら',
  recommendedDescription:
    'いま観るなら新シリーズ4作からで十分です。旧シリーズとバートン版は別の物語なので、興味が出てからで構いません。',
  recommendedOrder: [
    { slug: 'rise', reason: '新シリーズの1作目。現代が舞台で、いま最も入りやすい入口です' },
    { slug: 'dawn' },
    { slug: 'war', reason: 'シーザーの物語はここで完結します。ここまでで一区切りです' },
    { slug: 'kingdom', reason: '約300年後の続編。前3作を観ていると重みが違います' },
    { slug: 'apes1968', reason: 'ここから旧シリーズ。1968年の作品ですが、結末は今でも有名です' },
    { slug: 'beneath' },
    { slug: 'escape' },
    { slug: 'conquest' },
    { slug: 'battle' },
    { slug: 'burton', reason: '完全な独立作。順番を気にせず、いつ観ても構いません' },
  ],
  caveats: [
    'このシリーズを一列の時系列に並べることは、本来できません。旧シリーズ・バートン版・新シリーズは互いに接続しない別の物語だからです。時系列順は便宜上、新シリーズ → 旧シリーズ → バートン版の順にまとめています。',
    '旧シリーズは因果が円環になっています。『続』で地球が滅び、そこから脱出した猿が『新』で現代にタイムスリップし、その子孫が『征服』『最後』を経て『猿の惑星』の世界を作る、という構造です。そのため「起点」を機械的には決められません。',
    '旧シリーズには公式に解消されていない矛盾があります。『新・猿の惑星』では地球消滅を「3955年」と説明しますが、『猿の惑星』の船内表示は3978年です。',
    '新シリーズが旧シリーズにつながるという公式設定は確認できませんでした。そう解釈する記事もありますが、非公式です。',
    '新シリーズの作中年代は劇中に明示がありません。2026年ごろと推定する記事もありますが、公式設定ではないため、ここでは相対年（何年後か）だけを記載しています。',
  ],
  sources: [
    { label: '猿の惑星シリーズ | Wikipedia', url: 'https://ja.wikipedia.org/wiki/%E7%8C%BF%E3%81%AE%E6%83%91%E6%98%9F%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA' },
    { label: '猿の惑星／キングダム | Wikipedia', url: 'https://ja.wikipedia.org/wiki/%E7%8C%BF%E3%81%AE%E6%83%91%E6%98%9F/%E3%82%AD%E3%83%B3%E3%82%B0%E3%83%80%E3%83%A0' },
  ],
};
