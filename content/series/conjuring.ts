import type { Series } from '@/lib/types';

/**
 * 死霊館ユニバースは、公開順と作中の年代順が最も大きくずれるシリーズのひとつ。
 * 1作目(2013)が1971年、5作目(2018)が1952年、9作目(2023)が1956年といった具合に、
 * 前日譚が後から次々と足されてきた。年代順タブがそのまま価値になる。
 *
 * ただし年代順に観ることを勧めているわけではない。
 * 前日譚は「本編を観た人が驚く」ように作られているため、
 * おすすめ順は本編4作を先に置いている。
 */
export const conjuring: Series = {
  slug: 'conjuring',
  category: 'film',
  name: '死霊館ユニバース',
  tagline: '公開順と時系列が総入れ替え。前日譚が後から足され続けた',
  description:
    '死霊館シリーズは10作あり、公開順と作中の年代順がほとんど入れ替わっています。1作目の『死霊館』は1971年が舞台ですが、5作目の『死霊館のシスター』は1952年、9作目の『呪いの秘密』は1956年です。前日譚が後から次々と足されてきたためです。さらに本編とスピンオフの関係も分かりにくく、どれを観れば話が繋がるのかが見えにくくなっています。このページでは、本編とスピンオフの区別と、2通りの順番を整理しています。',
  films: [
    {
      slug: 'conjuring',
      title: '死霊館',
      originalTitle: 'The Conjuring',
      year: 2013,
      setting: '1971年',
      note: 'ウォーレン夫妻を主役にした本編1作目。ここから枝分かれしてスピンオフが増えていった',
    },
    {
      slug: 'annabelle',
      title: 'アナベル 死霊館の人形',
      originalTitle: 'Annabelle',
      year: 2014,
      setting: '1970年',
      note: '『死霊館』の冒頭に出てくる人形の由来を描くスピンオフ。本編を観ていなくても入れる',
    },
    {
      slug: 'conjuring-2',
      title: '死霊館 エンフィールド事件',
      originalTitle: 'The Conjuring 2',
      year: 2016,
      setting: '1977年',
      note: '本編2作目。この作品で修道女の姿をした悪霊が登場し、『死霊館のシスター』に繋がる',
    },
    {
      slug: 'annabelle-creation',
      title: 'アナベル 死霊人形の誕生',
      originalTitle: 'Annabelle: Creation',
      year: 2017,
      setting: '1958年',
      note: 'アナベルの前日譚。時系列ではシリーズで3番目に古い',
    },
    {
      slug: 'nun',
      title: '死霊館のシスター',
      originalTitle: 'The Nun',
      year: 2018,
      setting: '1952年',
      note: '時系列ではシリーズ最古。『死霊館 エンフィールド事件』に出てきた悪霊の起源を描く',
    },
    {
      slug: 'llorona',
      title: 'ラ・ヨローナ 〜泣く女〜',
      originalTitle: 'The Curse of La Llorona',
      year: 2019,
      setting: '1973年',
      note: '『アナベル 死霊館の人形』の神父が登場する。ただし本編との関わりは薄く、外れた位置にある',
    },
    {
      slug: 'annabelle-comes-home',
      title: 'アナベル 死霊博物館',
      originalTitle: 'Annabelle Comes Home',
      year: 2019,
      setting: '1972年',
      note: 'ウォーレン夫妻の家が舞台。本編とスピンオフが最も近づく1本',
    },
    {
      slug: 'devil-made-me',
      title: '死霊館 悪魔のせいなら、無罪。',
      originalTitle: 'The Conjuring: The Devil Made Me Do It',
      year: 2021,
      setting: '1981年',
      note: '本編3作目。実際の裁判を題材にしている',
    },
    {
      slug: 'nun-2',
      title: '死霊館のシスター 呪いの秘密',
      originalTitle: 'The Nun II',
      year: 2023,
      setting: '1956年',
      note: '『死霊館のシスター』の直接の続編',
    },
    {
      slug: 'last-rites',
      title: '死霊館 最後の儀式',
      originalTitle: 'The Conjuring: Last Rites',
      year: 2025,
      setting: '1986年',
      note: '本編4作目にして完結編。ウォーレン夫妻の物語を締めくくる',
    },
  ],
  releaseOrder: [
    'conjuring',
    'annabelle',
    'conjuring-2',
    'annabelle-creation',
    'nun',
    'llorona',
    'annabelle-comes-home',
    'devil-made-me',
    'nun-2',
    'last-rites',
  ],
  // 1952年から1986年まで、公開順とほぼ総入れ替えになる
  chronoOrder: [
    'nun',
    'nun-2',
    'annabelle-creation',
    'annabelle',
    'conjuring',
    'annabelle-comes-home',
    'llorona',
    'conjuring-2',
    'devil-made-me',
    'last-rites',
  ],
  recommendedLabel: '本編だけ観る順',
  recommendedDescription:
    'ウォーレン夫妻を主役にした本編4作だけの順です。スピンオフ6作を観ていなくても話は通じます。前日譚を先に観ると仕掛けが弱まるため、初めてならここから始めるのが確実です。',
  recommendedOrder: [
    { slug: 'conjuring', reason: '本編1作目。ここから始めれば予備知識は要らない' },
    { slug: 'conjuring-2', reason: '本編2作目。ここで出てくる悪霊が『死霊館のシスター』に繋がる' },
    { slug: 'devil-made-me', reason: '本編3作目' },
    { slug: 'last-rites', reason: '本編4作目にして完結編' },
  ],
  caveats: [
    '公開順と作中の年代順がほとんど入れ替わっています。1作目『死霊館』は1971年、5作目『死霊館のシスター』は1952年、9作目『呪いの秘密』は1956年が舞台です。前日譚が後から足され続けたためで、このページでは2通りの順番を切り替えられるようにしています。',
    'ただし年代順に観ることは勧めません。前日譚は「本編を観た人が驚く」ように作られています。たとえば『死霊館のシスター』は、『死霊館 エンフィールド事件』に登場した悪霊の起源を描く作品です。先に観ると、本編での初登場が種明かし済みになります。',
    '10作のうち、ウォーレン夫妻を主役にした「本編」は4作です（『死霊館』『エンフィールド事件』『悪魔のせいなら、無罪。』『最後の儀式』）。残る6作はスピンオフで、観ていなくても本編の話は通じます。',
    'スピンオフは「アナベル」3作と「死霊館のシスター」2作、そして『ラ・ヨローナ』1作に分かれます。アナベル3作は『死霊館』冒頭に出てくる人形の由来を、シスター2作は『エンフィールド事件』の悪霊の起源を描いています。',
    '『ラ・ヨローナ 〜泣く女〜』（2019年）は最も外れた位置にあります。『アナベル 死霊館の人形』に出てきた神父が登場することで同じ世界とされていますが、それ以外の繋がりはほとんどありません。飛ばして支障はありません。',
    '『アナベル 死霊博物館』（2019年）は、ウォーレン夫妻の家が舞台です。本編とスピンオフが最も近づく1本で、本編を観たあとに観ると繋がりが分かります。',
    '『死霊館 最後の儀式』（2025年）は本編の完結編として作られています。ウォーレン夫妻の物語はここで終わりますが、シリーズ全体が終わるとは発表されていません。',
  ],
  sources: [
    {
      label: '死霊館ユニバース - Wikipedia（作品一覧）',
      url: 'https://ja.wikipedia.org/wiki/%E6%AD%BB%E9%9C%8A%E9%A4%A8%E3%83%A6%E3%83%8B%E3%83%90%E3%83%BC%E3%82%B9',
    },
    {
      label: '死霊館シリーズ全10作の観る順番と時系列（ホラーもっとマガジン）',
      url: 'https://www.pointheart.net/entry/the-conjuring-series',
    },
    {
      label: '「死霊館」ユニバースを時系列でおさらい（ORICON NEWS）',
      url: 'https://www.oricon.co.jp/news/2203703/full/',
    },
  ],
};
