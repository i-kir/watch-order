'use client';

import { useEffect, useRef, useState } from 'react';
import { canvasToBlob, drawShareCard, type ShareCardData } from '@/lib/shareCard';

type Props = ShareCardData & { seriesSlug: string };

type Support = 'unknown' | 'share' | 'download';

export default function ShareProgress({ seriesSlug, ...data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [support, setSupport] = useState<Support>('unknown');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 画像つき共有に対応しているか（スマホの共有シートが使えるか）を調べる
    const probe = new File(['x'], 'probe.png', { type: 'image/png' });
    const canShareFiles =
      typeof navigator !== 'undefined' &&
      typeof navigator.canShare === 'function' &&
      navigator.canShare({ files: [probe] });
    setSupport(canShareFiles ? 'share' : 'download');
  }, []);

  useEffect(() => {
    // ポスターの読み込みを待つので非同期。描き終わる前に条件が変われば後勝ちでよい
    if (canvasRef.current) void drawShareCard(canvasRef.current, data);
  }, [data]);

  const withCanvas = async (action: (blob: Blob) => Promise<void> | void) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setBusy(true);
    setMessage('');
    try {
      const blob = await canvasToBlob(canvas);
      if (!blob) throw new Error('画像を作れませんでした');
      await action(blob);
    } catch (error) {
      // 共有シートを閉じただけの場合はエラー扱いしない
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  };

  const shareText = `${data.seriesName} 制覇率 ${percentOf(data)}%（${data.watched}/${data.total}作）`;
  const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}/series/${seriesSlug}` : '';

  const handleShare = () =>
    withCanvas(async (blob) => {
      const file = new File([blob], `${seriesSlug}-progress.png`, { type: 'image/png' });
      await navigator.share({ files: [file], text: shareText, url: pageUrl });
    });

  const handleDownload = () =>
    withCanvas((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${seriesSlug}-progress.png`;
      a.click();
      URL.revokeObjectURL(url);
      setMessage('画像を保存しました。X に添付して投稿できます。');
    });

  const handleCopy = () =>
    withCanvas(async (blob) => {
      if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
        throw new Error('このブラウザは画像のコピーに対応していません。保存してお使いください。');
      }
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setMessage('画像をコピーしました。X の投稿画面に貼り付けられます。');
    });

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;

  // 0件のとき丸ごと消すと「シェア機能が無い」と誤解されるので、条件だけ伝える
  if (data.watched === 0) {
    return (
      <section className="mt-6 rounded-2xl border border-dashed border-[var(--color-line)] bg-white/60 p-4 text-center">
        <p className="text-sm font-bold text-[var(--color-ink-soft)]">記録を画像でシェア</p>
        <p className="mt-1 text-xs text-[var(--color-ink-faint)]">
          観た作品にチェックを入れると、制覇率の画像を作れます
        </p>
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-2xl border border-[var(--color-line)] bg-white p-4">
      <h2 className="text-sm font-bold">記録を画像でシェア</h2>

      <canvas
        ref={canvasRef}
        className="mt-3 w-full rounded-lg border border-[var(--color-line)]"
        style={{ aspectRatio: '1200 / 630' }}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {support === 'share' && (
          <button
            type="button"
            onClick={handleShare}
            disabled={busy}
            className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-bold text-white disabled:opacity-50"
          >
            画像をシェア
          </button>
        )}

        <button
          type="button"
          onClick={handleCopy}
          disabled={busy}
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[var(--color-ink)] ring-1 ring-[var(--color-line)] disabled:opacity-50"
        >
          画像をコピー
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={busy}
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[var(--color-ink)] ring-1 ring-[var(--color-line)] disabled:opacity-50"
        >
          画像を保存
        </button>

        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[var(--color-ink)] ring-1 ring-[var(--color-line)]"
        >
          X で投稿
        </a>
      </div>

      {message && <p className="mt-2 text-xs text-[var(--color-ink-soft)]">{message}</p>}

      <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
        視聴済みのチェックはこの端末にだけ保存されます。画像を作るときも送信されません。
      </p>
    </section>
  );
}

function percentOf(data: ShareCardData): number {
  return data.total === 0 ? 0 : Math.round((data.watched / data.total) * 100);
}
