import type { Series } from '@/lib/types';

/**
 * X-MEN は『フューチャー&パスト』の歴史改変により、時系列が2本に分岐している。
 * 「1本の直線に並べる」こと自体が正確ではないため、その旨を caveats で明示する。
 */
export const xMen: Series = {
  slug: 'x-men',
  name: 'X-MEN 映画シリーズ',
  tagline: '時系列が分岐する、最も順番の難しいシリーズ',
  description:
    '20世紀フォックス版の X-MEN 映画13作。『フューチャー&パスト』の歴史改変で時系列が分岐しており、単純な一直線には並びません。',
  films: [
    { slug: 'x-men', title: 'X-メン', originalTitle: 'X-Men', year: 2000, note: '旧時系列。作中の年代は明示されず「近未来」表記のみ' },
    { slug: 'x2', title: 'X-MEN2', originalTitle: 'X2: X-Men United', year: 2003, note: '旧時系列。前作の直後' },
    { slug: 'last-stand', title: 'X-MEN：ファイナル ディシジョン', originalTitle: 'X-Men: The Last Stand', year: 2006, note: '旧時系列。『X-MEN2』の直後' },
    { slug: 'origins-wolverine', title: 'ウルヴァリン：X-MEN ZERO', originalTitle: 'X-Men Origins: Wolverine', year: 2009, setting: '1979年（プロローグ1845年〜）' },
    { slug: 'first-class', title: 'X-MEN：ファースト・ジェネレーション', originalTitle: 'X-Men: First Class', year: 2011, setting: '1962年' },
    { slug: 'the-wolverine', title: 'ウルヴァリン：SAMURAI', originalTitle: 'The Wolverine', year: 2013, note: '旧時系列。『ファイナル ディシジョン』の数年後。プロローグは1945年の長崎' },
    { slug: 'days-of-future-past', title: 'X-MEN：フューチャー&パスト', originalTitle: 'X-Men: Days of Future Past', year: 2014, setting: '1973年 ＋ 未来2023年', note: 'ここで時系列が分岐。1973年の改変により旧三部作の未来が消滅する' },
    { slug: 'deadpool', title: 'デッドプール', originalTitle: 'Deadpool', year: 2016, note: '公式な時系列上の位置は確定していない' },
    { slug: 'apocalypse', title: 'X-MEN：アポカリプス', originalTitle: 'X-Men: Apocalypse', year: 2016, setting: '1983年（プロローグ紀元前3600年）', note: '改変後の時系列' },
    { slug: 'logan', title: 'LOGAN／ローガン', originalTitle: 'Logan', year: 2017, setting: '2029年', note: '監督は「独立した未来」と説明しており、改変後時系列との接続には議論がある' },
    { slug: 'deadpool-2', title: 'デッドプール2', originalTitle: 'Deadpool 2', year: 2018, note: '前作の約2年後とされるが、時間移動描写により整理は困難' },
    { slug: 'dark-phoenix', title: 'X-MEN：ダーク・フェニックス', originalTitle: 'Dark Phoenix', year: 2019, setting: '1992年（プロローグ1975年）', note: '改変後の時系列。『ファイナル ディシジョン』とフェニックス編が重複・矛盾する' },
    { slug: 'new-mutants', title: 'ニュー・ミュータント', originalTitle: 'The New Mutants', year: 2020, note: '作中で年代の明示がなく、本編との接続も明示されていない' },
  ],
  releaseOrder: [
    'x-men', 'x2', 'last-stand', 'origins-wolverine', 'first-class', 'the-wolverine',
    'days-of-future-past', 'deadpool', 'apocalypse', 'logan', 'deadpool-2', 'dark-phoenix', 'new-mutants',
  ],
  chronoOrder: [
    'first-class', 'origins-wolverine', 'days-of-future-past', 'apocalypse', 'dark-phoenix',
    'x-men', 'x2', 'last-stand', 'the-wolverine', 'deadpool', 'deadpool-2', 'new-mutants', 'logan',
  ],
  recommendedOrder: [
    { slug: 'x-men', reason: '公開順の最初。ここから入るのが最も混乱しません' },
    { slug: 'x2' },
    { slug: 'last-stand', reason: '旧三部作の完結' },
    { slug: 'first-class', reason: '1962年が舞台の前日譚。ここから新しい流れが始まります' },
    { slug: 'days-of-future-past', reason: '新旧が交差し、歴史が書き換わる転換点。ここが最重要です' },
    { slug: 'apocalypse', reason: '改変後の世界' },
    { slug: 'dark-phoenix' },
    { slug: 'the-wolverine', reason: 'ローガン単独作。ポストクレジットが『フューチャー&パスト』に繋がります' },
    { slug: 'logan', reason: 'ローガンの物語の終着点。最後に観るのが最も効きます' },
    { slug: 'deadpool', reason: 'ここからは独立性が高く、いつ観ても構いません' },
    { slug: 'deadpool-2' },
    { slug: 'new-mutants' },
  ],
  caveats: [
    'このシリーズは「時系列順」を一直線に並べること自体が正確ではありません。『フューチャー&パスト』の歴史改変により、旧三部作＋『SAMURAI』と、改変後の『アポカリプス』『ダーク・フェニックス』は本来同じ線上に並びません。ここでは各作の作中年を昇順に並べたうえで、分岐を注記しています。',
    '『ウルヴァリン：X-MEN ZERO』はプロローグが1845年のため、それを基準に1位とする説もあります。ここでは主要部の1979年を基準にしました。',
    '『デッドプール』2作の時系列上の位置は、フォックスも公式に確定していません。',
    '『デッドプール&ウルヴァリン』（2024）はマーベル・スタジオ製作の MCU 作品のため、このシリーズには含めていません。',
    '初見なら公開順を強くおすすめします。時系列順は、シリーズを知っている人が読み解きを楽しむためのものです。',
  ],
  sources: [
    { label: "Here's How to Watch the X-Men Movies in Order | Collider", url: 'https://collider.com/x-men-movies-in-order/' },
    { label: 'The Complete X-Men Movie Timeline Explained | Screen Rant', url: 'https://screenrant.com/x-men-movie-timeline-explained/' },
  ],
};
