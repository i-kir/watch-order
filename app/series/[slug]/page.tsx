import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import WatchOrder from '@/components/WatchOrder';
import { availableOrders, getAllSeries, getSeries, orderedFilms } from '@/lib/series';
import { seriesPosters } from '@/lib/tmdb';
import Poster from '@/components/Poster';
import type { OrderKey } from '@/lib/types';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSeries().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeries(slug);
  if (!series) return {};

  const title = `${series.name}を観る順番`;
  const description = `${series.name}全${series.films.length}作の観る順番。公開順・時系列順・おすすめ順で比較できます。${series.tagline}`;

  return {
    title,
    description,
    alternates: { canonical: `/series/${series.slug}` },
    openGraph: { title, description, type: 'article' },
  };
}

export default async function SeriesPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const series = getSeries(slug);
  if (!series) notFound();

  const orders = availableOrders(series);
  const posters = seriesPosters(series.slug, series.releaseOrder, 12);
  const entriesByOrder = Object.fromEntries(
    orders.map((key) => [key, orderedFilms(series, key as OrderKey)])
  );

  // 検索エンジンに構造を伝える。ページ自体は静的生成される
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${series.name}を観る順番（公開順）`,
    numberOfItems: series.releaseOrder.length,
    itemListElement: entriesByOrder.release?.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.film.title,
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 pt-5">
      <nav className="text-xs text-[var(--color-ink-faint)]">
        <Link href="/" className="hover:underline">
          ホーム
        </Link>
        <span className="mx-1">/</span>
        <span>{series.name}</span>
      </nav>

      <h1 className="balance mt-2 text-[1.5rem] font-bold leading-tight tracking-tight sm:text-3xl">
        {series.name}を観る順番
      </h1>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-ink-soft)]">
        <span className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1 font-bold tabular-nums text-[var(--color-accent)]">
          全{series.films.length}作
        </span>
        <span>{orders.length}通りの順番で比較</span>
      </div>

      {/* スマホでは3行までに抑えて、リストまでの距離を縮める */}
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--color-ink-soft)] sm:line-clamp-none">
        {series.description}
      </p>

      {posters.length > 0 && (
        <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {posters.map((url) => (
            <Poster
              key={url}
              src={url}
              alt=""
              size="md"
              className="h-[78px] w-auto rounded-md ring-1 ring-black/5 sm:h-[132px]"
            />
          ))}
        </div>
      )}

      <div className="mt-5">
        <WatchOrder series={series} orders={orders} entriesByOrder={entriesByOrder} />
      </div>

      {series.caveats.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold sm:text-xl">順番をめぐる論点</h2>
          <ul className="mt-4 space-y-3">
            {series.caveats.map((caveat) => (
              <li
                key={caveat}
                className="rounded-2xl border border-[var(--color-line)] bg-white p-4 text-sm leading-relaxed"
              >
                {caveat}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-bold sm:text-xl">出典</h2>
        <ul className="mt-3 space-y-1 text-sm">
          {series.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
