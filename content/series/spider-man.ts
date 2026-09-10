import type { Series } from '@/lib/types';

/**
 * 実写のスパイダーマンは3つのシリーズが別々に作られてきた。
 * 通常なら「別物なので好きなところから」で済む話だが、
 * 『ノー・ウェイ・ホーム』(2021) が3つを交差させたため、
 * 過去シリーズを観たかどうかで受け取り方が変わるようになった。
 * ここがこのシリーズ固有の順番問題にあたる。
 *
 * ソニーのヴィラン映画（SSU）とアニメのスパイダーバースは別枠。
 * 通しの時系列は存在しないので chronoOrder は公開順と同じにしてタブを出さない。
 */
export const spiderMan: Series = {
  slug: 'spider-man',
  category: 'film',
  name: 'スパイダーマン（実写）',
  tagline: '3人のスパイダーマンが交差する。過去作をどこまで観ておくか',
  description:
    '実写のスパイダーマンには、サム・ライミ版・アメイジング版・MCU版という3つのシリーズがあります。俳優も世界も別で、本来は続き物ではありません。ところが『スパイダーマン：ノー・ウェイ・ホーム』（2021年）で3つが交差したため、過去シリーズを観ているかどうかで作品の受け取り方が変わるようになりました。さらにソニーのヴィラン映画とアニメのスパイダーバースが並行しています。このページでは、どれが繋がっていて、どれを飛ばしてよいのかを整理しています。',
  films: [
    // ── サム・ライミ版 2002〜2007 ──
    {
      slug: 'raimi-1',
      title: 'スパイダーマン',
      originalTitle: 'Spider-Man',
      year: 2002,
      note: 'トビー・マグワイア主演。グリーン・ゴブリンが登場する。この敵は『ノー・ウェイ・ホーム』に再登場する',
    },
    {
      slug: 'raimi-2',
      title: 'スパイダーマン2',
      originalTitle: 'Spider-Man 2',
      year: 2004,
      note: 'ドクター・オクトパスが登場。『ノー・ウェイ・ホーム』で最も大きく扱われる敵',
    },
    {
      slug: 'raimi-3',
      title: 'スパイダーマン3',
      originalTitle: 'Spider-Man 3',
      year: 2007,
      note: 'サンドマンとヴェノムが登場。ライミ版はここで終わり、4作目の企画は中止された',
    },
    // ── アメイジング版 2012〜2014 ──
    {
      slug: 'amazing-1',
      title: 'アメイジング・スパイダーマン',
      originalTitle: 'The Amazing Spider-Man',
      year: 2012,
      note: 'アンドリュー・ガーフィールド主演の作り直し。リザードが登場する',
    },
    {
      slug: 'amazing-2',
      title: 'アメイジング・スパイダーマン2',
      originalTitle: 'The Amazing Spider-Man 2',
      year: 2014,
      note: 'エレクトロが登場。続編を前提にした終わり方をするが、3作目は作られなかった',
    },
    // ── MCU版 2017〜 ──
    {
      slug: 'homecoming',
      title: 'スパイダーマン：ホームカミング',
      originalTitle: 'Spider-Man: Homecoming',
      year: 2017,
      note: 'トム・ホランド主演。単独作としては1作目だが、初登場は『シビル・ウォー／キャプテン・アメリカ』（2016年）で、本作はその直後から始まる',
    },
    {
      slug: 'far-from-home',
      title: 'スパイダーマン：ファー・フロム・ホーム',
      originalTitle: 'Spider-Man: Far From Home',
      year: 2019,
      note: '『アベンジャーズ／エンドゲーム』の直後が舞台。MCU本編を観ていないと前提が分かりにくい唯一の作品',
    },
    {
      slug: 'no-way-home',
      title: 'スパイダーマン：ノー・ウェイ・ホーム',
      originalTitle: 'Spider-Man: No Way Home',
      year: 2021,
      note: 'ライミ版・アメイジング版の敵と、2人のスパイダーマンが登場する。過去2シリーズを観ているかどうかで印象が大きく変わる',
    },
    {
      slug: 'brand-new-day',
      title: 'スパイダーマン：ブランド・ニュー・デイ',
      originalTitle: 'Spider-Man: Brand New Day',
      year: 2026,
      note: '2026年7月31日に日米同時公開。『ノー・ウェイ・ホーム』の結末を受けた続き',
    },
    // ── ソニーのヴィラン映画（SSU）2018〜2024 ──
    {
      slug: 'venom',
      title: 'ヴェノム',
      originalTitle: 'Venom',
      year: 2018,
      note: 'スパイダーマンは登場しない。ソニーが別枠で始めたヴィラン主役シリーズの1作目',
    },
    {
      slug: 'venom-2',
      title: 'ヴェノム：レット・ゼア・ビー・カーネイジ',
      originalTitle: 'Venom: Let There Be Carnage',
      year: 2021,
      note: '本編後の映像で『ノー・ウェイ・ホーム』と繋がる。実写のこの枠とMCUの唯一の接点',
    },
    {
      slug: 'morbius',
      title: 'モービウス',
      originalTitle: 'Morbius',
      year: 2022,
      note: '本編とは繋がらない。本編後の映像でつなげようとしたが、以降で回収されていない',
    },
    {
      slug: 'madame-web',
      title: 'マダム・ウェブ',
      originalTitle: 'Madame Web',
      year: 2024,
      note: '2003年が舞台。他のどの作品とも接続しない',
    },
    {
      slug: 'venom-3',
      title: 'ヴェノム：ザ・ラストダンス',
      originalTitle: 'Venom: The Last Dance',
      year: 2024,
      note: 'ヴェノム3部作の完結編',
    },
    {
      slug: 'kraven',
      title: 'クレイヴン・ザ・ハンター',
      originalTitle: 'Kraven the Hunter',
      year: 2024,
      note: 'この作品をもって、ソニーのヴィラン映画（SSU）は一区切りとなった',
    },
    // ── スパイダーバース（アニメ）2018〜 ──
    {
      slug: 'spider-verse-1',
      title: 'スパイダーマン：スパイダーバース',
      originalTitle: 'Spider-Man: Into the Spider-Verse',
      year: 2018,
      note: 'アニメ。実写のどのシリーズとも繋がらない独立した3部作の1作目',
    },
    {
      slug: 'spider-verse-2',
      title: 'スパイダーマン：アクロス・ザ・スパイダーバース',
      originalTitle: 'Spider-Man: Across the Spider-Verse',
      year: 2023,
      note: '前作の直接の続き。物語の途中で終わり、次作へ続く',
    },
    {
      slug: 'spider-verse-3',
      title: 'スパイダーマン：ビヨンド・ザ・スパイダーバース',
      originalTitle: 'Spider-Man: Beyond the Spider-Verse',
      year: 2027,
      note: '2027年6月18日全米公開予定。何度も延期されている。『アクロス』の直接の続き',
    },
  ],
  releaseOrder: [
    'raimi-1',
    'raimi-2',
    'raimi-3',
    'amazing-1',
    'amazing-2',
    'homecoming',
    'venom',
    'spider-verse-1',
    'far-from-home',
    'no-way-home',
    'venom-2',
    'morbius',
    'spider-verse-2',
    'madame-web',
    'venom-3',
    'kraven',
    'brand-new-day',
    'spider-verse-3',
  ],
  // 3つのシリーズ＋2つの別枠が並行しており、通しの年代順は存在しない。
  // 公開順と同じにしてタブを出さない
  chronoOrder: [
    'raimi-1',
    'raimi-2',
    'raimi-3',
    'amazing-1',
    'amazing-2',
    'homecoming',
    'venom',
    'spider-verse-1',
    'far-from-home',
    'no-way-home',
    'venom-2',
    'morbius',
    'spider-verse-2',
    'madame-web',
    'venom-3',
    'kraven',
    'brand-new-day',
    'spider-verse-3',
  ],
  recommendedLabel: '初めて観る人の順',
  recommendedDescription:
    'ヴィラン映画とアニメを外し、実写の本編だけを並べた順です。『ノー・ウェイ・ホーム』は過去2シリーズの敵が総登場するため、先に古い2シリーズを観ておくと仕掛けが働きます。逆にいえば、この9本以外は観なくても話は通じます。',
  recommendedOrder: [
    { slug: 'raimi-1', reason: 'ライミ版。ここで出る敵が『ノー・ウェイ・ホーム』に再登場する' },
    { slug: 'raimi-2', reason: 'シリーズ最高作とされることが多い。ドクター・オクトパスが登場' },
    { slug: 'raimi-3' },
    { slug: 'amazing-1', reason: '作り直し。ライミ版の続きではなく、最初からやり直す' },
    { slug: 'amazing-2' },
    { slug: 'homecoming', reason: 'MCU版。前の2シリーズを観ていなくても入れるように作られている' },
    { slug: 'far-from-home' },
    {
      slug: 'no-way-home',
      reason: 'ここで3つのシリーズが交差する。前の5本を観ているほど効く',
    },
    { slug: 'brand-new-day', reason: '2026年7月公開。『ノー・ウェイ・ホーム』の続き' },
  ],
  caveats: [
    '実写のスパイダーマンには3つのシリーズがあります。サム・ライミ版（2002〜2007年、トビー・マグワイア）、アメイジング版（2012〜2014年、アンドリュー・ガーフィールド）、MCU版（2017年〜、トム・ホランド）です。俳優も世界も別で、本来は続き物ではありません。',
    'ところが『スパイダーマン：ノー・ウェイ・ホーム』（2021年）で3つが交差します。過去2シリーズの敵が登場し、過去2人のスパイダーマンも現れます。作品自体は単体でも通じるように作られていますが、前の5本を観ているかどうかで受け取り方が大きく変わります。ここがこのシリーズ最大の順番問題です。',
    'トム・ホランド版の初登場は『シビル・ウォー／キャプテン・アメリカ』（2016年）です。スパイダーマン単独作ではないためこのページには入れていませんが、『ホームカミング』はその直後から始まります。観ていなくても支障はありません。',
    'MCU版で唯一、他作品の予習が要るのは『ファー・フロム・ホーム』（2019年）です。『アベンジャーズ／エンドゲーム』の直後が舞台で、そこで起きたことを前提に話が進みます。',
    'ソニーのヴィラン映画（ヴェノム3作、モービウス、マダム・ウェブ、クレイヴン）は別枠です。SSUと呼ばれ、2024年の『クレイヴン・ザ・ハンター』をもって一区切りとなりました。スパイダーマン本編を追うだけなら観なくて構いません。',
    'ただし1箇所だけ接点があります。『ヴェノム：レット・ゼア・ビー・カーネイジ』（2021年）の本編後の映像が『ノー・ウェイ・ホーム』と繋がっています。ヴェノムが一瞬だけMCU側へ渡る場面です。',
    'アニメの『スパイダーバース』3部作は、実写のどのシリーズとも繋がりません。多元宇宙という設定は共通しますが、別の作品です。ただし3作は一続きなので、この3本だけは順番に観る必要があります。',
    '『アメイジング・スパイダーマン2』（2014年）は続編を前提にした終わり方をしますが、3作目は作られませんでした。話が途中で切れたまま終わることを承知して観てください。',
    '『スパイダーマン：アクロス・ザ・スパイダーバース』（2023年）も物語の途中で終わります。続きの『ビヨンド・ザ・スパイダーバース』は2027年6月18日の全米公開予定ですが、これまでに何度も延期されています。',
  ],
  sources: [
    {
      label: '『ブランド・ニュー・デイ』2026年7月31日 日米同時公開（ソニー・ピクチャーズ公式）',
      url: 'https://www.sonypictures.jp/corp/press/2026-03-18-0',
    },
    {
      label: '『ビヨンド・ザ・スパイダーバース』米公開が2027年6月18日に（THE RIVER）',
      url: 'https://theriver.jp/spm-btsv-june-18/',
    },
    {
      label: 'SSUが『クレイヴン・ザ・ハンター』で一旦終了（シネマトゥデイ）',
      url: 'https://www.cinematoday.jp/news/N0146406',
    },
  ],
};
