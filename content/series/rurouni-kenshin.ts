import type { Series } from '@/lib/types';

/**
 * 論点は『The Beginning』(2021)。公開は『The Final』の2か月後だが、
 * 作中では幕末が舞台で、全作より前にあたる。
 * ただし『The Final』が投げかけた問いに『The Beginning』が答える構造なので、
 * 公開順に観るのが作り手の意図に沿う。年代順タブは出すが勧めない。
 */
export const rurouniKenshin: Series = {
  slug: 'rurouni-kenshin',
  category: 'film',
  name: 'るろうに剣心（実写）',
  tagline: '最後に公開された作品が、いちばん古い時代を描く',
  description:
    'るろうに剣心の実写映画は5作あります。順番の論点は『最終章 The Beginning』です。公開は『The Final』の2か月後で最も新しいのに、作中では幕末が舞台で、全作より前の出来事を描いています。さらに『京都大火編』と『伝説の最期編』は2本で1つの物語なので、途中で止めると話が終わりません。このページでは、公開順と年代順の違いと、どちらで観るべきかを整理しています。',
  films: [
    {
      slug: 'rk1',
      title: 'るろうに剣心',
      originalTitle: 'るろうに剣心',
      year: 2012,
      setting: '明治11年',
      note: '実写1作目。原作の東京編にあたる',
    },
    {
      slug: 'kyoto',
      title: 'るろうに剣心 京都大火編',
      originalTitle: 'るろうに剣心 京都大火編',
      year: 2014,
      setting: '明治11年',
      note: '京都編の前編。次作と2本で1つの物語になる',
    },
    {
      slug: 'densetsu',
      title: 'るろうに剣心 伝説の最期編',
      originalTitle: 'るろうに剣心 伝説の最期編',
      year: 2014,
      setting: '明治11年',
      note: '京都編の後編。『京都大火編』と続けて観る必要がある',
    },
    {
      slug: 'final',
      title: 'るろうに剣心 最終章 The Final',
      originalTitle: 'るろうに剣心 最終章 The Final',
      year: 2021,
      setting: '明治12年',
      note: '人誅編にあたる。公開順・年代順ともに本編の最後',
    },
    {
      slug: 'beginning',
      title: 'るろうに剣心 最終章 The Beginning',
      originalTitle: 'るろうに剣心 最終章 The Beginning',
      year: 2021,
      setting: '幕末',
      note: '剣心が人斬りだった幕末を描く前日譚。公開はThe Finalの2か月後だが、作中では全作より前にあたる',
    },
  ],
  releaseOrder: [
    'rk1',
    'kyoto',
    'densetsu',
    'final',
    'beginning',
  ],
  // 『The Beginning』(幕末) が先頭に来る
  chronoOrder: [
    'beginning',
    'rk1',
    'kyoto',
    'densetsu',
    'final',
  ],
  recommendedLabel: '初めて観る人の順',
  recommendedDescription:
    '公開順そのままです。『The Final』が投げかけた問いに『The Beginning』が答える構造になっているため、年代順に観ると answer が先に出てしまいます。',
  recommendedOrder: [
    { slug: 'rk1', reason: '1作目。原作を知らなくても入れる' },
    { slug: 'kyoto', reason: '京都編の前編。ここから2本で1つの物語' },
    { slug: 'densetsu', reason: '京都編の後編。『京都大火編』の続きなので、間を空けずに観る' },
    { slug: 'final', reason: '本編の完結編' },
    {
      slug: 'beginning',
      reason: '幕末の前日譚。『The Final』で示された過去に答える形なので、最後に観る',
    },
  ],
  caveats: [
    '『最終章 The Beginning』（2021年）は、公開順では最後ですが、作中では幕末が舞台で全作より前にあたります。剣心が人斬りだった時代を描く前日譚です。',
    'ただし年代順に観ることは勧めません。『The Final』は剣心の過去に何があったのかを示唆しながら進み、『The Beginning』がそれに答える構造になっています。先に『The Beginning』を観ると、この組み立てが働きません。',
    '『京都大火編』と『伝説の最期編』（どちらも2014年）は、2本で1つの物語です。前編だけでは話が終わらないので、続けて観てください。',
    '公開順に観る場合、1作目から『The Final』までは作中でも1年ほどしか経ちません。全作が明治11年から12年の出来事です。',
    '原作漫画とアニメには、実写版が扱っていない話も多くあります。実写5作は原作の東京編・京都編・人誅編と、追憶編にあたる部分を映像化したものです。',
  ],
  sources: [
    {
      label: 'るろうに剣心 最終章 - Wikipedia',
      url: 'https://ja.wikipedia.org/wiki/%E3%82%8B%E3%82%8D%E3%81%86%E3%81%AB%E5%89%A3%E5%BF%83_%E6%9C%80%E7%B5%82%E7%AB%A0',
    },
  ],
};
