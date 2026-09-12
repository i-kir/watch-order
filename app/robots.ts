import type { MetadataRoute } from 'next';
import { SITE_URL as baseUrl } from '@/lib/site';

// 静的書き出し（output: 'export'）では、robots.txtも生成時に固定する必要がある。
// 無いとビルドが「dynamic が未設定」で落ちる。
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
