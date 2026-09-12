import type { Series } from '@/lib/types';

/**
 * 13作は3つの塊に分かれる。
 *   1〜6作目   カーク船長の時代
 *   7〜10作目  次世代の乗組員（『ジェネレーションズ』が橋渡し）
 *   11〜13作目 2009年からの新シリーズ
 * 新シリーズは作り直しではなく、作中で時間が枝分かれしたという設定になっている。
 * 元の時間軸が消えたわけではない、という点がこのシリーズ固有の分かりにくさ。
 *
 * 時間移動を扱う作品が複数あり、通しの年代順を引くと混乱するだけなので
 * chronoOrder は公開順と同じにしてタブを出さない。
 */
export const starTrek: Series = {
  slug: 'star-trek',
  category: 'film',
  name: 'スター・トレック',
  tagline: '新シリーズは作り直しではない。枝分かれした別の時間軸',
  description:
    'スター・トレックの映画は13作あり、3つの塊に分かれます。カーク船長の時代（1〜6作目）、次世代の乗組員（7〜10作目）、そして2009年から始まる新シリーズ（11〜13作目）です。分かりにくいのは新シリーズの位置づけです。ふつうの作り直しとは違い、作中で時間が枝分かれしたという設定になっており、過去10作がなかったことになったわけではありません。このページでは、どこから入れるのかを整理しています。',
  films: [
    {
      slug: 'tmp',
      title: 'スター・トレック',
      originalTitle: 'Star Trek: The Motion Picture',
      year: 1979,
      // 2009年版と検索で取り違えるため ID を直接指定する。
      // themoviedb.org/movie/152-star-trek-the-motion-picture で確認済み。
      tmdbId: 152,
      note: '第1作。TVシリーズの登場人物がそのまま出る。ここから6作がカーク船長の時代',
    },
    {
      slug: 'khan',
      title: 'スター・トレック2 カーンの逆襲',
      originalTitle: 'Star Trek II: The Wrath of Khan',
      year: 1982,
      note: 'TVシリーズの1エピソードの続き。シリーズ最高作とされることが多い',
    },
    {
      slug: 'spock',
      title: 'スター・トレック3 ミスター・スポックを探せ!',
      originalTitle: 'Star Trek III: The Search for Spock',
      year: 1984,
      note: '『2』の直接の続き。2〜4は3本で1つの物語',
    },
    {
      slug: 'voyage',
      title: 'スター・トレック4 故郷への長い道',
      originalTitle: 'Star Trek IV: The Voyage Home',
      year: 1986,
      note: '1986年の地球へ時間移動する。作風が軽く、単体でも入りやすい',
    },
    {
      slug: 'frontier',
      title: 'スター・トレック5 新たなる未知へ',
      originalTitle: 'Star Trek V: The Final Frontier',
      year: 1989,
      note: '',
    },
    {
      slug: 'undiscovered',
      title: 'スター・トレック6 未知の世界',
      originalTitle: 'Star Trek VI: The Undiscovered Country',
      year: 1991,
      note: 'カーク船長の時代の完結編',
    },
    {
      slug: 'generations',
      title: 'ジェネレーションズ STAR TREK',
      originalTitle: 'Star Trek: Generations',
      year: 1994,
      note: 'カーク船長の時代と、次世代の乗組員が交差する1本。ここから登場人物が入れ替わる',
    },
    {
      slug: 'first-contact',
      title: 'ファースト・コンタクト STAR TREK',
      originalTitle: 'Star Trek: First Contact',
      year: 1996,
      note: '次世代の代表作とされる。TVシリーズ『新スタートレック』を観ていると背景が分かる',
    },
    {
      slug: 'insurrection',
      title: 'スター・トレック 叛乱',
      originalTitle: 'Star Trek: Insurrection',
      year: 1998,
      note: '',
    },
    {
      slug: 'nemesis',
      title: 'ネメシス S.T.X',
      originalTitle: 'Star Trek: Nemesis',
      year: 2002,
      note: '次世代の完結編。ここで元の時間軸の映画は途切れる',
    },
    {
      slug: 'st2009',
      title: 'スター・トレック',
      originalTitle: 'Star Trek',
      year: 2009,
      // 邦題が1979年版と同じ。themoviedb.org/movie/13475-star-trek で確認済み。
      tmdbId: 13475,
      note: '新シリーズの1作目。過去作を観ていない人が入れるように作られている。ただし作り直しではなく、作中で時間が枝分かれしたという設定になっている',
    },
    {
      slug: 'into-darkness',
      title: 'スター・トレック イントゥ・ダークネス',
      originalTitle: 'Star Trek Into Darkness',
      year: 2013,
      note: '2009年版の続き',
    },
    {
      slug: 'beyond',
      title: 'スター・トレック BEYOND',
      originalTitle: 'Star Trek Beyond',
      year: 2016,
      note: '新シリーズの3作目',
    },
  ],
  releaseOrder: [
    'tmp',
    'khan',
    'spock',
    'voyage',
    'frontier',
    'undiscovered',
    'generations',
    'first-contact',
    'insurrection',
    'nemesis',
    'st2009',
    'into-darkness',
    'beyond',
  ],
  // 時間移動を扱う作品が複数あり、通しの年代順を引いても分かりにくくなるだけ。
  // 公開順と同じにしてタブを出さない
  chronoOrder: [
    'tmp',
    'khan',
    'spock',
    'voyage',
    'frontier',
    'undiscovered',
    'generations',
    'first-contact',
    'insurrection',
    'nemesis',
    'st2009',
    'into-darkness',
    'beyond',
  ],
  recommendedLabel: 'いまから入るならこの3本',
  recommendedDescription:
    '2009年からの新シリーズ3作です。過去10作を観ていない人が入れるように作られており、順番に観れば足ります。気に入ったら過去作へ遡ればよく、先に遡る必要はありません。',
  recommendedOrder: [
    {
      slug: 'st2009',
      reason: '新シリーズの1作目。過去10作の予習は要らない',
    },
    { slug: 'into-darkness', reason: '2009年版の直接の続き' },
    { slug: 'beyond' },
  ],
  caveats: [
    '2009年の『スター・トレック』は、過去10作をなかったことにした作り直しではありません。作中で時間が枝分かれしたという設定で、元の時間軸はそのまま存在し続けます。実際、元の時間軸のスポックが登場して新シリーズの人物と会話します。',
    'このため「新シリーズを観たら過去作は無意味になる」ということはありません。逆に、新シリーズから入って過去作へ遡ることもできます。',
    '13作は3つの塊に分かれます。1〜6作目がカーク船長の時代、7〜10作目が次世代の乗組員、11〜13作目が新シリーズです。『ジェネレーションズ』（1994年）が前の2つを橋渡しします。',
    '『スター・トレック2 カーンの逆襲』『3 ミスター・スポックを探せ!』『4 故郷への長い道』の3本は、続けて1つの物語になっています。途中で止めると話が終わりません。',
    '『スター・トレック』という題名の映画が1979年と2009年の2本あります。原題は前者が Star Trek: The Motion Picture、後者が Star Trek です。配信サービスで探すときは公開年を確認してください。',
    '7作目以降はTVシリーズ『新スタートレック』の登場人物が主役です。観ていなくても話は追えますが、人物関係は観ているほうが分かります。映画だけを追う場合、『ジェネレーションズ』から入れば説明されます。',
  ],
  sources: [
    {
      label: 'スター・トレック 公式サイト（パラマウント）',
      url: 'https://paramount.jp/startrek/movies/index.html',
    },
    {
      label: 'スター・トレックの映画作品一覧（MOVIE WALKER PRESS）',
      url: 'https://press.moviewalker.jp/list/series/66/',
    },
  ],
};
