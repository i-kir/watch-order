import type { Film, OrderKey, Series } from './types';
import { seriesList } from '@/content/series';

export const ORDER_LABELS: Record<OrderKey, string> = {
  release: '公開順',
  chrono: '時系列順',
  recommended: 'おすすめ順',
};

export const ORDER_DESCRIPTIONS: Record<OrderKey, string> = {
  release: '公開された順。作り手が観客に見せた順序で、伏線や驚きが意図どおりに働きます。',
  chrono: '作中の年代順。物語の流れは分かりやすくなりますが、後の作品のネタバレを先に踏むことがあります。',
  recommended: '初めて観る人向けの順。公開順を基本にしつつ、脱落しやすい箇所を避けています。',
};

/**
 * 順序定義が作品一覧と食い違っていないか検査する。
 * slug の綴り違いは黙って作品が消えるだけで気づけないため、
 * ビルド時に落とす。
 */
function validate(series: Series): void {
  const slugs = new Set(series.films.map((f) => f.slug));
  if (slugs.size !== series.films.length) {
    throw new Error(`[${series.slug}] films の slug が重複しています`);
  }

  const check = (name: string, list: string[], mustCoverAll: boolean) => {
    const unknown = list.filter((slug) => !slugs.has(slug));
    if (unknown.length > 0) {
      throw new Error(`[${series.slug}] ${name} に未定義の slug: ${unknown.join(', ')}`);
    }
    const duplicated = list.filter((slug, i) => list.indexOf(slug) !== i);
    if (duplicated.length > 0) {
      throw new Error(`[${series.slug}] ${name} に重複: ${duplicated.join(', ')}`);
    }
    if (mustCoverAll && list.length !== series.films.length) {
      const missing = [...slugs].filter((slug) => !list.includes(slug));
      throw new Error(`[${series.slug}] ${name} に漏れ: ${missing.join(', ')}`);
    }
  };

  check('releaseOrder', series.releaseOrder, true);
  check('chronoOrder', series.chronoOrder, true);
  if (series.recommendedOrder) {
    // おすすめ順は一部を省いてもよいので、全件は求めない
    check('recommendedOrder', series.recommendedOrder.map((s) => s.slug), false);
  }
}

let validated = false;

export function getAllSeries(): Series[] {
  if (!validated) {
    for (const series of seriesList) validate(series);
    validated = true;
  }
  return seriesList;
}

export function getSeries(slug: string): Series | undefined {
  return getAllSeries().find((s) => s.slug === slug);
}

export function filmMap(series: Series): Map<string, Film> {
  return new Map(series.films.map((f) => [f.slug, f]));
}

export type OrderedEntry = { film: Film; reason?: string };

/** 指定した順序で作品を並べる。定義のない順序は空配列を返す */
export function orderedFilms(series: Series, order: OrderKey): OrderedEntry[] {
  const byslug = filmMap(series);
  const entries: OrderedEntry[] = [];

  if (order === 'recommended') {
    for (const step of series.recommendedOrder ?? []) {
      const film = byslug.get(step.slug);
      // slug の綴り違いに気づけるよう、無いものは黙って落とす
      if (film) entries.push({ film, reason: step.reason });
    }
    return entries;
  }

  const slugs = order === 'release' ? series.releaseOrder : series.chronoOrder;
  for (const slug of slugs) {
    const film = byslug.get(slug);
    if (film) entries.push({ film });
  }
  return entries;
}

/** 3つ目の順番の呼び名。シリーズ側で上書きできる */
export function labelOf(series: Series, order: OrderKey): string {
  if (order === 'recommended' && series.recommendedLabel) return series.recommendedLabel;
  return ORDER_LABELS[order];
}

export function descriptionOf(series: Series, order: OrderKey): string {
  if (order === 'recommended' && series.recommendedDescription) return series.recommendedDescription;
  return ORDER_DESCRIPTIONS[order];
}

export function availableOrders(series: Series): OrderKey[] {
  const orders: OrderKey[] = ['release', 'chrono'];
  if (series.recommendedOrder && series.recommendedOrder.length > 0) orders.push('recommended');
  return orders;
}
