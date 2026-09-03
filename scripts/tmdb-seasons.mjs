#!/usr/bin/env node
// TMDb のTV番組が、どのシーズン構成で登録されているかを見るための確認用スクリプト。
//
//   node scripts/tmdb-seasons.mjs 85937
//
// 「鬼滅の刃」のように、各編が別番組ではなく1番組のシーズンとして
// 登録されている場合があるため、取り込み方を決める前に確認する。
import { readFile } from 'node:fs/promises';

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
if (!KEY) {
  console.error('TMDB_API_KEY を設定してください（.env.local か環境変数）。');
  process.exit(1);
}

const id = process.argv[2];
if (!id) {
  console.error('使い方: node scripts/tmdb-seasons.mjs <TVのID>');
  process.exit(1);
}

const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${KEY}&language=ja-JP`);
if (!res.ok) {
  console.error(`HTTP ${res.status}`);
  process.exit(1);
}
const info = await res.json();

console.log(`番組: ${info.name}（TMDb #${info.id}）`);
console.log(`1話あたり: ${info.episode_run_time?.[0] ?? '不明'}分`);
console.log('');
for (const s of info.seasons ?? []) {
  const poster = s.poster_path ? 'ポスターあり' : 'ポスターなし';
  console.log(
    `  season ${String(s.season_number).padStart(2)} | ${String(s.episode_count).padStart(3)}話 | ${poster} | ${s.name}`
  );
}
