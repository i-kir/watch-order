import type { Series } from '@/lib/types';

/**
 * Fate は「時系列順に観ると、いちばん大きな仕掛けが壊れる」典型例。
 * Fate/Zero は10年前を描く前日譚だが、書かれたのは stay night より後で、
 * stay night 側の重要な正体を先に明かしてしまう。
 * そのため、おすすめ順は年代順とも公開順とも一致しない。
 */
export const fate: Series = {
  slug: 'fate',
  name: 'Fate（ステイナイト系）',
  tagline: '前日譚のZeroを先に観ると、本編の仕掛けが壊れる',
  description:
    'Fate/stay night には Fate・Unlimited Blade Works・Heaven’s Feel という3つのルートがあり、これらは続き物ではなく、同じ2週間を別の結末までたどる並行世界です。さらに『Fate/Zero』が10年前を描く前日譚として存在します。Zero は前の時代の話なので年代順では最初に来ますが、本編の重要な正体を先に明かしてしまうため、最初に観るべきかどうかが最大の論点になります。',
  films: [
    {
      slug: 'zero',
      title: 'Fate/Zero',
      originalTitle: 'Fate/Zero',
      year: 2011,
      kind: 'tv',
      episodes: 25,
      setting: 'stay night の10年前',
      note: '第四次聖杯戦争を描く前日譚。2011年に1期、2012年に2期が放送された。stay night より後に作られている',
    },
    {
      slug: 'stay-night-2006',
      title: 'Fate/stay night（2006年版TVアニメ）',
      originalTitle: 'Fate/stay night',
      year: 2006,
      kind: 'tv',
      episodes: 24,
      note: 'スタジオディーン制作。原作のFateルートを軸に、他ルートの要素を混ぜた構成。映像は古く、いまから入るなら必須ではない',
    },
    {
      slug: 'ubw-movie-2010',
      title: '劇場版 Fate/stay night UNLIMITED BLADE WORKS',
      originalTitle: '劇場版 Fate/stay night UNLIMITED BLADE WORKS',
      year: 2010,
      note: 'スタジオディーンによるUBWルートの劇場版。2時間に圧縮されているため説明が足りず、2014年のTV版のほうが分かりやすい',
    },
    {
      slug: 'ubw-2014',
      title: 'Fate/stay night [Unlimited Blade Works]（TVアニメ）',
      originalTitle: 'Fate/stay night [Unlimited Blade Works]',
      year: 2014,
      kind: 'tv',
      episodes: 25,
      note: 'ufotable制作。2014年秋に1期、2015年春に2期。UBWルートを2クールかけて描く。現在いちばん薦められている入口',
    },
    {
      slug: 'hf-1',
      title: '劇場版 Fate/stay night [Heaven’s Feel] I. presage flower',
      originalTitle: '劇場版 Fate/stay night [Heaven’s Feel] I. presage flower',
      year: 2017,
      note: 'HFルート3部作の1作目。他ルートを観ている前提で省略が多い',
    },
    {
      slug: 'hf-2',
      title: '劇場版 Fate/stay night [Heaven’s Feel] II. lost butterfly',
      originalTitle: '劇場版 Fate/stay night [Heaven’s Feel] II. lost butterfly',
      year: 2019,
    },
    {
      slug: 'hf-3',
      title: '劇場版 Fate/stay night [Heaven’s Feel] III. spring song',
      originalTitle: '劇場版 Fate/stay night [Heaven’s Feel] III. spring song',
      year: 2020,
      note: 'HFルートの完結編。ここでstay nightの3ルートがすべて描かれたことになる',
    },
  ],
  releaseOrder: [
    'stay-night-2006',
    'ubw-movie-2010',
    'zero',
    'ubw-2014',
    'hf-1',
    'hf-2',
    'hf-3',
  ],
  chronoOrder: [
    'zero',
    'stay-night-2006',
    'ubw-movie-2010',
    'ubw-2014',
    'hf-1',
    'hf-2',
    'hf-3',
  ],
  recommendedLabel: '初見におすすめの順',
  recommendedDescription:
    'ufotable制作の[Unlimited Blade Works]から入り、Heaven’s Feelへ進み、Fate/Zeroを最後に置く順です。Zeroを最後に回すのは、Zeroが本編最大の正体を先に明かしてしまうためです。2006年版と2010年の劇場版は、この順では飛ばして構いません。',
  recommendedOrder: [
    {
      slug: 'ubw-2014',
      reason: '説明が丁寧で、予備知識なしで入れる。ここで世界の仕組みがひととおり分かる',
    },
    { slug: 'hf-1', reason: 'UBWと同じ2週間を、別の人物を軸に描き直す。UBWを観た前提で省略される' },
    { slug: 'hf-2' },
    { slug: 'hf-3', reason: 'ここでstay night本編が完結する' },
    {
      slug: 'zero',
      reason: '10年前の話。本編を観たあとだと、Zeroの結末が本編のどこに繋がるかが分かる',
    },
  ],
  caveats: [
    'Fate・Unlimited Blade Works・Heaven’s Feel の3ルートは、続き物ではありません。同じ2週間を、主人公が誰と組み、どう選択したかで別の結末までたどる並行世界です。そのため3つを順番に観ても話は前に進まず、同じ期間を3回たどることになります。',
    'Fate/Zero を最初に観るかどうかが最大の論点です。Zero は10年前を描く前日譚ですが、stay night より後に書かれており、本編で伏せられている重要な正体を先に明かしてしまいます。年代順に観ると、本編の仕掛けが機能しません。一方で Zero 単体の完成度は高く、「先に観ても面白かった」という声も多くあります。',
    '2006年版のTVアニメと2010年の劇場版UBWは、いずれも現在では入口として薦められません。2006年版は複数ルートを混ぜた独自構成で、2010年の劇場版は2時間にUBWルートを圧縮したため説明が不足しています。どちらも2014年のufotable版で置き換えられます。',
    'Heaven’s Feel 3部作は、他ルートを観ている前提で作られています。共通部分が省略されるため、いきなりHFから入ると人物の関係が分かりません。',
    'Fate/Apocrypha、Fate/EXTRA Last Encore、Fate/Grand Order の各アニメ、Fate/strange Fake、プリズマ☆イリヤは、いずれも stay night とは別の世界か別の物語です。上の順番に含める必要はなく、単独で観られます。',
  ],
  sources: [
    {
      label: 'Fate/stay night [Heaven’s Feel] 公式サイト',
      url: 'https://www.fate-sn.com/',
    },
    {
      label: 'Fate/Zero 公式サイト',
      url: 'https://www.fatezero.jp/',
    },
    {
      label: 'TYPE-MOON 公式サイト',
      url: 'https://typemoon.com/',
    },
  ],
};
