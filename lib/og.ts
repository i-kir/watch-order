/**
 * OGP画像づくりの共通部分。
 *
 * ポスターは Satori に URL を渡さず、こちらで取得して data URI に変換してから渡す。
 * Satori に URL を渡すと、ビルド時にネットワークが使えない環境で例外になり、
 * ビルドごと落ちる。自分で取りにいけば、失敗した分を黙って捨てられる。
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export const OG_BG = '#14161f';
export const OG_ACCENT = '#5b8def';

async function toDataUri(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const type = res.headers.get('content-type') ?? 'image/jpeg';
    return `data:${type};base64,${buffer.toString('base64')}`;
  } catch {
    return null;
  }
}

/**
 * ポスターを data URI にして返す。取れなかったものは落とすので、
 * 戻り値が空配列になることもある（そのときは文字だけのカードになる）。
 */
export async function loadPosters(urls: string[], limit: number): Promise<string[]> {
  const picked = urls.slice(0, limit);
  const results = await Promise.all(picked.map(toDataUri));
  return results.filter((value): value is string => value !== null);
}
