/**
 * シェア用の画像を canvas に描く。
 *
 * サーバー側（next/og）で作らないのは日本語フォントのため。
 * Satori は端末のフォントを使えないので日本語フォントの同梱か
 * 実行時取得が必要になり、失敗すると文字が全部豆腐になる。
 * ブラウザで描けば端末のフォントがそのまま使える。
 */
export type ShareCardData = {
  seriesName: string;
  watched: number;
  total: number;
  /** 視聴済みの合計時間（分）。不明なら null */
  minutes: number | null;
  nextTitle: string | null;
  /** 次に観る作品のポスター。読み込めなければ文字だけで描く */
  posterUrl?: string | null;
  orderLabel: string;
};

const W = 1200;
const H = 630;
const PAD = 72;

// ポスターを置く領域（右側）
const POSTER_W = 300;
const POSTER_H = 450;
const POSTER_X = W - PAD - POSTER_W;
const POSTER_Y = 90;

const INK = '#16161a';
const ACCENT = '#5b8def';
const MUTED = '#9a9aa8';
const LINE = '#2c2c36';

const FONT = '"Hiragino Sans", "Noto Sans JP", "Yu Gothic", system-ui, sans-serif';

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, start: number, min: number): number {
  let size = start;
  while (size > min) {
    ctx.font = `bold ${size}px ${FONT}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  return size;
}

function truncate(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let result = text;
  while (result.length > 1 && ctx.measureText(`${result}…`).width > maxWidth) {
    result = result.slice(0, -1);
  }
  return `${result}…`;
}

/**
 * TMDb の画像を canvas に描くには CORS 許可つきで読む必要がある。
 * 許可されないと canvas が汚染され、toBlob が例外になる。
 * 読めなければポスターなしで描くだけなので、失敗は握りつぶす。
 */
function loadImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
    // 読み込みが返ってこない場合に備える
    setTimeout(() => resolve(img.complete && img.naturalWidth > 0 ? img : null), 4000);
  });
}

export async function drawShareCard(canvas: HTMLCanvasElement, data: ShareCardData): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = W;
  canvas.height = H;

  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);

  const poster = data.posterUrl ? await loadImage(data.posterUrl) : null;
  const contentWidth = (poster ? POSTER_X - 40 : W - PAD) - PAD;

  // ポスター（右）
  if (poster) {
    ctx.save();
    roundRect(ctx, POSTER_X, POSTER_Y, POSTER_W, POSTER_H, 12);
    ctx.clip();
    drawCover(ctx, poster, POSTER_X, POSTER_Y, POSTER_W, POSTER_H);
    ctx.restore();
  }

  ctx.textBaseline = 'top';

  // シリーズ名
  const nameSize = fitText(ctx, data.seriesName, contentWidth, 44, 24);
  ctx.font = `bold ${nameSize}px ${FONT}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(truncate(ctx, data.seriesName, contentWidth), PAD, PAD);

  // 順番の種類
  ctx.font = `500 24px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.fillText(data.orderLabel, PAD, PAD + nameSize + 16);

  // 制覇率
  const percent = data.total === 0 ? 0 : Math.round((data.watched / data.total) * 100);

  ctx.font = `500 26px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.fillText('制覇率', PAD, 186);

  const percentText = `${percent}`;
  const percentY = 218;
  ctx.font = `bold 190px ${FONT}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(percentText, PAD, percentY);
  const percentWidth = ctx.measureText(percentText).width;

  ctx.font = `bold 72px ${FONT}`;
  ctx.fillStyle = ACCENT;
  ctx.fillText('%', PAD + percentWidth + 14, percentY + 118);

  // 本数と時間
  const stats = data.minutes !== null
    ? `${data.watched} / ${data.total}作　${formatHours(data.minutes)}`
    : `${data.watched} / ${data.total}作`;
  ctx.font = `bold 38px ${FONT}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(truncate(ctx, stats, contentWidth), PAD, 432);

  // 進捗バー
  const barY = 496;
  ctx.fillStyle = LINE;
  roundRect(ctx, PAD, barY, contentWidth, 12, 6);
  ctx.fill();
  if (percent > 0) {
    ctx.fillStyle = ACCENT;
    roundRect(ctx, PAD, barY, Math.max(12, (contentWidth * percent) / 100), 12, 6);
    ctx.fill();
  }

  // 次に観る作品
  if (data.nextTitle) {
    ctx.font = `500 24px ${FONT}`;
    ctx.fillStyle = MUTED;
    const label = '次に観るのは ';
    ctx.fillText(label, PAD, 544);
    const labelWidth = ctx.measureText(label).width;

    ctx.font = `bold 24px ${FONT}`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(truncate(ctx, data.nextTitle, contentWidth - labelWidth), PAD + labelWidth, 544);
  } else if (percent === 100) {
    ctx.font = `bold 26px ${FONT}`;
    ctx.fillStyle = ACCENT;
    ctx.fillText('全作制覇', PAD, 544);
  }

  // サイト名
  ctx.font = `500 22px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  ctx.fillText('観る順ナビ', W - PAD, H - PAD + 20);
  ctx.textAlign = 'left';
}

/** 縦横比を保ったまま領域いっぱいに描く（object-fit: cover 相当） */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
): void {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function formatHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}分`;
  if (rest === 0) return `${hours}時間`;
  return `${hours}時間${rest}分`;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}
