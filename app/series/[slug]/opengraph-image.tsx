import { ImageResponse } from 'next/og';
import { getAllSeries, getSeries } from '@/lib/series';
import { seriesPosters } from '@/lib/tmdb';
import { OG_ACCENT, OG_BG, OG_CONTENT_TYPE, OG_SIZE, loadPosters } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = '観る順ナビ';

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ slug: s.slug }));
}

/**
 * シリーズごとのOGP画像。
 *
 * 画像に日本語を焼き込んでいないのは、Satori が端末のフォントを使えないため。
 * 日本語を出すにはフォントの同梱が要り、失敗すると全部豆腐になる。
 * 作品名は og:title として別に渡していて、X も LINE も Discord も
 * 画像の隣にタイトルを文字で表示するので、画像側はポスターに徹している。
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const series = getSeries(slug);
  const posters = series
    ? await loadPosters(seriesPosters(series.slug, series.releaseOrder, 5), 5)
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: OG_BG,
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {posters.map((src, i) => (
            <img
              key={i}
              src={src}
              width={250}
              height={375}
              style={{
                objectFit: 'cover',
                borderRadius: 12,
                // 少し重ねて扇状にする。トップのポスター壁と同じ見え方に寄せる
                marginLeft: i === 0 ? 0 : -28,
                transform: `rotate(${i % 2 === 0 ? -2.5 : 2.5}deg)`,
                boxShadow: '0 22px 50px rgba(0,0,0,0.6)',
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            // ポスターが1枚も取れなかったときは、下に寄せると余白だけの絵になる
            ...(posters.length === 0 ? { top: 0, bottom: 0 } : { bottom: 44 }),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', width: 34, height: 5, borderRadius: 3, background: OG_ACCENT }} />
          <div style={{ display: 'flex', color: '#ffffff', fontSize: 34, letterSpacing: 1, fontWeight: 700 }}>
            miruorder.com
          </div>
          <div style={{ display: 'flex', width: 34, height: 5, borderRadius: 3, background: OG_ACCENT }} />
        </div>
      </div>
    ),
    size
  );
}
