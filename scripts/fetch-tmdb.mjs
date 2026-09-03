#!/usr/bin/env node
// 各作品のポスター画像とあらすじを TMDb から取得して content/tmdb.json に保存する。
//
//   TMDB_API_KEY=xxxx node scripts/fetch-tmdb.mjs
//   TMDB_API_KEY=xxxx node scripts/fetch-tmdb.mjs --series mcu
//
// 取得結果はコミットするので、ビルド時に API キーは不要になる。
// TMDb の規約により、画面には次の表記が必要です（app/layout.tsx に記載済み）。
//   This product uses the TMDB API but is not endorsed or certified by TMDB.
import { readdir, readFile, writeFile } from 'node:fs/promises';

const API = 'https://api.themoviedb.org/3';
/** .env.local に TMDB_API_KEY を書いておけば、毎回渡さなくてよい */
async function loadKey() {
  if (process.env.TMDB_API_KEY) return process.env.TMDB_API_KEY;
  try {
    const text = await readFile(new URL('../.env.local', import.meta.url), 'utf8');
    return text.match(/^TMDB_API_KEY=(.+)$/m)?.[1]?.trim() ?? null;
  } catch {
    return null;
  }
}

const KEY = await loadKey();

const args = process.argv.slice(2);
const only = args.includes('--series') ? args[args.indexOf('--series') + 1] : null;
/** 取得済みでも取り直す。ポスターの差し替えなどに使う */
const force = args.includes('--force');

if (!KEY) {
  console.error('TMDB_API_KEY を設定してください。');
  console.error('https://www.themoviedb.org/settings/api で無料取得できます。');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * TS の定義ファイルから slug / 原題 / 公開年 / tmdbId を取り出す（実行せずに読む）。
 * films 配列の範囲だけを見る。シリーズ自身の slug と同名の作品
 * （x-men シリーズの『X-メン』など）を取りこぼさないため。
 */
async function readFilms(file) {
  const text = await readFile(new URL(`../content/series/${file}`, import.meta.url), 'utf8');
  const seriesSlug = text.match(/slug:\s*'([^']+)'/)?.[1];

  const from = text.indexOf('films: [');
  const to = text.indexOf('releaseOrder:');
  if (from < 0 || to < 0) return { seriesSlug, films: [] };
  const body = text.slice(from, to);

  const starts = [...body.matchAll(/\{\s*slug:\s*'([^']+)'/g)];
  const films = [];

  for (let i = 0; i < starts.length; i++) {
    const s0 = starts[i].index;
    const s1 = i + 1 < starts.length ? starts[i + 1].index : body.length;
    const block = body.slice(s0, s1);

    const title = block.match(/title:\s*'([^']*)'/)?.[1];
    const originalTitle =
      block.match(/originalTitle:\s*'([^']*)'/)?.[1] ??
      block.match(/originalTitle:\s*"([^"]*)"/)?.[1];
    const year = block.match(/year:\s*(\d{4})/)?.[1];
    // 検索では取り違える作品は、定義側で ID を直接指定できる
    const tmdbId = block.match(/tmdbId:\s*(\d+)/)?.[1];
    // TVシリーズは /search/tv を引く必要がある
    const kind = block.match(/kind:\s*'(film|tv)'/)?.[1] ?? 'film';
    // 親番組のシーズンとして登録されている編は、シーズンを直接引く
    const season = block.match(/season:\s*(\d+)/)?.[1];

    if (!title || !originalTitle || !year) continue;
    films.push({
      slug: starts[i][1],
      title,
      originalTitle,
      year: Number(year),
      kind,
      season: season != null ? Number(season) : null,
      tmdbId: tmdbId ? Number(tmdbId) : null,
    });
  }

  return { seriesSlug, films };
}

async function search(originalTitle, year, kind) {
  const path = kind === 'tv' ? 'search/tv' : 'search/movie';
  const yearParam = kind === 'tv' ? `first_air_date_year=${year}` : `year=${year}`;
  const url = `${API}/${path}?api_key=${KEY}&language=ja-JP&query=${encodeURIComponent(originalTitle)}&${yearParam}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.results?.[0] ?? null;
}

/** 上映時間は検索結果に含まれないため、詳細を1件ずつ引く */
async function detail(id, kind) {
  const res = await fetch(`${API}/${kind === 'tv' ? 'tv' : 'movie'}/${id}?api_key=${KEY}&language=ja-JP`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** TVは1話あたりの分数。作品ごとに配列で返ってくるので先頭を使う */
function runtimeOf(info, kind) {
  if (kind === 'tv') return info.episode_run_time?.[0] ?? null;
  return info.runtime ?? null;
}

/** シーズン単位の情報。編ごとにポスターが違うので、こちらを使う */
async function seasonDetail(showId, seasonNumber) {
  const res = await fetch(
    `${API}/tv/${showId}/season/${seasonNumber}?api_key=${KEY}&language=ja-JP`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** 番組全体の episode_run_time が空のことがあるので、各話の実測から平均を出す */
function averageEpisodeRuntime(season) {
  const values = (season.episodes ?? []).map((e) => e.runtime).filter((n) => typeof n === 'number' && n > 0);
  if (values.length === 0) return null;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

async function main() {
  // シリーズを足したときに書き足し忘れないよう、フォルダから拾う
  const dir = new URL('../content/series/', import.meta.url);
  const files = (await readdir(dir)).filter((f) => f.endsWith('.ts') && f !== 'index.ts').sort();
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
      // 上映時間が入っていない古い形式は取り直す
      if (!force && existing[key] && existing[key].runtime !== undefined) {
        console.log(`  = ${film.title}（取得済み）`);
        continue;
      }

      try {
        // シーズンとして登録されている編は、検索せずにシーズンを直接引く
        if (film.kind === 'tv' && film.season != null && film.tmdbId) {
          const season = await seasonDetail(film.tmdbId, film.season);
          const runtime = averageEpisodeRuntime(season);
          existing[key] = {
            tmdbId: film.tmdbId,
            posterPath: season.poster_path ?? null,
            overview: season.overview ?? '',
            runtime,
          };
          const label = runtime ? `${runtime}分/話` : '尺不明';
          console.log(`  ✓ ${film.title} → #${film.tmdbId} season ${film.season}（${label}）`);
          found++;
          await sleep(250);
          continue;
        }

        // ID が指定されていれば検索を飛ばす（同名・続編の取り違えを防ぐ）
        const hit = film.tmdbId
          ? { id: film.tmdbId, poster_path: null, overview: '' }
          : await search(film.originalTitle, film.year, film.kind);
        if (!hit) {
          console.log(`  ✗ ${film.title}（見つからず）`);
          missed++;
        } else {
          await sleep(250);
          const info = await detail(hit.id, film.kind);
          const runtime = runtimeOf(info, film.kind);
          existing[key] = {
            tmdbId: hit.id,
            // ID 指定のときは検索結果がないので、詳細から埋める
            posterPath: hit.poster_path ?? info.poster_path ?? null,
            overview: hit.overview || info.overview || '',
            runtime,
          };
          const unit = film.kind === 'tv' ? '分/話' : '分';
          const runtimeLabel = runtime ? `${runtime}${unit}` : '尺不明';
          console.log(`  ✓ ${film.title} → TMDb #${hit.id}（${runtimeLabel}）`);
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
