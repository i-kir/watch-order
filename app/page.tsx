import Link from 'next/link';
import { getAllSeries } from '@/lib/series';
import { seriesPosters } from '@/lib/tmdb';
import Poster from '@/components/Poster';

export default function Home() {
  const series = getAllSeries();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">映画シリーズを観る順番</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-[var(--color-ink-soft)]">
        公開順・時系列順・おすすめ順を切り替えて比べられます。観たものにチェックを入れると、次に観る作品が分かります。
        順番をめぐる論点や、公式設定の矛盾も出典つきで示しています。
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {series.map((s) => {
          const posters = seriesPosters(s.slug, s.releaseOrder, 5);
          return (
            <li key={s.slug}>
              <Link
                href={`/series/${s.slug}`}
                className="flex h-full flex-col rounded-xl border border-[var(--color-line)] bg-white p-5 transition hover:border-[var(--color-accent)] hover:shadow-sm"
              >
                <h2 className="text-lg font-bold">{s.name}</h2>
                <p className="mt-1 text-sm text-[var(--color-accent)]">{s.tagline}</p>

                {posters.length > 0 && (
                  <div className="mt-4 flex gap-1.5 overflow-hidden">
                    {posters.map((url) => (
                      <Poster key={url} src={url} alt="" size="sm" />
                    ))}
                  </div>
                )}

                <p className="mt-auto pt-3 text-xs text-[var(--color-ink-soft)]">全{s.films.length}作</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
