#!/usr/bin/env node
// 各作品のポスター画像とあらすじを TMDb から取得して content/tmdb.json に保存する。
//
//   TMDB_API_KEY=xxxx node scripts/fetch-tmdb.mjs
//   TMDB_API_KEY=xxxx node scripts/fetch-tmdb.mjs --series mcu
//
// 取得結果はコミットするので、ビルド時に API キーは不要になる。
// TMDb の規約により、画面には次の表記が必要です（app/layout.tsx に記載済み）。
//   This product uses the TMDB API but is not endorsed or certified by TMDB.
import { readFile, writeFile } from 'node:fs/promises';

const API = 'https://api.themoviedb.org/3';
const KEY = process.env.TMDB_API_KEY;

const args = process.argv.slice(2);
const only = args.includes('--series') ? args[args.indexOf('--series') + 1] : null;

if (!KEY) {
  console.error('TMDB_API_KEY を設定してください。');
  console.error('https://www.themoviedb.org/settings/api で無料取得できます。');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** TS の定義ファイルから slug / 原題 / 公開年 だけを取り出す（実行せずに読む） */
async function readFilms(file) {
  const text = await readFile(new URL(`../content/series/${file}`, import.meta.url), 'utf8');
  const seriesSlug = text.match(/slug:\s*'([^']+)'/)?.[1];
  const films = [];
  const re = /\{\s*slug:\s*'([^']+)',\s*title:\s*'([^']*)',\s*originalTitle:\s*'([^']*)',\s*year:\s*(\d{4})/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    films.push({ slug: m[1], title: m[2], originalTitle: m[3], year: Number(m[4]) });
  }
  return { seriesSlug, films };
}

async function search(originalTitle, year) {
  const url = `${API}/search/movie?api_key=${KEY}&language=ja-JP&query=${encodeURIComponent(originalTitle)}&year=${year}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.results?.[0] ?? null;
}

async function main() {
  const files = ['mcu.ts', 'star-wars.ts', 'wizarding-world.ts', 'x-men.ts', 'fast-furious.ts'];
  const outPath = new URL('../content/tmdb.json', import.meta.url);
  const existing = JSON.parse(await readFile(outPath, 'utf8').catch(() => '{}'));

  let found = 0;
  let missed = 0;

  for (const file of files) {
    const { seriesSlug, films } = await readFilms(file);
    if (only && seriesSlug !== only) continue;

    console.log(`\n── ${seriesSlug}（${films.length}作）`);

    for (const film of films) {
      const key = `${seriesSlug}:${film.slug}`;
      if (existing[key]) {
        console.log(`  = ${film.title}（取得済み）`);
        continue;
      }

      try {
        const hit = await search(film.originalTitle, film.year);
        if (!hit) {
          console.log(`  ✗ ${film.title}（見つからず）`);
          missed++;
        } else {
          existing[key] = {
            tmdbId: hit.id,
            posterPath: hit.poster_path ?? null,
            overview: hit.overview ?? '',
          };
          console.log(`  ✓ ${film.title} → TMDb #${hit.id}`);
          found++;
        }
      } catch (error) {
        console.log(`  ✗ ${film.title}（${error.message}）`);
        missed++;
      }

      // TMDb に負荷をかけない
      await sleep(250);
    }
  }

  await writeFile(outPath, JSON.stringify(existing, null, 2) + '\n');
  console.log(`\n取得 ${found}件 / 失敗 ${missed}件`);
  console.log('content/tmdb.json を更新しました。差分を確認してコミットしてください。');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
