import Link from 'next/link';
import { getAllSeries } from '@/lib/series';
import { seriesPosters } from '@/lib/tmdb';
import Poster from '@/components/Poster';

export default function Home() {
  const series = getAllSeries();
  const totalFilms = series.reduce((sum, s) => sum + s.films.length, 0);

  return (
    <>
      {/* 何ができるサイトかを、スクロールせずに伝える */}
      <section className="bg-[var(--color-night)] text-white">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-8 sm:pb-14 sm:pt-12">
          <h1 className="balance text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
            映画シリーズを、どの順番で観る？
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            公開順・時系列順・おすすめ順を切り替えて比較。観たものにチェックを入れると、次に観る作品と
            制覇率が出ます。順番をめぐる論点も出典つきで。
          </p>
          <p className="mt-5 text-xs text-white/50">
            {series.length}シリーズ・全{totalFilms}作を収録／登録なしで使えます
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {series.map((s) => {
            const posters = seriesPosters(s.slug, s.releaseOrder, 6);
            return (
              <li key={s.slug}>
                <Link
                  href={`/series/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_1px_2px_rgba(20,22,31,0.04)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_8px_24px_rgba(20,22,31,0.10)] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="balance text-base font-bold leading-snug sm:text-lg">{s.name}</h2>
                    <span className="mt-0.5 shrink-0 rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1 text-[11px] font-bold tabular-nums text-[var(--color-accent)]">
                      全{s.films.length}作
                    </span>
                  </div>

                  {/* シリーズの「引っかかりどころ」が、このカードの見どころ */}
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                    {s.tagline}
                  </p>

                  {posters.length > 0 && (
                    <div className="mt-4 flex pl-0.5" aria-hidden>
                      {posters.map((url, i) => (
                        <div
                          key={`${url}-${i}`}
                          className="rounded-lg bg-white p-[2px] shadow-[0_2px_6px_rgba(20,22,31,0.15)]"
                          style={{ marginLeft: i === 0 ? 0 : -18, zIndex: posters.length - i }}
                        >
                          <Poster src={url} alt="" size="sm" className="rounded-md" />
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="mt-auto pt-4 text-xs font-bold text-[var(--color-accent)]">
                    観る順番を見る →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
