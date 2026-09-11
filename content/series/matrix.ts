import type { Series } from '@/lib/types';

/**
 * 本編4作は一直線。論点は『アニマトリックス』(2003) の置き場所だけ。
 * DVD発売は『リローデッド』の約3週間後だが、収録短編の1つ
 * 「セカンド・ルネッサンス」は戦争の起源を、「オシリス」は
 * 『リローデッド』の冒頭に直結する。年代順では本編2作目の前に置く。
 */
export const matrix: Series = {
  slug: 'matrix',
  category: 'film',
  name: 'マトリックス',
  tagline: '本編4作は一直線。迷うのは『アニマトリックス』の置き場所',
  description:
    'マトリックスの本編4作は順番どおりに観れば問題ありません。迷うのは短編集『アニマトリックス』をどこに挟むかです。収録されている1編は『リローデッド』の冒頭に直接つながっており、別の2編は機械と人類の戦争がどう始まったかを描いています。観なくても本編は通じますが、観る場合は置き場所で意味が変わります。このページでは、その1点を整理しています。',
  films: [
    {
      slug: 'matrix',
      title: 'マトリックス',
      originalTitle: 'The Matrix',
      year: 1999,
      note: '第1作。単体で完結している',
    },
    {
      slug: 'reloaded',
      title: 'マトリックス リローデッド',
      originalTitle: 'The Matrix Reloaded',
      year: 2003,
      note: '2作目。冒頭が『アニマトリックス』の1編から直接続く',
    },
    {
      slug: 'animatrix',
      title: 'アニマトリックス',
      originalTitle: 'The Animatrix',
      year: 2003,
      note: '短編9本を集めたアニメ作品集。うち1編が『リローデッド』の冒頭に直結し、別の2編は機械と人類の戦争の起源を描く',
    },
    {
      slug: 'revolutions',
      title: 'マトリックス レボリューションズ',
      originalTitle: 'The Matrix Revolutions',
      year: 2003,
      note: '3部作の完結編。『リローデッド』の直後から始まる',
    },
    {
      slug: 'resurrections',
      title: 'マトリックス レザレクションズ',
      originalTitle: 'The Matrix Resurrections',
      year: 2021,
      note: '18年ぶりの続編。作中でも長い年月が経っている',
    },
  ],
  releaseOrder: [
    'matrix',
    'reloaded',
    'animatrix',
    'revolutions',
    'resurrections',
  ],
  // 『アニマトリックス』を『リローデッド』の前に置く
  chronoOrder: [
    'matrix',
    'animatrix',
    'reloaded',
    'revolutions',
    'resurrections',
  ],
  recommendedLabel: '初めて観る人の順',
  recommendedDescription:
    '本編4作だけの順です。『アニマトリックス』は観なくても本編は通じます。気に入って背景を知りたくなったときに足せば充分です。',
  recommendedOrder: [
    { slug: 'matrix', reason: '第1作。単体で完結しており、ここで止めてもよい' },
    { slug: 'reloaded', reason: '2作目。ここから3作目まで続きもの' },
    { slug: 'revolutions', reason: '『リローデッド』の直後から始まる。3部作の完結編' },
    { slug: 'resurrections', reason: '18年後に作られた続編。3部作を観ていることが前提' },
  ],
  caveats: [
    '本編4作は一直線です。『リローデッド』と『レボリューションズ』は同じ年に公開され、後者は前者の直後から始まります。この2本は続けて観てください。',
    '『アニマトリックス』（2003年）は短編9本を集めたアニメ作品集です。本編を観るのに必須ではありません。ただし収録されている「ファイナルフライト・オブ・オシリス」は『リローデッド』の冒頭に直接つながっており、観る場合は『リローデッド』の前に置くのが自然です。',
    '『アニマトリックス』の「セカンド・ルネッサンス」2編は、機械と人類の戦争がどう始まったかを描いています。本編では説明されない背景なので、世界の成り立ちを知りたい場合はここが答えになります。',
    '『マトリックス レザレクションズ』（2021年）は3部作の18年後にあたります。3部作を観ていることが前提の作りなので、ここから入るのは勧めません。',
    '第1作は単体で完結しています。続編を観ないという選択も成り立つ、数少ないシリーズです。',
  ],
  sources: [
    {
      label: 'マトリックス（映画シリーズ）- Wikipedia',
      url: 'https://ja.wikipedia.org/wiki/%E3%83%9E%E3%83%88%E3%83%AA%E3%83%83%E3%82%AF%E3%82%B9_(%E6%98%A0%E7%94%BB)',
    },
  ],
};
