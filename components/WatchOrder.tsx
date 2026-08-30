'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Film, OrderKey, Series } from '@/lib/types';
import { ORDER_DESCRIPTIONS, ORDER_LABELS } from '@/lib/series';

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
  const watchedCount = useMemo(
    () => entries.filter((e) => watched.has(e.film.slug)).length,
    [entries, watched]
  );
  const next = entries.find((e) => !watched.has(e.film.slug));
  const percent = entries.length === 0 ? 0 : Math.round((watchedCount / entries.length) * 100);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="観る順番の種類">
        {orders.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={order === key}
            onClick={() => setOrder(key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              order === key
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-white text-[var(--color-ink-soft)] ring-1 ring-[var(--color-line)] hover:ring-[var(--color-accent)]'
            }`}
          >
            {ORDER_LABELS[key]}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
        {ORDER_DESCRIPTIONS[order]}
      </p>

      {loaded && (
        <div className="mt-6 rounded-xl border border-[var(--color-line)] bg-white p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm font-medium">
              {watchedCount} / {entries.length} 作を視聴済み
              <span className="ml-2 text-[var(--color-ink-soft)]">{percent}%</span>
            </p>
            {watchedCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="text-xs text-[var(--color-ink-soft)] underline hover:text-[var(--color-ink)]"
              >
                チェックをすべて外す
              </button>
            )}
          </div>

          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-line)]">
            <div
              className="h-full rounded-full bg-[var(--color-accent)] transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>

          {next ? (
            <p className="mt-3 text-sm">
              次に観るのは <span className="font-bold">{next.film.title}</span>
            </p>
          ) : (
            watchedCount > 0 && <p className="mt-3 text-sm font-bold">この順番はすべて観終えました</p>
          )}
        </div>
      )}

      <ol className="mt-6 space-y-3">
        {entries.map((entry, index) => {
          const isWatched = watched.has(entry.film.slug);
          const isNext = next?.film.slug === entry.film.slug;

          return (
            <li key={entry.film.slug}>
              <label
                className={`flex cursor-pointer gap-4 rounded-xl border bg-white p-4 transition ${
                  isNext
                    ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]'
                    : 'border-[var(--color-line)]'
                } ${isWatched ? 'opacity-60' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={isWatched}
                  onChange={() => toggle(entry.film.slug)}
                  className="mt-1 size-5 shrink-0 accent-[var(--color-accent)]"
                  aria-label={`${entry.film.title} を視聴済みにする`}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm font-bold tabular-nums text-[var(--color-accent)]">
                      {index + 1}.
                    </span>
                    <h3 className={`font-bold ${isWatched ? 'line-through' : ''}`}>
                      {entry.film.title}
                    </h3>
                    <span className="text-xs text-[var(--color-ink-soft)]">{entry.film.year}年</span>
                  </div>

                  <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">
                    {entry.film.originalTitle}
                    {entry.film.setting && <span className="ml-2">設定: {entry.film.setting}</span>}
                  </p>

                  {entry.reason && (
                    <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{entry.reason}</p>
                  )}

                  {entry.film.note && (
                    <p className="mt-2 rounded-lg bg-[var(--color-accent-soft)] px-3 py-2 text-xs leading-relaxed">
                      {entry.film.note}
                    </p>
                  )}
                </div>
              </label>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
