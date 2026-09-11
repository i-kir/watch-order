import type { Series } from '@/lib/types';

/**
 * バイオハザードの映像化は3系統ある。
 *   アリス6部作(2002〜2016) … 映画独自の主人公。ゲームの筋とは別物
 *   実写の作り直し2回       … ラクーンシティ(2021)、2026年版。互いに繋がらない
 *   CGアニメ4作             … ゲーム本編の正史に沿う唯一の系統
 * 3系統は互いに繋がらないので、通しの年代順は存在しない。
 * chronoOrder は公開順と同じにしてタブを出さない。
 *
 * 2026年10月9日に2回目の作り直しが公開される。
 * 「過去のどれを観ておけばいいのか」が最も問われる時期にあたる。
 */
export const residentEvil: Series = {
  slug: 'resident-evil',
  category: 'film',
  name: 'バイオハザード（映画）',
  tagline: '実写は2回作り直された。ゲームの筋に沿うのはCGアニメだけ',
  description:
    'バイオハザードの映画には3つの系統があります。ミラ・ジョヴォヴィッチ主演のアリス6部作（2002〜2016年）、2021年と2026年の2回の作り直し、そしてCGアニメ4作です。やっかいなのは、ゲームの物語に沿っているのがCGアニメだけという点です。アリス6部作は映画独自の主人公を立てた別の話で、作り直し2作も互いに繋がりません。2026年10月9日には3系統目にあたる新作が公開されます。このページでは、どれがどれと繋がるのかを整理しています。',
  films: [
    {
      slug: 're1',
      title: 'バイオハザード',
      originalTitle: 'Resident Evil',
      year: 2002,
      note: 'ポール・W・S・アンダーソン脚本。ゲームの登場人物ではなくアリスという映画独自の主人公を立てた。以降6作はこの線で続く',
    },
    {
      slug: 'apocalypse',
      title: 'バイオハザードII アポカリプス',
      originalTitle: 'Resident Evil: Apocalypse',
      year: 2004,
      note: 'ゲーム2作目の舞台であるラクーンシティが登場する。ジル・バレンタインが初参加',
    },
    {
      slug: 'extinction',
      title: 'バイオハザードIII',
      originalTitle: 'Resident Evil: Extinction',
      year: 2007,
      note: '荒廃した世界が舞台。クレアが登場する',
    },
    {
      slug: 'afterlife',
      title: 'バイオハザードIV アフターライフ',
      originalTitle: 'Resident Evil: Afterlife',
      year: 2010,
      note: 'クリス・レッドフィールドが登場。アンダーソンが監督に復帰した',
    },
    {
      slug: 'retribution',
      title: 'バイオハザードV リトリビューション',
      originalTitle: 'Resident Evil: Retribution',
      year: 2012,
      note: '過去作の登場人物が多数再登場する',
    },
    {
      slug: 'final-chapter',
      title: 'バイオハザード ザ・ファイナル',
      originalTitle: 'Resident Evil: The Final Chapter',
      year: 2016,
      note: 'アリス6部作の完結編。ここでこの線は終わる',
    },
    {
      slug: 'raccoon-city',
      title: 'バイオハザード：ウェルカム・トゥ・ラクーンシティ',
      originalTitle: 'Resident Evil: Welcome to Raccoon City',
      year: 2021,
      note: '1回目の作り直し。アリス6部作とは繋がらず、ゲーム1作目と2作目を原作に近い形で描いた。続編は作られていない',
    },
    {
      slug: 'reboot-2026',
      title: 'バイオハザード',
      originalTitle: 'Resident Evil',
      year: 2026,
      // 2002年版と原題も邦題も同じ。年で絞っても知名度の高い2002年版が
      // 返る危険があるため ID を直接指定する。
      // themoviedb.org/movie/1423191-resident-evil で確認済み。
      tmdbId: 1423191,
      note: '2026年10月9日公開の2回目の作り直し。ザック・クレッガー監督。過去の実写8作とは繋がらず、ゲーム1作目を下敷きに一から作り直されている',
    },
    {
      slug: 'degeneration',
      title: 'バイオハザード ディジェネレーション',
      originalTitle: 'Resident Evil: Degeneration',
      year: 2008,
      note: 'CGアニメ。ここから4作は実写と別系統で、ゲーム本編の正史に沿っている。レオンとクレアが登場',
    },
    {
      slug: 'damnation',
      title: 'バイオハザード ダムネーション',
      originalTitle: 'Resident Evil: Damnation',
      year: 2012,
      note: 'CGアニメ2作目。ゲーム『5』と『6』の間にあたる',
    },
    {
      slug: 'vendetta',
      title: 'バイオハザード ヴェンデッタ',
      originalTitle: 'Resident Evil: Vendetta',
      year: 2017,
      note: 'CGアニメ3作目。レオン、クリス、レベッカが共演する',
    },
    {
      slug: 'death-island',
      title: 'バイオハザード：デスアイランド',
      originalTitle: 'Resident Evil: Death Island',
      year: 2023,
      note: 'CGアニメ4作目。レオン・クリス・クレア・ジル・レベッカが集結する',
    },
  ],
  releaseOrder: [
    're1',
    'apocalypse',
    'extinction',
    'degeneration',
    'afterlife',
    'retribution',
    'damnation',
    'final-chapter',
    'vendetta',
    'raccoon-city',
    'death-island',
    'reboot-2026',
  ],
  // 3系統が互いに繋がらないため、通しの年代順は存在しない。
  // 公開順と同じにしてタブを出さない
  chronoOrder: [
    're1',
    'apocalypse',
    'extinction',
    'degeneration',
    'afterlife',
    'retribution',
    'damnation',
    'final-chapter',
    'vendetta',
    'raccoon-city',
    'death-island',
    'reboot-2026',
  ],
  recommendedLabel: '2026年版を観る前の予習',
  recommendedDescription:
    '2026年10月9日公開の新作は、過去の実写8作とは繋がりません。予習は要りません。それでも何か観ておきたい場合、ゲームの物語に沿っているのはCGアニメ4作なので、そちらが近い雰囲気になります。',
  recommendedOrder: [
    {
      slug: 'reboot-2026',
      reason: '2026年10月9日公開。過去作を1本も観ていなくて構わない',
    },
    {
      slug: 'degeneration',
      reason: 'ここからのCGアニメ4作だけが、ゲーム本編の正史に沿っている',
    },
    { slug: 'damnation' },
    { slug: 'vendetta' },
    { slug: 'death-island' },
  ],
  caveats: [
    '2026年10月9日公開の新作を観るのに、過去作の予習は要りません。ザック・クレッガー監督による作り直しで、過去の実写8作とは繋がりません。ゲーム1作目を下敷きに一から作り直されています。',
    '実写には3つの系統があります。①アリス6部作（2002〜2016年）、②『ウェルカム・トゥ・ラクーンシティ』（2021年）、③2026年版です。②は①の作り直し、③は②とも別の作り直しで、3つとも互いに繋がりません。',
    'アリス6部作は、ゲームの物語をなぞった作品ではありません。ミラ・ジョヴォヴィッチが演じるアリスは映画のために作られた人物で、ゲームには登場しません。ゲームの登場人物も出てきますが、扱いはゲームと異なります。',
    'ゲーム本編の物語に沿っているのはCGアニメ4作だけです（『ディジェネレーション』『ダムネーション』『ヴェンデッタ』『デスアイランド』）。ゲームの正史の一部として作られており、レオンやクリスといったゲームの主要人物がそのまま登場します。ゲームを知っている人には、実写よりこちらのほうが馴染みます。',
    '『バイオハザード』という題名の映画が2002年と2026年の2本あります。原題もどちらも Resident Evil です。配信サービスで探すときは公開年を確認してください。',
    '『ウェルカム・トゥ・ラクーンシティ』（2021年）はゲーム1作目と2作目を原作に近い形で描きましたが、続編は作られていません。話が完結しないまま終わっています。',
    'Netflixには実写ドラマ『バイオハザード』（2022年）とCGアニメ『インフィニット ダークネス』（2021年）もあります。前者は独立した作品、後者はCGアニメ4作と同じくゲームの正史に沿っています。映画だけを追う場合、どちらも観ていなくて構いません。',
  ],
  sources: [
    {
      label: '2026年版『バイオハザード』作品情報（映画.com）',
      url: 'https://eiga.com/movie/106123/',
    },
    {
      label: '『バイオハザード』再リブート、原点回帰でゲーム1作目を忠実に映画化（シネマトゥデイ）',
      url: 'https://www.cinematoday.jp/news/N0147127',
    },
    {
      label: 'バイオハザード（映画シリーズ）- Wikipedia',
      url: 'https://ja.wikipedia.org/wiki/%E3%83%90%E3%82%A4%E3%82%AA%E3%83%8F%E3%82%B6%E3%83%BC%E3%83%89_(%E6%98%A0%E7%94%BB%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA)',
    },
  ],
};
