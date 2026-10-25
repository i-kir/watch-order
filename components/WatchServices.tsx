import { serviceCoverage } from '@/lib/affiliate';
import { providersUpdatedAt } from '@/lib/providers';
import type { Series } from '@/lib/types';

/**
 * 「どこで観られるか」の案内。アフィリエイトリンクを持つサービスだけを、
 * そのシリーズの見放題作品数が多い順に並べる。リンクが1件も無ければ何も出さない。
 *
 * 広告であることは、リンクの直前に「PR」と文で示す（ステルスマーケティング規制への対応）。
 * rel に sponsored を付けて、検索エンジンにも広告リンクだと伝える。
 */
export default function WatchServices({ series }: { series: Series }) {
  const services = serviceCoverage(series);
  if (services.length === 0) return null;

  const total = series.films.length;

  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold sm:text-xl">この順番で観られるサービス</h2>
      <p className="mt-2 text-xs leading-relaxed text-[var(--color-ink-soft)]">
        <span className="mr-1.5 rounded border border-[var(--color-line)] px-1 py-px font-bold">
          PR
        </span>
        このセクションのリンクは広告（アフィリエイト）です。作品数は{providersUpdatedAt()}
        時点の見放題の配信状況で、変わることがあります。
      </p>

      <ul className="mt-4 space-y-2">
        {services.map((service) => (
          <li key={service.name}>
            <a
              href={service.url}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-4 transition hover:border-[var(--color-accent)]"
            >
              <span>
                <span className="block text-[15px] font-bold">{service.name}</span>
                <span className="mt-0.5 block text-xs text-[var(--color-ink-soft)]">
                  全{total}作中 {service.count}作が見放題
                </span>
              </span>
              <span className="shrink-0 rounded-full bg-[var(--color-accent)] px-3 py-1.5 text-xs font-bold text-white">
                公式サイトへ
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
