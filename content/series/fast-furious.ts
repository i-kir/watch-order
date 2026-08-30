import type { Series } from '@/lib/types';

/**
 * 3作目『TOKYO DRIFT』が後年になって時系列上の位置を変えられた（レトコン）、
 * 「順番が分かりにくいシリーズ」の代表例。
 */
export const fastFurious: Series = {
  slug: 'fast-furious',
  name: 'ワイルド・スピード',
  tagline: '3作目「TOKYO DRIFT」は、実は6作目の後',
  description:
    'シリーズ11作。3作目の『TOKYO DRIFT』だけが、後年の作品によって時系列上の位置を変えられています。公開順に観ると物語の繋がりが分からなくなる箇所があります。',
  films: [
    { slug: 'ff1', title: 'ワイルド・スピード', originalTitle: 'The Fast and the Furious', year: 2001, note: '作中の年代は公式に確定していない' },
    { slug: 'ff2', title: 'ワイルド・スピードX2', originalTitle: '2 Fast 2 Furious', year: 2003, note: '1作目の数年後' },
    { slug: 'tokyo-drift', title: 'ワイルド・スピードX3 TOKYO DRIFT', originalTitle: 'The Fast and the Furious: Tokyo Drift', year: 2006, note: 'シリーズ最大の論点。公開は3作目だが、ハンの生死という物語上の必然から『EURO MISSION』の後に置き直された' },
    { slug: 'ff4', title: 'ワイルド・スピードMAX', originalTitle: 'Fast & Furious', year: 2009, note: '1作目の約5年後とされる' },
    { slug: 'ff5', title: 'ワイルド・スピードMEGA MAX', originalTitle: 'Fast Five', year: 2011, note: '前作の直後' },
    { slug: 'ff6', title: 'ワイルド・スピード EURO MISSION', originalTitle: 'Fast & Furious 6', year: 2013, note: '終盤でハンが東京へ向かい、『TOKYO DRIFT』のラストが中盤クレジットとして提示される' },
    { slug: 'ff7', title: 'ワイルド・スピード SKY MISSION', originalTitle: 'Furious 7', year: 2015, note: '冒頭が『TOKYO DRIFT』のハンの死を直接受ける' },
    { slug: 'ff8', title: 'ワイルド・スピード ICE BREAK', originalTitle: 'The Fate of the Furious', year: 2017 },
    { slug: 'hobbs-shaw', title: 'ワイルド・スピード／スーパーコンボ', originalTitle: 'Fast & Furious Presents: Hobbs & Shaw', year: 2019, note: 'スピンオフ。公式な時系列位置は明示されていないが、『ICE BREAK』の後とするのが通説' },
    { slug: 'f9', title: 'ワイルド・スピード ジェットブレイク', originalTitle: 'F9', year: 2021, note: 'ハンの死が偽装だったと明かされる（回想1989年あり）' },
    { slug: 'fast-x', title: 'ワイルド・スピード／ファイヤーブースト', originalTitle: 'Fast X', year: 2023, note: '『MEGA MAX』の回想を含む' },
  ],
  releaseOrder: ['ff1', 'ff2', 'tokyo-drift', 'ff4', 'ff5', 'ff6', 'ff7', 'ff8', 'hobbs-shaw', 'f9', 'fast-x'],
  chronoOrder: ['ff1', 'ff2', 'ff4', 'ff5', 'ff6', 'tokyo-drift', 'ff7', 'ff8', 'hobbs-shaw', 'f9', 'fast-x'],
  recommendedOrder: [
    { slug: 'ff1' },
    { slug: 'ff2' },
    { slug: 'ff4' },
    { slug: 'ff5', reason: 'シリーズの作風が変わる転換点。ここから面白くなります' },
    { slug: 'ff6' },
    { slug: 'tokyo-drift', reason: 'ここで観ると、『EURO MISSION』のラストから自然に繋がります' },
    { slug: 'ff7', reason: '『TOKYO DRIFT』の直後を受けて始まります' },
    { slug: 'ff8' },
    { slug: 'f9' },
    { slug: 'fast-x' },
    { slug: 'hobbs-shaw', reason: 'スピンオフ。本編の流れとは独立しているので後回しで構いません' },
  ],
  caveats: [
    '『TOKYO DRIFT』は公開順では3作目ですが、時系列上は『EURO MISSION』の後です。公開順に観ると、ハンというキャラクターの生死が前後して混乱します。',
    'このシリーズは各作の作中年が公式に確定していません。確実に分かっているのは「どの作がどの作の後か」という順序関係だけです。',
    '『スーパーコンボ』はスピンオフで、公式な時系列位置が示されていません。ここでは通説に従って『ICE BREAK』の後に置いています。',
  ],
  sources: [
    { label: 'Fast & Furious Complete Timeline | Screen Rant', url: 'https://screenrant.com/fast-furious-movies-full-timeline-explained/' },
    { label: 'When does Tokyo Drift take place in the Fast and Furious timeline? | Dexerto', url: 'https://www.dexerto.com/tv-movies/when-does-tokyo-drift-take-place-in-the-fast-furious-timeline-2145289/' },
  ],
};
