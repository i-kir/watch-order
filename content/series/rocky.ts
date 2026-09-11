import type { Series } from '@/lib/types';

/**
 * 9作が一直線に並ぶので chronoOrder は公開順と同じにしてタブを出さない。
 * 問われるのは順番ではなく「クリードから入れるか」。
 * 答えは入れる。ただし『クリード 炎の宿敵』だけは『ロッキー4』が効く。
 * 3つ目の順番はそこに充てている。
 */
export const rocky: Series = {
  slug: 'rocky',
  category: 'film',
  name: 'ロッキー／クリード',
  tagline: 'クリードから入れる。ただし2作目だけロッキー4が効く',
  description:
    'ロッキーとクリードは合わせて9作あり、公開順がそのまま作中の時系列です。枝分かれもありません。問われるのは順番よりも「クリードから観ても大丈夫か」という点です。基本的には大丈夫です。ただし『クリード 炎の宿敵』（2018年）だけは『ロッキー4』（1985年）の因縁を引き継いでおり、観ているかどうかで受け取り方が変わります。このページでは、どこを押さえておけばいいかを整理しています。',
  films: [
    {
      slug: 'rocky',
      title: 'ロッキー',
      originalTitle: 'Rocky',
      year: 1976,
      note: '第1作。アカデミー賞作品賞を受賞した',
    },
    {
      slug: 'rocky2',
      title: 'ロッキー2',
      originalTitle: 'Rocky II',
      year: 1979,
      note: '第1作の直後から始まる',
    },
    {
      slug: 'rocky3',
      title: 'ロッキー3',
      originalTitle: 'Rocky III',
      year: 1982,
      note: 'アポロが友人になる。『クリード』の前提になる関係がここで作られる',
    },
    {
      slug: 'rocky4',
      title: 'ロッキー4／炎の友情',
      originalTitle: 'Rocky IV',
      year: 1985,
      note: 'ソ連のドラゴが登場。『クリード 炎の宿敵』はこの作品の続きにあたる',
    },
    {
      slug: 'rocky5',
      title: 'ロッキー5／最後のドラマ',
      originalTitle: 'Rocky V',
      year: 1990,
      note: '当初の完結編として作られた',
    },
    {
      slug: 'balboa',
      title: 'ロッキー・ザ・ファイナル',
      originalTitle: 'Rocky Balboa',
      year: 2006,
      note: '16年ぶりの続編。ロッキー本編の完結編',
    },
    {
      slug: 'creed',
      title: 'クリード チャンプを継ぐ男',
      originalTitle: 'Creed',
      year: 2015,
      note: 'アポロの息子が主人公になる。ロッキー6作を観ていなくても入れる',
    },
    {
      slug: 'creed2',
      title: 'クリード 炎の宿敵',
      originalTitle: 'Creed II',
      year: 2018,
      note: '『ロッキー4』の因縁を引き継ぐ。ここだけは旧作を観ているかどうかで大きく変わる',
    },
    {
      slug: 'creed3',
      title: 'クリード 過去の逆襲',
      originalTitle: 'Creed III',
      year: 2023,
      note: 'ロッキーが登場しない初の作品。主演のマイケル・B・ジョーダンが監督も務めた',
    },
  ],
  releaseOrder: [
    'rocky',
    'rocky2',
    'rocky3',
    'rocky4',
    'rocky5',
    'balboa',
    'creed',
    'creed2',
    'creed3',
  ],
  // 9作が一直線。公開順と作中の時系列が一致するのでタブは出さない
  chronoOrder: [
    'rocky',
    'rocky2',
    'rocky3',
    'rocky4',
    'rocky5',
    'balboa',
    'creed',
    'creed2',
    'creed3',
  ],
  recommendedLabel: 'クリードから入る順',
  recommendedDescription:
    'ロッキー6作を飛ばして『クリード』から入る順です。ただし『炎の宿敵』の前に『ロッキー4』だけは挟んでいます。この1本を観ているかどうかで、2作目の意味がかなり変わるためです。',
  recommendedOrder: [
    {
      slug: 'creed',
      reason: 'ロッキー6作を観ていなくても入れるように作られている',
    },
    {
      slug: 'rocky4',
      reason: '『炎の宿敵』はこの作品の因縁の続き。ここだけは先に観ておく価値がある',
    },
    { slug: 'creed2', reason: '『ロッキー4』で起きたことが、そのまま動機になる' },
    { slug: 'creed3', reason: 'ロッキーが登場しない初の作品' },
  ],
  caveats: [
    '9作は一直線に並びます。作り直しも枝分かれもなく、公開順がそのまま作中の時系列です。このため年代順のタブは出していません。',
    '『クリード チャンプを継ぐ男』（2015年）は、ロッキー6作を観ていない人が入れるように作られています。必要な背景は作中で説明されます。',
    '例外が『クリード 炎の宿敵』（2018年）です。『ロッキー4』（1985年）で起きたことがそのまま動機になっており、観ているかどうかで意味が大きく変わります。全部は観られないという場合でも、この1本だけは先に観る価値があります。',
    '『クリード 過去の逆襲』（2023年）にはロッキーが登場しません。シルベスター・スタローンは出演せず、主演のマイケル・B・ジョーダンが監督も務めました。',
    '『ロッキー4』には2021年に『ロッキーVSドラゴ』という再編集版が公開されています。スタローン自身が編集し直したもので、同じ映画の別バージョンです。どちらか一方を観れば足ります。',
  ],
  sources: [
    {
      label: 'ロッキー（映画シリーズ）- Wikipedia',
      url: 'https://ja.wikipedia.org/wiki/%E3%83%AD%E3%83%83%E3%82%AD%E3%83%BC_(%E6%98%A0%E7%94%BB)',
    },
  ],
};
