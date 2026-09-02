'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Film, OrderKey, Series } from '@/lib/types';
import { descriptionOf, labelOf } from '@/lib/series';
import { formatRuntime, posterOf, totalRuntime, tmdbOf } from '@/lib/tmdb';
import Poster from './Poster';
import ShareProgress from './ShareProgress';

type Entry = { film: Film; reason?: string };

type Props = {
  series: Series;
  orders: OrderKey[];
  entriesByOrder: Record<string, Entry[]>;
};

const storageKey = (slug: string) => `watched:${slug}`;

/** 視聴済みはこの端末にだけ残す。ログインを要求すると、試す前に離脱されるため */
function useWatched(seriesSlug: string) {
  const [watched, setWatched] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(seriesSlug));
      if (raw) setWatched(new Set(JSON.parse(raw) as string[]));
    } catch {
      // プライベートモードなどで読めなくても、機能を止めない
    }
    setLoaded(true);
  }, [seriesSlug]);

  const toggle = (slug: string) => {
    setWatched((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      try {
        localStorage.setItem(storageKey(seriesSlug), JSON.stringify([...next]));
      } catch {
        // 保存できなくても画面上の操作は通す
      }
      return next;
    });
  };

  const reset = () => {
    setWatched(new Set());
    try {
      localStorage.removeItem(storageKey(seriesSlug));
    } catch {
      // 何もしない
    }
  };

  return { watched, toggle, reset, loaded };
}

export default function WatchOrder({ series, orders, entriesByOrder }: Props) {
  const [order, setOrder] = useState<OrderKey>(orders[0]);
  const { watched, toggle, reset, loaded } = useWatched(series.slug);

  const entries = entriesByOrder[order] ?? [];
  const watchedSlugs = useMemo(
    () => entries.filter((e) => watched.has(e.film.slug)).map((e) => e.film.slug),
    [entries, watched]
  );
  const watchedCount = watchedSlugs.length;
  const next = entries.find((e) => !watched.has(e.film.slug));
  const percent = entries.length === 0 ? 0 : Math.round((watchedCount / entries.length) * 100);

  // 上映時間は TMDb から取り込んだときだけ出す（未取得なら本数だけ表示）
  const minutes = useMemo(
    () => totalRuntime(series.slug, watchedSlugs),
    [series.slug, watchedSlugs]
  );

  return (
    <div>
      {/* 長いリストを見ている途中でも順番を切り替えられるよう、上に貼り付ける */}
      <div className="sticky top-0 z-20 -mx-4 border-b border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-2.5">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="観る順番の種類">
          {orders.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={order === key}
              onClick={() => setOrder(key)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition ${
                order === key
                  ? 'bg-[var(--color-accent)] text-white shadow-sm'
                  : 'bg-white text-[var(--color-ink-soft)] ring-1 ring-[var(--color-line)] hover:ring-[var(--color-accent)]'
              }`}
            >
              {labelOf(series, key)}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
        {descriptionOf(series, order)}
      </p>

      {loaded && (
        <div className="mt-4 rounded-2xl border border-[var(--color-line)] bg-white p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tabular-nums leading-none text-[var(--color-accent)]">
                {percent}
              </span>
              <span className="text-sm font-bold text-[var(--color-accent)]">%</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium tabular-nums">
                  {watchedCount} / {entries.length} 作
                  {minutes !== null && watchedCount > 0 && (
                    <span className="ml-2 font-normal text-[var(--color-ink-soft)]">
                      {formatRuntime(minutes)}
                    </span>
                  )}
                </p>
                {watchedCount > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    className="shrink-0 text-xs text-[var(--color-ink-faint)] underline hover:text-[var(--color-ink)]"
                  >
                    リセット
                  </button>
                )}
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--color-line)]">
                <div
                  className="h-full rounded-full bg-[var(--color-accent)] transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </div>

          {next ? (
            <p className="mt-3 border-t border-[var(--color-line)] pt-3 text-sm">
              <span className="text-[var(--color-ink-soft)]">次に観るのは</span>{' '}
              <span className="font-bold">{next.film.title}</span>
            </p>
          ) : (
            watchedCount > 0 && (
              <p className="mt-3 border-t border-[var(--color-line)] pt-3 text-sm font-bold">
                🎉 この順番はすべて観終えました
              </p>
            )
          )}
        </div>
      )}

      <ol className="mt-4 space-y-2">
        {entries.map((entry, index) => {
          const isWatched = watched.has(entry.film.slug);
          const isNext = next?.film.slug === entry.film.slug;
          const runtime = tmdbOf(series.slug, entry.film.slug)?.runtime;

          return (
            <li key={entry.film.slug}>
              <label
                className={`relative flex cursor-pointer gap-3 rounded-2xl border bg-white p-3 transition sm:gap-4 sm:p-4 ${
                  isNext
                    ? 'border-[var(--color-accent)] shadow-[0_0_0_1px_var(--color-accent)]'
                    : 'border-[var(--color-line)]'
                } ${isWatched ? 'bg-[var(--color-paper)]' : ''}`}
              >
                {isNext && (
                  <span className="absolute -top-2 left-3 rounded-full bg-[var(--color-accent)] px-2 py-0.5 text-[10px] font-bold text-white">
                    次はこれ
                  </span>
                )}

                <span
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums ${
                    isWatched
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-[var(--color-paper)] text-[var(--color-ink-faint)] ring-1 ring-[var(--color-line)]'
                  }`}
                  aria-hidden
                >
                  {index + 1}
                </span>

                <div className={`relative shrink-0 ${isWatched ? 'opacity-45' : ''}`}>
                  <Poster
                    src={posterOf(series.slug, entry.film.slug)}
                    alt=""
                    size="sm"
                    className="rounded-md ring-1 ring-black/5"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3
                    className={`text-[15px] font-bold leading-snug ${
                      isWatched ? 'text-[var(--color-ink-faint)] line-through' : ''
                    }`}
                  >
                    {entry.film.title}
                  </h3>

                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[var(--color-ink-faint)]">
                    <span className="tabular-nums">{entry.film.year}年</span>
                    {runtime ? <span className="tabular-nums">{formatRuntime(runtime)}</span> : null}
                    {entry.film.setting && <span>設定 {entry.film.setting}</span>}
                  </p>

                  {entry.reason && (
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-ink-soft)]">
                      {entry.reason}
                    </p>
                  )}

                  {entry.film.note && (
                    <p className="mt-1.5 border-l-2 border-[var(--color-accent)]/30 pl-2.5 text-xs leading-relaxed text-[var(--color-ink-soft)]">
                      {entry.film.note}
                    </p>
                  )}
                </div>

                <input
                  type="checkbox"
                  checked={isWatched}
                  onChange={() => toggle(entry.film.slug)}
                  className="mt-0.5 size-6 shrink-0 self-center accent-[var(--color-accent)]"
                  aria-label={`${entry.film.title} を視聴済みにする`}
                />
              </label>
            </li>
          );
        })}
      </ol>

      {/* チェックを付け終わった直後の位置に置く。リストの上だと、戻らないと押せない */}
      {loaded && (
        <ShareProgress
          seriesSlug={series.slug}
          seriesName={series.name}
          watched={watchedCount}
          total={entries.length}
          minutes={minutes}
          nextTitle={next?.film.title ?? null}
          posterUrl={posterOf(series.slug, (next ?? entries[entries.length - 1])?.film.slug ?? '', 'w342')}
          orderLabel={labelOf(series, order)}
        />
      )}
    </div>
  );
}
