/**
 * 公開先の URL。
 *
 * Vercel で環境変数を「キーだけ登録して値は空」にすると空文字が入る。
 * `??` は null / undefined しか拾わないため空文字を素通りさせ、
 * new URL('') で落ちる。空文字も未設定として扱うために `||` で判定する。
 */
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (configured || 'http://localhost:3000').replace(/\/+$/, '');
