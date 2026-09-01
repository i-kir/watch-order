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
