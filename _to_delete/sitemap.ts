import type { MetadataRoute } from 'next';
import { getAllSeries } from '@/lib/series';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    ...getAllSeries().map((s) => ({
      url: `${baseUrl}/series/${s.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
