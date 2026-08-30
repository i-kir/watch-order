export type Film = {
  slug: string;
  /** 日本公開時の正式邦題 */
  title: string;
  originalTitle: string;
  /** 公開年（米国基準。並べ替えの基準にする） */
  year: number;
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
  /** 順番をめぐる論点。ここが記事との差になる */
  caveats: string[];
  sources: { label: string; url: string }[];
};
