import affiliate from '@/content/affiliate.json';
import { providersOf } from './providers';
import type { Series } from './types';

type AffiliateFile = { links: Record<string, string | null> };
const file = affiliate as AffiliateFile;

export function affiliateUrl(provider: string): string | null {
  const url = file.links[provider]?.trim();
  return url ? url : null;
}

export function hasAffiliate(): boolean {
  return Object.keys(file.links).some((name) => affiliateUrl(name) !== null);
}

export type ServiceCoverage = { name: string; count: number; url: string };

export function serviceCoverage(series: Series): ServiceCoverage[] {
  const counts = new Map<string, number>();
  for (const film of series.films) {
    for (const name of providersOf(series.slug, film.slug)) {
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }
  const result: ServiceCoverage[] = [];
  for (const [name, count] of counts) {
    const url = affiliateUrl(name);
    if (url) result.push({ name, count, url });
  }
  return result.sort((a, b) => b.count - a.count);
}
