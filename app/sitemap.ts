import type { MetadataRoute } from 'next';
import { getAllSeries } from '@/lib/series';
import { SITE_URL as baseUrl } from '@/lib/site';

// 静的書き出し（output: 'export'）では、sitemap.xmlも生成時に固定する必要がある。
// 無いとビルドが「dynamic が未設定」で落ちる。
export const dynamic = 'force-static';

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
