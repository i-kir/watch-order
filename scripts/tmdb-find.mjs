#!/usr/bin/env node
// TMDb の検索候補を並べて、正しい ID を目で選ぶための道具。
//
//   node scripts/tmdb-find.mjs "機動戦士ガンダム THE ORIGIN"
//
// fetch-tmdb.mjs の検索は「原題 + 公開年」で先頭1件を採るため、
// 邦題の表記ゆれや、TMDb 側が別の形（OVAを映画としてバラで登録するなど）
// で持っている作品を取りこぼす。そのときここで ID を調べて、
// content/series/*.ts の該当作に tmdbId を書けば検索を飛ばせる。
import { readFile } from 'node:fs/promises';

const API = 'https://api.themoviedb.org/3';

async function loadKey() {
  if (process.env.TMDB_API_KEY) return process.env.TMDB_API_KEY;
  try {
    const text = await readFile(new URL('../.env.local', import.meta.url), 'utf8');
    return text.match(/^TMDB_API_KEY=(.+)$/m)?.[1]?.trim() ?? null;
  } catch {
    return null;
  }
}

const query = process.argv.slice(2).join(' ').trim();
if (!query) {
  console.error('使い方: node scripts/tmdb-find.mjs "作品名"');
  process.exit(1);
}

const KEY = await loadKey();
if (!KEY) {
  console.error('TMDB_API_KEY を設定してください（.env.local でも可）。');
  process.exit(1);
}

for (const kind of ['tv', 'movie']) {
  const url = `${API}/search/${kind}?api_key=${KEY}&language=ja-JP&query=${encodeURIComponent(query)}`;
  let json;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    json = await res.json();
  } catch (e) {
    console.log(`\n── ${kind}: 取得失敗（${e.message}）`);
    continue;
  }

  const results = json.results ?? [];
  console.log(`\n── ${kind}（${results.length}件）`);
  if (results.length === 0) {
    console.log('  （該当なし）');
    continue;
  }
  for (const r of results.slice(0, 8)) {
    const name = r.name ?? r.title;
    const original = r.original_name ?? r.original_title;
    const date = r.first_air_date || r.release_date || '日付不明';
    const poster = r.poster_path ? 'ポスターあり' : 'ポスターなし';
    const label = original && original !== name ? `${name} / ${original}` : name;
    console.log(`  #${r.id}  ${date}  ${label}  [${poster}]`);
    console.log(`      kind: '${kind === 'tv' ? 'tv' : 'film'}',  tmdbId: ${r.id},`);
  }
}
console.log('\n上の tmdbId を content/series/*.ts の該当作に書き足すと、検索を飛ばして直接引きます。');
