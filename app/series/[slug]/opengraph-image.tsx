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
    ? await loadPosters(seriesPosters(series.slug, series.releaseOrder, 6), 6)
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
            gap: 4,
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          {posters.map((src, i) => (
            <img
              key={i}
              src={src}
              width={186}
              height={279}
              style={{
                objectFit: 'cover',
                borderRadius: 10,
                transform: `rotate(${i % 2 === 0 ? -2.5 : 2.5}deg)`,
                boxShadow: '0 18px 40px rgba(0,0,0,0.55)',
              }}
            />
          ))}
        </div>

        {/* 下half を暗く落として、ロゴの帯を読ませる */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 220,
            display: 'flex',
            background: `linear-gradient(to top, ${OG_BG} 35%, rgba(20,22,31,0))`,
          }}
        />

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
