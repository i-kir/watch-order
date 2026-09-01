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
  orderLabel: string;
};

const W = 1200;
const H = 630;

const INK = '#16161a';
const ACCENT = '#5b8def';
const MUTED = '#9a9aa8';
const LINE = '#2c2c36';

const FONT = '"Hiragino Sans", "Noto Sans JP", "Yu Gothic", system-ui, sans-serif';

/** 指定幅に収まるまでフォントサイズを下げる */
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

export function drawShareCard(canvas: HTMLCanvasElement, data: ShareCardData): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = W;
  canvas.height = H;

  // 背景
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);

  const padding = 72;
  const percent = data.total === 0 ? 0 : Math.round((data.watched / data.total) * 100);

  // シリーズ名
  const nameSize = fitText(ctx, data.seriesName, W - padding * 2, 44, 26);
  ctx.font = `bold ${nameSize}px ${FONT}`;
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'top';
  ctx.fillText(truncate(ctx, data.seriesName, W - padding * 2), padding, padding);

  // 順番の種類
  ctx.font = `500 24px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.fillText(data.orderLabel, padding, padding + nameSize + 16);

  // 制覇率（主役）
  ctx.font = `500 26px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.fillText('制覇率', padding, 186);

  const percentText = `${percent}`;
  const percentY = 218;
  ctx.font = `bold 190px ${FONT}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(percentText, padding, percentY);
  const percentWidth = ctx.measureText(percentText).width;

  // % は数字のベースライン側に揃える
  ctx.font = `bold 72px ${FONT}`;
  ctx.fillStyle = ACCENT;
  ctx.fillText('%', padding + percentWidth + 14, percentY + 118);

  // 本数と時間
  const stats = data.minutes !== null
    ? `${data.watched} / ${data.total}作　${formatHours(data.minutes)}`
    : `${data.watched} / ${data.total}作`;
  ctx.font = `bold 40px ${FONT}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(stats, padding, 432);

  // 進捗バー
  const barY = 496;
  const barW = W - padding * 2;
  ctx.fillStyle = LINE;
  roundRect(ctx, padding, barY, barW, 12, 6);
  ctx.fill();
  if (percent > 0) {
    ctx.fillStyle = ACCENT;
    roundRect(ctx, padding, barY, Math.max(12, (barW * percent) / 100), 12, 6);
    ctx.fill();
  }

  // 次に観る作品
  if (data.nextTitle) {
    ctx.font = `500 26px ${FONT}`;
    ctx.fillStyle = MUTED;
    const label = '次に観るのは ';
    ctx.fillText(label, padding, 544);
    const labelWidth = ctx.measureText(label).width;

    ctx.font = `bold 26px ${FONT}`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(truncate(ctx, data.nextTitle, barW - labelWidth - 200), padding + labelWidth, 544);
  } else if (percent === 100) {
    ctx.font = `bold 26px ${FONT}`;
    ctx.fillStyle = ACCENT;
    ctx.fillText('全作制覇', padding, 544);
  }

  // サイト名
  ctx.font = `500 24px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  ctx.fillText('観る順ナビ', W - padding, 544);
  ctx.textAlign = 'left';
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
