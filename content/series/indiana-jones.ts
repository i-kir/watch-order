import type { Series } from '@/lib/types';

/**
 * 論点はひとつ。『魔宮の伝説』(1984) が『レイダース』(1981) の前年を描く前日譚であること。
 * それ以外は公開順と年代順が一致する。
 * 各作は独立した冒険なので、年代順に観る必要はない。
 */
export const indianaJones: Series = {
  slug: 'indiana-jones',
  category: 'film',
  name: 'インディ・ジョーンズ',
  tagline: '2作目だけが1作目の前の話。ただし順番に観て困らない',
  description:
    'インディ・ジョーンズは5作あります。順番の論点はひとつだけで、公開順2作目の『魔宮の伝説』が、作中では1作目『レイダース』の前年にあたる前日譚という点です。ただし各作はそれぞれ独立した冒険として作られており、前作を観ていなくても話は通じます。このページでは、公開順と年代順の違いと、それが実際にどれくらい影響するかを整理しています。',
  films: [
    {
      slug: 'raiders',
      title: 'レイダース／失われたアーク《聖櫃》',
      originalTitle: 'Raiders of the Lost Ark',
      year: 1981,
      setting: '1936年',
      note: '第1作。単体で完結しており、ここから始めれば予備知識は要らない',
    },
    {
      slug: 'temple',
      title: 'インディ・ジョーンズ／魔宮の伝説',
      originalTitle: 'Indiana Jones and the Temple of Doom',
      year: 1984,
      setting: '1935年',
      note: '公開順では2作目だが、作中では『レイダース』の前年にあたる前日譚',
    },
    {
      slug: 'crusade',
      title: 'インディ・ジョーンズ／最後の聖戦',
      originalTitle: 'Indiana Jones and the Last Crusade',
      year: 1989,
      setting: '1938年',
      note: '父親役にショーン・コネリー。旧3部作の完結編',
    },
    {
      slug: 'crystal-skull',
      title: 'インディ・ジョーンズ／クリスタル・スカルの王国',
      originalTitle: 'Indiana Jones and the Kingdom of the Crystal Skull',
      year: 2008,
      setting: '1957年',
      note: '19年ぶりの続編。時代が戦前から戦後へ跳ぶ',
    },
    {
      slug: 'dial',
      title: 'インディ・ジョーンズと運命のダイヤル',
      originalTitle: 'Indiana Jones and the Dial of Destiny',
      year: 2023,
      setting: '1969年',
      note: 'ハリソン・フォード主演の最終作。スピルバーグは監督を離れた',
    },
  ],
  releaseOrder: [
    'raiders',
    'temple',
    'crusade',
    'crystal-skull',
    'dial',
  ],
  // 『魔宮の伝説』(1935年) が『レイダース』(1936年) の前に入る
  chronoOrder: [
    'temple',
    'raiders',
    'crusade',
    'crystal-skull',
    'dial',
  ],
  recommendedLabel: '初めて観る人の順',
  recommendedDescription:
    '公開順そのままです。各作が独立した冒険なので、年代順に並べ替える意味はほとんどありません。『レイダース』から観れば自然に流れます。',
  recommendedOrder: [
    { slug: 'raiders', reason: '第1作。単体で完結していて、予備知識が要らない' },
    { slug: 'temple', reason: '作中では前年の話だが、独立した冒険なのでここで観て困らない' },
    { slug: 'crusade', reason: '旧3部作の完結編。父親との関係が主題になる' },
    { slug: 'crystal-skull' },
    { slug: 'dial', reason: 'ハリソン・フォード主演の最終作' },
  ],
  caveats: [
    '『インディ・ジョーンズ／魔宮の伝説』（1984年）は、公開順では2作目ですが、作中では『レイダース』（1936年）の前年、1935年が舞台です。つまり前日譚にあたります。',
    'ただし年代順に並べ替える必要はほとんどありません。各作はそれぞれ独立した冒険として作られており、前作の出来事を前提にする場面がごく少ないためです。公開順に観て問題ありません。',
    '『クリスタル・スカルの王国』（2008年）で時代が1957年に跳びます。前作から19年空いており、作中でも19年経っています。第二次世界大戦前が舞台だった旧3部作とは、時代背景が大きく変わります。',
    '『運命のダイヤル』（2023年）はハリソン・フォード主演の最終作です。スティーヴン・スピルバーグは監督を離れ、製作総指揮に回りました。',
    'ドラマ『ヤング・インディ・ジョーンズ』（1992〜1993年）は少年期を描いた作品ですが、映画とは別に作られています。観ていなくても支障はありません。',
  ],
  sources: [
    {
      label: 'インディ・ジョーンズ シリーズ - Wikipedia',
      url: 'https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%83%87%E3%82%A3%E3%83%BB%E3%82%B8%E3%83%A7%E3%83%BC%E3%83%B3%E3%82%BA',
    },
  ],
};
