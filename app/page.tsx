import Link from 'next/link';
import { getAllSeries } from '@/lib/series';
import { allPosters, seriesPosters } from '@/lib/tmdb';
import Poster from '@/components/Poster';
import PosterWall from '@/components/PosterWall';

export default function Home() {
  const series = getAllSeries();
  const totalFilms = series.reduce((sum, s) => sum + s.films.length, 0);
  // 同じ作品が固まらないよう、シリーズをまたいで間引く
  const wall = allPosters('w185').filter((_, i) => i % 2 === 0);

  return (
    <>
      {/* ポスターを背景に敷いて、何を扱うサイトかを一目で伝える */}
      <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
        <PosterWall posters={wall} />

        {/* 文字を読ませるための覆い。ポスターは気配だけ残す */}
        <div className="absolute inset-0 bg-[var(--color-night)]/65" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-night)] from-45% via-[var(--color-night)]/80 via-75% to-[var(--color-night)]/25"
          aria-hidden
        />
        {/* 下端をページの地色へ落として、切れ目を目立たせない */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--color-night)] to-transparent"
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-10 sm:pb-16 sm:pt-14">
          <h1 className="balance text-2xl font-bold leading-tight tracking-tight drop-shadow sm:text-4xl">
            映画シリーズを、どの順番で観る？
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            公開順・時系列順・おすすめ順を切り替えて比較。観たものにチェックを入れると、次に観る作品と
            制覇率が出ます。順番をめぐる論点も出典つきで。
          </p>
          <p className="mt-5 text-xs text-white/50">
            {series.length}シリーズ・全{totalFilms}作を収録／登録なしで使えます
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <ul className="grid gap-4 sm:grid-cols-2">
          {series.map((s) => {
            const posters = seriesPosters(s.slug, s.releaseOrder, 8);
            return (
              <li key={s.slug}>
                <Link
                  href={`/series/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_1px_2px_rgba(20,22,31,0.04)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_10px_30px_rgba(20,22,31,0.12)]"
                >
                  {posters.length > 0 && (
                    <div className="relative bg-[var(--color-night)]" aria-hidden>
                      <div className="flex gap-1.5 overflow-hidden p-3">
                        {posters.map((url, i) => (
                          <Poster
                            key={`${url}-${i}`}
                            src={url}
                            alt=""
                            size="md"
                            className="h-[96px] w-auto shrink-0 rounded object-cover sm:h-[112px]"
                          />
                        ))}
                      </div>
                      {/* 右端で切れているのではなく「まだ続く」ことを見せる */}
                      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--color-night)] to-transparent" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
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

                    <span className="mt-auto pt-4 text-xs font-bold text-[var(--color-accent)]">
                      観る順番を見る →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
