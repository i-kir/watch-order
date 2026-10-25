export type AffiliateLink = {
  seriesSlug: string;
  filmSlug: string;
  provider: string;
  url: string;
  enabled: boolean;
};

export type WatchLink = { provider: string; url: string; sponsored: boolean };

export function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch {
    return false;
  }
}

/** 配信データに一致する作品・サービスだけに、設定済みの広告を表示する。 */
export function resolveWatchLinks(
  seriesSlug: string,
  filmSlug: string,
  providers: string[],
  sourceUrl: string | null,
  affiliates: AffiliateLink[],
): WatchLink[] {
  const links = affiliates.filter((link) =>
    link.enabled && link.seriesSlug === seriesSlug && link.filmSlug === filmSlug &&
    providers.includes(link.provider) && isHttpsUrl(link.url)
  ).map((link) => ({ provider: link.provider, url: link.url, sponsored: true }));

  // TMDB の作品別 watch URL のみ。データが欠けた作品に別作品のリンクを流用しない。
  if (sourceUrl && isHttpsUrl(sourceUrl)) {
    const source = new URL(sourceUrl);
    if (source.hostname === 'www.themoviedb.org' && /^\/(movie|tv)\/[^/]+\/watch\/?$/.test(source.pathname)) {
      links.push({ provider: 'TMDB', url: sourceUrl, sponsored: false });
    }
  }
  return links;
}
