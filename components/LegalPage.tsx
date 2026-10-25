import type { ReactNode } from 'react';

/** 運営者情報・プライバシーポリシーなど、文章中心のページの枠 */
export function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  /** 「2026年10月25日」の形式。最終更新日として表示する */
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 pt-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-2 text-xs text-[var(--color-ink-faint)]">最終更新日：{updatedAt}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold sm:text-xl">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
        {children}
      </div>
    </section>
  );
}
