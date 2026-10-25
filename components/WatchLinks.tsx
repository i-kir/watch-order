'use client';

import configuredLinks from '@/content/watch-links.json';
import { providerLink, providersOf, providersUpdatedAt } from '@/lib/providers';
import { resolveWatchLinks, type AffiliateLink } from '@/lib/watch-links';
import { trackWatchClick } from '@/lib/analytics';

const affiliateLinks: AffiliateLink[] = configuredLinks;

type Props = {
  seriesSlug: string;
  filmSlug: string;
  filmTitle: string;
  order: string;
  placement: 'next_film' | 'film_card';
};

export default function WatchLinks({ seriesSlug, filmSlug, filmTitle, order, placement }: Props) {
  const providers = providersOf(seriesSlug, filmSlug);
  const links = resolveWatchLinks(seriesSlug, filmSlug, providers, providerLink(seriesSlug, filmSlug), affiliateLinks);
  if (links.length === 0) return null;
  const hasAds = links.some((link) => link.sponsored);

  return (
    <div className="mt-3" data-watch-links>
      {hasAds && <p className="mb-2 text-xs text-[var(--color-ink-soft)]">広告・PR：以下のサービスリンクはアフィリエイト広告です。</p>}
      <div className="flex flex-wrap gap-2">
        {links.map((link, index) => (
          <a
            key={`${link.provider}:${index}`}
            href={link.url}
            target="_blank"
            rel={link.sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
            aria-label={`${filmTitle}：${link.sponsored ? `${link.provider}の作品・料金を確認（広告）` : '配信先を確認（TMDB）'}（新しいタブ）`}
            onClick={(event) => {
              event.stopPropagation();
              trackWatchClick({ series_slug: seriesSlug, film_slug: filmSlug, provider: link.provider, placement, link_type: link.sponsored ? 'affiliate' : 'availability', order });
            }}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition ${
              index === 0
                ? 'bg-[var(--color-accent)] text-white hover:opacity-90'
                : 'border border-[var(--color-line)] bg-white text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]'
            }`}
          >
            {link.sponsored ? `${link.provider}で作品・料金を確認` : '配信先を確認（TMDB）'}
            <span aria-hidden>↗</span>
          </a>
        ))}
      </div>
      <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--color-ink-soft)]">
        配信情報：{providersUpdatedAt()}時点。視聴可否・料金は移動先でご確認ください。
      </p>
    </div>
  );
}
