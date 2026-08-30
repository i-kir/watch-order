import type { Series } from '@/lib/types';

export const wizardingWorld: Series = {
  slug: 'wizarding-world',
  name: 'ウィザーディング・ワールド',
  tagline: 'ハリー・ポッター8作＋ファンタスティック・ビースト3作',
  description:
    '『ハリー・ポッター』シリーズと、その約60年前を描く『ファンタスティック・ビースト』シリーズ。公開順と時系列順が大きく食い違う代表例です。',
  films: [
    { slug: 'hp1', title: 'ハリー・ポッターと賢者の石', originalTitle: "Harry Potter and the Philosopher's Stone", year: 2001, setting: '1991〜1992年' },
    { slug: 'hp2', title: 'ハリー・ポッターと秘密の部屋', originalTitle: 'Harry Potter and the Chamber of Secrets', year: 2002, setting: '1992〜1993年' },
    { slug: 'hp3', title: 'ハリー・ポッターとアズカバンの囚人', originalTitle: 'Harry Potter and the Prisoner of Azkaban', year: 2004, setting: '1993〜1994年' },
    { slug: 'hp4', title: 'ハリー・ポッターと炎のゴブレット', originalTitle: 'Harry Potter and the Goblet of Fire', year: 2005, setting: '1994〜1995年' },
    { slug: 'hp5', title: 'ハリー・ポッターと不死鳥の騎士団', originalTitle: 'Harry Potter and the Order of the Phoenix', year: 2007, setting: '1995〜1996年' },
    { slug: 'hp6', title: 'ハリー・ポッターと謎のプリンス', originalTitle: 'Harry Potter and the Half-Blood Prince', year: 2009, setting: '1996〜1997年' },
    { slug: 'hp7a', title: 'ハリー・ポッターと死の秘宝 PART1', originalTitle: 'Harry Potter and the Deathly Hallows – Part 1', year: 2010, setting: '1997〜1998年' },
    { slug: 'hp7b', title: 'ハリー・ポッターと死の秘宝 PART2', originalTitle: 'Harry Potter and the Deathly Hallows – Part 2', year: 2011, setting: '1998年', note: 'エピローグのみ19年後（2017年）' },
    { slug: 'fb1', title: 'ファンタスティック・ビーストと魔法使いの旅', originalTitle: 'Fantastic Beasts and Where to Find Them', year: 2016, setting: '1926年' },
    { slug: 'fb2', title: 'ファンタスティック・ビーストと黒い魔法使いの誕生', originalTitle: 'Fantastic Beasts: The Crimes of Grindelwald', year: 2018, setting: '1927年' },
    { slug: 'fb3', title: 'ファンタスティック・ビーストとダンブルドアの秘密', originalTitle: 'Fantastic Beasts: The Secrets of Dumbledore', year: 2022, setting: '1932年', note: '作中の台詞からは1927年とも読め、矛盾が指摘されている。ここでは公式設定の1932年を採用' },
  ],
  releaseOrder: ['hp1', 'hp2', 'hp3', 'hp4', 'hp5', 'hp6', 'hp7a', 'hp7b', 'fb1', 'fb2', 'fb3'],
  chronoOrder: ['fb1', 'fb2', 'fb3', 'hp1', 'hp2', 'hp3', 'hp4', 'hp5', 'hp6', 'hp7a', 'hp7b'],
  recommendedOrder: [
    { slug: 'hp1', reason: 'まずは本編から。世界の説明が最も丁寧です' },
    { slug: 'hp2' },
    { slug: 'hp3' },
    { slug: 'hp4' },
    { slug: 'hp5' },
    { slug: 'hp6' },
    { slug: 'hp7a' },
    { slug: 'hp7b', reason: '本編はここで完結します' },
    { slug: 'fb1', reason: '約60年前の前日譚。本編を知っているほど楽しめます' },
    { slug: 'fb2' },
    { slug: 'fb3' },
  ],
  caveats: [
    '時系列順は『ファンタスティック・ビースト』3作が先に来ますが、初見でこの順は勧めません。魔法界の説明が本編のほうが親切で、前日譚は本編の知識を前提にした仕掛けが多いためです。',
    '『ダンブルドアの秘密』の設定年には矛盾が指摘されています。制作側の設定は1932年ですが、作中の台詞は1927年とも読めます。',
    '舞台劇『呪いの子』は映像化されていないため含めていません。',
  ],
  sources: [
    { label: 'Harry Potter & Fantastic Beasts Official Timeline | Screen Rant', url: 'https://screenrant.com/harry-potter-fantastic-beasts-timeline-official-fantastic-beasts-3/' },
  ],
};
