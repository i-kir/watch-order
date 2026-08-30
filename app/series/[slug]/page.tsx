import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import WatchOrder from '@/components/WatchOrder';
import { availableOrders, getAllSeries, getSeries, orderedFilms } from '@/lib/series';
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
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="text-xs text-[var(--color-ink-soft)]">
        <Link href="/" className="hover:underline">
          ホーム
        </Link>
        <span className="mx-1">/</span>
        <span>{series.name}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">{series.name}を観る順番</h1>
      <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">{series.description}</p>

      <div className="mt-8">
        <WatchOrder series={series} orders={orders} entriesByOrder={entriesByOrder} />
      </div>

      {series.caveats.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">順番をめぐる論点</h2>
          <ul className="mt-4 space-y-3">
            {series.caveats.map((caveat) => (
              <li
                key={caveat}
                className="rounded-xl border border-[var(--color-line)] bg-white p-4 text-sm leading-relaxed"
              >
                {caveat}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-bold">出典</h2>
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
