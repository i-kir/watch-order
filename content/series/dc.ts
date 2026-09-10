import type { Series } from '@/lib/types';

/**
 * DC映画は1本の線に並ばない。3つの系統が並行している。
 *   DCEU（2013〜2023）… 旧シリーズ。『ザ・フラッシュ』のあと畳まれた
 *   DCU（2025〜）      … ジェームズ・ガン体制の新シリーズ
 *   エルスワールド      … 『ザ・バットマン』『ジョーカー』など、どちらにも属さない単発
 *
 * そのため通しの時系列順は存在しない。chronoOrder は公開順と同じにしてタブを出さず、
 * 3つ目の順番を「新シリーズだけ観る順」に充てている。
 * 実際にいちばん多い問いが「今から始めるなら何を観ればいいのか」だからだ。
 */
export const dc: Series = {
  slug: 'dc',
  name: 'DC映画',
  tagline: '旧シリーズ・新シリーズ・単発の3系統。どれが繋がるのか',
  description:
    'DCの映画は1本の続き物ではありません。2013年の『マン・オブ・スティール』から始まる旧シリーズ（DCEU）、2025年の『スーパーマン』から始まる新シリーズ（DCU）、そしてどちらにも属さない『ザ・バットマン』『ジョーカー』などの単発作品が並行しています。やっかいなのは、新シリーズが旧シリーズを完全になかったことにしたわけではない点です。一部の俳優と出来事だけが引き継がれており、その線引きが分かりにくくなっています。',
  films: [
    // ── 旧シリーズ（DCEU）2013〜2023 ──
    {
      slug: 'man-of-steel',
      title: 'マン・オブ・スティール',
      originalTitle: 'Man of Steel',
      year: 2013,
      note: '旧シリーズ（DCEU）の出発点。ヘンリー・カヴィルがスーパーマンを演じる',
    },
    {
      slug: 'bvs',
      title: 'バットマン vs スーパーマン ジャスティスの誕生',
      originalTitle: 'Batman v Superman: Dawn of Justice',
      year: 2016,
      note: 'ベン・アフレックのバットマンが初登場。劇場版と、30分長い「アルティメット・エディション」がある',
    },
    {
      slug: 'suicide-squad',
      title: 'スーサイド・スクワッド',
      originalTitle: 'Suicide Squad',
      year: 2016,
      note: '2021年の『ザ・スーサイド・スクワッド』とは別作品。紛らわしいが続編ではなく、扱いも異なる',
    },
    {
      slug: 'wonder-woman',
      title: 'ワンダーウーマン',
      originalTitle: 'Wonder Woman',
      year: 2017,
      note: '第一次世界大戦が舞台。旧シリーズの中では時代が大きく遡る',
    },
    {
      slug: 'justice-league',
      title: 'ジャスティス・リーグ',
      originalTitle: 'Justice League',
      year: 2017,
      note: '監督交代を経て公開された劇場版。後年ザック・スナイダー版が別に公開された',
    },
    {
      slug: 'aquaman',
      title: 'アクアマン',
      originalTitle: 'Aquaman',
      year: 2018,
    },
    {
      slug: 'shazam',
      title: 'シャザム!',
      originalTitle: 'Shazam!',
      year: 2019,
    },
    {
      slug: 'birds-of-prey',
      title: 'ハーレイ・クインの華麗なる覚醒 BIRDS OF PREY',
      originalTitle: 'Birds of Prey',
      year: 2020,
      note: '『スーサイド・スクワッド』のハーレイ・クインを引き継いだ作品',
    },
    {
      slug: 'ww1984',
      title: 'ワンダーウーマン 1984',
      originalTitle: 'Wonder Woman 1984',
      year: 2020,
    },
    {
      slug: 'snyder-cut',
      title: 'ザック・スナイダーのジャスティス・リーグ',
      originalTitle: "Zack Snyder's Justice League",
      year: 2021,
      note: '2017年の劇場版を当初の構想で作り直したもの。4時間超で、配信のみの公開。劇場版とどちらか一方でよい',
    },
    {
      slug: 'the-suicide-squad',
      title: 'ザ・スーサイド・スクワッド "極"悪党、集結',
      originalTitle: 'The Suicide Squad',
      year: 2021,
      note: 'ジェームズ・ガン監督作。新シリーズにも登場する人物がここで描かれており、旧シリーズの中では例外的に繋がりが残っている',
    },
    {
      slug: 'black-adam',
      title: 'ブラックアダム',
      originalTitle: 'Black Adam',
      year: 2022,
    },
    {
      slug: 'shazam-2',
      title: 'シャザム!〜神々の怒り〜',
      originalTitle: 'Shazam! Fury of the Gods',
      year: 2023,
    },
    {
      slug: 'the-flash',
      title: 'ザ・フラッシュ',
      originalTitle: 'The Flash',
      year: 2023,
      note: 'マルチバースを扱い、旧シリーズを畳む位置に置かれた作品',
    },
    {
      slug: 'blue-beetle',
      title: 'ブルービートル',
      originalTitle: 'Blue Beetle',
      year: 2023,
      note: '主演のショロ・マリドゥエニャは新シリーズにも起用されるが、この映画自体は新シリーズの正史ではないとされている',
    },
    {
      slug: 'aquaman-2',
      title: 'アクアマン/失われた王国',
      originalTitle: 'Aquaman and the Lost Kingdom',
      year: 2023,
      note: '旧シリーズ最後の劇場公開作',
    },

    // ── エルスワールド（どちらの系統にも属さない単発） ──
    {
      slug: 'joker',
      title: 'ジョーカー',
      originalTitle: 'Joker',
      year: 2019,
      note: 'どの系統にも属さない独立作。旧シリーズとも新シリーズとも繋がらない',
    },
    {
      slug: 'the-batman',
      title: 'THE BATMAN－ザ・バットマン－',
      originalTitle: 'The Batman',
      year: 2022,
      note: 'マット・リーヴス監督による独立したバットマン。旧シリーズのベン・アフレック版とは別人・別世界',
    },
    {
      slug: 'joker-2',
      title: 'ジョーカー：フォリ・ア・ドゥ',
      originalTitle: 'Joker: Folie à Deux',
      year: 2024,
      note: '『ジョーカー』の続編',
    },
    {
      slug: 'the-batman-2',
      title: 'The Batman: Part II（原題）',
      originalTitle: 'The Batman: Part II',
      year: 2028,
      // 検索が公開年で絞るため、延期を繰り返す作品は ID を直接指定する
      tmdbId: 806704,
      note: '『THE BATMAN』の続編。2026年7月に3度目の延期が発表され、全米公開は2028年2月にずれ込んだ。エルスワールドとして、新シリーズとは別に作られる',
    },

    // ── 新シリーズ（DCU）2025〜 ──
    {
      slug: 'superman',
      title: 'スーパーマン',
      originalTitle: 'Superman',
      year: 2025,
      note: '新シリーズ（DCU）の劇場映画としての出発点。旧シリーズを観ていなくても問題なく入れる',
    },
    {
      slug: 'supergirl',
      title: 'スーパーガール',
      originalTitle: 'Supergirl',
      year: 2026,
      note: '2026年6月26日全米公開',
    },
    {
      slug: 'clayface',
      title: 'クレイフェイス',
      originalTitle: 'Clayface',
      year: 2026,
      note: '2026年10月30日公開。DCスタジオが本格的なホラーとして作る一作',
    },
    {
      slug: 'man-of-tomorrow',
      title: 'マン・オブ・トゥモロー',
      originalTitle: 'Man of Tomorrow',
      year: 2027,
      note: '2027年7月9日全米公開予定。『スーパーマン』の次作',
    },
    {
      slug: 'dynamic-duo',
      title: 'Dynamic Duo（原題）',
      originalTitle: 'Dynamic Duo',
      year: 2028,
      note: '2028年6月30日全米公開予定',
    },
  ],
  releaseOrder: [
    'man-of-steel',
    'bvs',
    'suicide-squad',
    'wonder-woman',
    'justice-league',
    'aquaman',
    'shazam',
    'joker',
    'birds-of-prey',
    'ww1984',
    'snyder-cut',
    'the-suicide-squad',
    'the-batman',
    'black-adam',
    'shazam-2',
    'the-flash',
    'blue-beetle',
    'aquaman-2',
    'joker-2',
    'superman',
    'supergirl',
    'clayface',
    'man-of-tomorrow',
    'the-batman-2',
    'dynamic-duo',
  ],
  // 3系統が並行しているため、通しの年代順は存在しない。公開順と同じにしてタブを出さない
  chronoOrder: [
    'man-of-steel',
    'bvs',
    'suicide-squad',
    'wonder-woman',
    'justice-league',
    'aquaman',
    'shazam',
    'joker',
    'birds-of-prey',
    'ww1984',
    'snyder-cut',
    'the-suicide-squad',
    'the-batman',
    'black-adam',
    'shazam-2',
    'the-flash',
    'blue-beetle',
    'aquaman-2',
    'joker-2',
    'superman',
    'supergirl',
    'clayface',
    'man-of-tomorrow',
    'the-batman-2',
    'dynamic-duo',
  ],
  recommendedLabel: '新シリーズだけ観る順',
  recommendedDescription:
    '2025年から始まった新シリーズ（DCU）だけを観る順です。旧シリーズ16作を観ていなくても入れるように作られているので、これから始めるならここだけで足ります。',
  recommendedOrder: [
    {
      slug: 'superman',
      reason: '新シリーズの出発点。前提となる知識は要らないように作られている',
    },
    { slug: 'supergirl' },
    { slug: 'clayface', reason: '2026年10月30日公開。ここから先はこれからの作品' },
    { slug: 'man-of-tomorrow', reason: '『スーパーマン』の直接の続き' },
    { slug: 'dynamic-duo' },
  ],
  caveats: [
    'DCの映画は1本の続き物ではありません。旧シリーズ（DCEU、2013〜2023年）、新シリーズ（DCU、2025年〜）、そしてどちらにも属さない単発作品の3つが並行しています。通しの時系列は存在しないため、このページでは年代順のタブを出していません。',
    'これから観始めるなら、新シリーズだけで足ります。『スーパーマン』（2025年）は旧シリーズを観ていない人が入れるように作られています。旧シリーズ16作を予習する必要はありません。',
    '新シリーズは旧シリーズを完全になかったことにしたわけではありません。ジェームズ・ガンは「過去の出来事に言及すれば、その時点で新シリーズの正史になる」という方針を示しています。つまり作品単位ではなく出来事単位で、引き継がれるものと引き継がれないものが分かれます。',
    '実際に、『ザ・スーサイド・スクワッド』（2021年）の出来事は新シリーズでも触れられており、引き継がれた側にあたります。一方『ブルービートル』（2023年）は、主演俳優が新シリーズにも起用されるにもかかわらず、映画自体は正史ではないとされています。ここが最も分かりにくい部分です。',
    '『ジャスティス・リーグ』には2017年の劇場版と、2021年の『ザック・スナイダーのジャスティス・リーグ』の2つがあります。後者は当初の構想で作り直した4時間超の版で、配信のみの公開でした。同じ話の別バージョンなので、どちらか一方を観れば足ります。',
    '『スーサイド・スクワッド』（2016年）と『ザ・スーサイド・スクワッド』（2021年）は、題名がほぼ同じですが別作品です。後者は続編ではなく、監督も作風も異なります。',
    '『ザ・バットマン』『ジョーカー』は「エルスワールド」と呼ばれる枠で、旧シリーズとも新シリーズとも繋がりません。バットマンは旧シリーズにベン・アフレック版が別に存在するため、同じ時期に2人のバットマンがいる状態になっています。',
    '新シリーズは映画より先に配信作品から始まっています。アニメシリーズ『Creature Commandos』（2024年）が最初の作品で、ドラマ『ピースメイカー』のシーズン2も新シリーズに接続します。ただし劇場映画だけを追う場合、観ていなくても支障はありません。',
    'クリストファー・ノーラン監督のダークナイト三部作、ティム・バートン／ジョエル・シュマッカー版のバットマン、リチャード・ドナー版のスーパーマンは、いずれも上の3系統とは無関係の独立したシリーズです。',
  ],
  sources: [
    {
      label: 'DC公式サイト',
      url: 'https://www.dc.com/',
    },
    {
      label: 'DCエクステンデッド・ユニバース - Wikipedia（旧シリーズの作品一覧）',
      url: 'https://ja.wikipedia.org/wiki/DC%E3%82%A8%E3%82%AF%E3%82%B9%E3%83%86%E3%83%B3%E3%83%87%E3%83%83%E3%83%89%E3%83%BB%E3%83%A6%E3%83%8B%E3%83%90%E3%83%BC%E3%82%B9',
    },
    {
      label: 'ジェームズ・ガンが示した正史の方針（ギネマナッツ）',
      url: 'https://ginema-nuts.com/james-gunn-which-dceu-event-dcu-canon',
    },
  ],
};
