export type Film = {
  slug: string;
  /** 日本公開時の正式邦題 */
  title: string;
  originalTitle: string;
  /** 公開年（米国基準。並べ替えの基準にする） */
  year: number;
  /** 劇場版かTVシリーズか。省略時は劇場版として扱う */
  kind?: 'film' | 'tv';
  /** TVシリーズの話数。kind が 'tv' のときだけ意味を持つ */
  episodes?: number;
  /**
   * TMDb でこの編が「別番組」ではなく親番組のシーズンとして登録されている場合の
   * シーズン番号。tmdbId に親番組の ID を入れて一緒に指定する。
   */
  season?: number;
  /** 作中の設定年代。公式に確定していない場合は undefined */
  setting?: string;
  /** その作品固有の注記（矛盾・異説など） */
  note?: string;
  /** TMDb の作品 ID。scripts/fetch-tmdb.mjs が埋める */
  tmdbId?: number;
};

export type OrderKey = 'release' | 'chrono' | 'recommended';

export type RecommendedStep = {
  slug: string;
  /** なぜこの位置なのか */
  reason?: string;
};

export type Series = {
  slug: string;
  name: string;
  /** 一覧と検索結果に出る短い説明 */
  tagline: string;
  description: string;
  films: Film[];
  /** 公開順（film の slug） */
  releaseOrder: string[];
  /** 作中の年代順 */
  chronoOrder: string[];
  /** 初見の人におすすめする順。定義しない場合は省略 */
  recommendedOrder?: RecommendedStep[];
  /** 3つ目の順番の呼び名。作品によって「おすすめ順」以外が適切なことがある */
  recommendedLabel?: string;
  recommendedDescription?: string;
  /** 順番をめぐる論点。ここが記事との差になる */
  caveats: string[];
  sources: { label: string; url: string }[];
};
