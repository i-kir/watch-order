import { ImageResponse } from 'next/og';
import { allPosters } from '@/lib/tmdb';
import { OG_ACCENT, OG_BG, OG_CONTENT_TYPE, OG_SIZE, loadPosters } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = '観る順ナビ';

/** トップページのOGP画像。シリーズ横断でポスターを並べる */
export default async function Image() {
  const all = allPosters('w185');
  // 同じシリーズが固まらないよう、間引いて散らす
  const step = Math.max(1, Math.floor(all.length / 14));
  const spread = all.filter((_, i) => i % step === 0);
  const posters = await loadPosters(spread, 12);
  const rows = [posters.slice(0, 6), posters.slice(6, 12)];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
          background: OG_BG,
          position: 'relative',
        }}
      >
        {rows.map((row, r) => (
          <div
            key={r}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transform: r === 0 ? 'translateX(-38px)' : 'translateX(38px)',
            }}
          >
            {row.map((src, i) => (
              <img
                key={i}
                src={src}
                width={172}
                height={258}
                style={{ objectFit: 'cover', borderRadius: 9 }}
              />
            ))}
          </div>
        ))}

        {/*
          Satori は inset のショートハンドを解釈しないので、四辺を個別に指定する。
          さらに、linear-gradient が効かなくても文字が読めるよう、
          まず単色の暗幕をかけてから下側だけ濃くする二層にしている。
        */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            backgroundColor: 'rgba(20,22,31,0.55)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 280,
            display: 'flex',
            background: 'linear-gradient(to top, rgba(20,22,31,0.98), rgba(20,22,31,0))',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            ...(posters.length === 0 ? { top: 0, bottom: 0 } : { bottom: 52 }),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', width: 40, height: 6, borderRadius: 3, background: OG_ACCENT }} />
          <div style={{ display: 'flex', color: '#ffffff', fontSize: 44, letterSpacing: 1, fontWeight: 700 }}>
            miruorder.com
          </div>
          <div style={{ display: 'flex', width: 40, height: 6, borderRadius: 3, background: OG_ACCENT }} />
        </div>
      </div>
    ),
    size
  );
}
