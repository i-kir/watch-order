/**
 * このサイトの絶対 URL。
 *
 * sitemap.xml の <loc>、robots.txt、OGP、canonical はいずれも絶対 URL を要求する。
 * とくに canonical が重要で、Vercel は同じ内容を複数のドメインで配信するため
 * （デプロイごとの URL、ブランチ URL、本番ドメイン）、
 * 「どれが正規か」を示さないと評価が分散する。
 *
 * 優先順位:
 *   1. NEXT_PUBLIC_SITE_URL — 独自ドメインを使うときの手動指定
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel が自動で渡す本番ドメイン（protocol なし）
 *   3. localhost — ローカル開発
 *
 * 空文字は「未設定」として扱う。Vercel でキーだけ登録して値を空にすると
 * 空文字が入り、?? では素通りして new URL('') で落ちるため。
 */
function resolveSiteUrl(): string {
  const manual = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (manual) return manual;

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;

  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl().replace(/\/+$/, '');
