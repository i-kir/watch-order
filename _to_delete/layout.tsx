import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

const SITE_NAME = '観る順ナビ';
const SITE_DESCRIPTION =
  '映画シリーズを観る順番を、公開順・時系列順・おすすめ順で比較できます。順番をめぐる論点や、公式設定の矛盾も出典つきで示します。';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: `${SITE_NAME} | 映画シリーズを観る順番`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'ja_JP',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col">
        <header className="border-b border-[var(--color-line)] bg-white">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              観る順ナビ
            </Link>
            <span className="text-xs text-[var(--color-ink-soft)]">映画シリーズの観る順番</span>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-16 border-t border-[var(--color-line)] bg-white">
          <div className="mx-auto max-w-4xl px-4 py-8 text-xs leading-relaxed text-[var(--color-ink-soft)]">
            <p>
              作品情報の一部は TMDB の API を利用しています。This product uses the TMDB API but is not
              endorsed or certified by TMDB.
            </p>
            <p className="mt-2">
              各シリーズの順番は、ページ内に記載した出典に基づいています。公式設定に矛盾がある場合は、その旨を明記しています。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
