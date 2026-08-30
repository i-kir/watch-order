import type { Series } from '@/lib/types';

export const starWars: Series = {
  slug: 'star-wars',
  name: 'スター・ウォーズ',
  tagline: 'エピソード1から観るべきか、4から観るべきか',
  description:
    'スカイウォーカー・サーガ9作に『ローグ・ワン』『ハン・ソロ』を加えた11作。作中年代は BBY（ヤヴィンの戦い前）/ ABY（同後）で数えます。',
  films: [
    { slug: 'ep4', title: 'スター・ウォーズ エピソード4／新たなる希望', originalTitle: 'Star Wars: Episode IV – A New Hope', year: 1977, setting: '0 BBY' },
    { slug: 'ep5', title: 'スター・ウォーズ エピソード5／帝国の逆襲', originalTitle: 'Star Wars: Episode V – The Empire Strikes Back', year: 1980, setting: '3 ABY' },
    { slug: 'ep6', title: 'スター・ウォーズ エピソード6／ジェダイの帰還', originalTitle: 'Star Wars: Episode VI – Return of the Jedi', year: 1983, setting: '4 ABY', note: '旧邦題は「ジェダイの復讐」' },
    { slug: 'ep1', title: 'スター・ウォーズ エピソード1／ファントム・メナス', originalTitle: 'Star Wars: Episode I – The Phantom Menace', year: 1999, setting: '32 BBY' },
    { slug: 'ep2', title: 'スター・ウォーズ エピソード2／クローンの攻撃', originalTitle: 'Star Wars: Episode II – Attack of the Clones', year: 2002, setting: '22 BBY' },
    { slug: 'ep3', title: 'スター・ウォーズ エピソード3／シスの復讐', originalTitle: 'Star Wars: Episode III – Revenge of the Sith', year: 2005, setting: '19 BBY' },
    { slug: 'ep7', title: 'スター・ウォーズ／フォースの覚醒', originalTitle: 'Star Wars: The Force Awakens', year: 2015, setting: '34 ABY' },
    { slug: 'rogue-one', title: 'ローグ・ワン／スター・ウォーズ・ストーリー', originalTitle: 'Rogue One: A Star Wars Story', year: 2016, setting: '0 BBY', note: 'ラストが『エピソード4』の冒頭に直結します' },
    { slug: 'ep8', title: 'スター・ウォーズ／最後のジェダイ', originalTitle: 'Star Wars: The Last Jedi', year: 2017, setting: '34 ABY', note: '『フォースの覚醒』のほぼ直後' },
    { slug: 'solo', title: 'ハン・ソロ／スター・ウォーズ・ストーリー', originalTitle: 'Solo: A Star Wars Story', year: 2018, setting: '13〜10 BBY' },
    { slug: 'ep9', title: 'スター・ウォーズ／スカイウォーカーの夜明け', originalTitle: 'Star Wars: The Rise of Skywalker', year: 2019, setting: '35 ABY' },
  ],
  releaseOrder: ['ep4', 'ep5', 'ep6', 'ep1', 'ep2', 'ep3', 'ep7', 'rogue-one', 'ep8', 'solo', 'ep9'],
  chronoOrder: ['ep1', 'ep2', 'ep3', 'solo', 'rogue-one', 'ep4', 'ep5', 'ep6', 'ep7', 'ep8', 'ep9'],
  recommendedOrder: [
    { slug: 'ep4', reason: '公開順の最初。ここから入るのが最も安全です' },
    { slug: 'ep5', reason: 'シリーズ最大の衝撃。時系列順で観ると、この驚きが先に潰れます' },
    { slug: 'ep6', reason: '旧三部作の完結' },
    { slug: 'ep1', reason: 'ここから前日譚。旧三部作を観たうえで観ると意味が変わります' },
    { slug: 'ep2' },
    { slug: 'ep3', reason: 'ダース・ベイダー誕生。エピソード4へ繋がります' },
    { slug: 'rogue-one', reason: 'エピソード4の直前の物語。この位置で観ると効きます' },
    { slug: 'ep7', reason: '続三部作へ' },
    { slug: 'ep8' },
    { slug: 'ep9' },
    { slug: 'solo', reason: '独立性が高いので最後で構いません' },
  ],
  caveats: [
    '時系列順そのものに争いはありませんが、「どの順で観るか」は長く議論されてきたシリーズです。',
    '時系列順（エピソード1から）で観ると、『帝国の逆襲』最大の仕掛けが機能しなくなります。初見の方には公開順を強くおすすめします。',
    '『ローグ・ワン』は『エピソード4』の直前に繋がるため、時系列順でもおすすめ順でも同じ位置に来ます。',
    'ドラマシリーズやアニメ作品（『クローン・ウォーズ』『マンダロリアン』など）は含めていません。',
  ],
  sources: [
    { label: 'Star Wars Timeline: Every Movie, Series And More In Order | Empire', url: 'https://www.empireonline.com/movies/features/star-wars-timeline-chronological-order/' },
  ],
};
