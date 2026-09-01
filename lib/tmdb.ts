import tmdb from '@/content/tmdb.json';

export type TmdbEntry = {
  tmdbId: number;
  posterPath: string | null;
  overview: string;
  /** 上映時間（分）。取得できていない場合は undefined */
  runtime?: number | null;
};

const entries = tmdb as Record<string, TmdbEntry>;

const key = (seriesSlug: string, filmSlug: string) => `${seriesSlug}:${filmSlug}`;

export function tmdbOf(seriesSlug: string, filmSlug: string): TmdbEntry | undefined {
  return entries[key(seriesSlug, filmSlug)];
}

/** 視聴済み作品の合計上映時間（分）。1本でも取得できていなければ null を返す */
export function totalRuntime(seriesSlug: string, filmSlugs: string[]): number | null {
  let total = 0;
  for (const slug of filmSlugs) {
    const runtime = tmdbOf(seriesSlug, slug)?.runtime;
    if (!runtime) return null;
    total += runtime;
  }
  return total;
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}分`;
  if (rest === 0) return `${hours}時間`;
  return `${hours}時間${rest}分`;
}

/** TMDb のポスター画像 URL。w185 は一覧用、w342 は大きめ表示用 */
export function posterUrl(
  posterPath: string | null | undefined,
  size: 'w92' | 'w185' | 'w342' | 'w500' = 'w185'
): string | null {
  if (!posterPath) return null;
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}

export function posterOf(
  seriesSlug: string,
  filmSlug: string,
  size: 'w92' | 'w185' | 'w342' | 'w500' = 'w185'
): string | null {
  return posterUrl(tmdbOf(seriesSlug, filmSlug)?.posterPath, size);
}

/** シリーズの代表ポスター（先頭から、取得できているものを最大 count 枚） */
export function seriesPosters(seriesSlug: string, filmSlugs: string[], count: number): string[] {
  const urls: string[] = [];
  for (const slug of filmSlugs) {
    const url = posterOf(seriesSlug, slug, 'w185');
    if (url) urls.push(url);
    if (urls.length >= count) break;
  }
  return urls;
}
