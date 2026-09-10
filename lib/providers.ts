import providers from '@/content/providers.json';

type ProviderFile = {
  /** データを取得した日（YYYY-MM-DD）。表示に使う */
  updatedAt: string;
  source: string;
  items: Record<string, { names: string[]; link: string | null }>;
};

const file = providers as ProviderFile;

/**
 * 日本での定額見放題の配信先。無ければ空配列。
 * レンタルと購入は含めない。「サブスクで観られるか」だけを答える。
 */
export function providersOf(seriesSlug: string, filmSlug: string): string[] {
  return file.items[`${seriesSlug}:${filmSlug}`]?.names ?? [];
}

/** その作品の JustWatch ページ。出典としてリンクする */
export function providerLink(seriesSlug: string, filmSlug: string): string | null {
  return file.items[`${seriesSlug}:${filmSlug}`]?.link ?? null;
}

/** 「2026年9月10日時点」の表記。配信は動くので、いつのデータかを必ず添える */
export function providersUpdatedAt(): string {
  const [y, m, d] = file.updatedAt.split('-');
  return `${y}年${Number(m)}月${Number(d)}日`;
}

/** シリーズ内で1件でも配信情報があるか。無ければ見出しごと出さない */
export function hasAnyProviders(seriesSlug: string): boolean {
  const prefix = `${seriesSlug}:`;
  return Object.keys(file.items).some((k) => k.startsWith(prefix));
}
