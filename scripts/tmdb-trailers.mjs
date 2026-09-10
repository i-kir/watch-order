#!/usr/bin/env node
// 予告編がどれだけ揃っているかを数えるだけの道具。取得も保存もしない。
//
//   node scripts/tmdb-trailers.mjs mcu
//
// 予告編を載せるかどうかは、日本語版がどれだけあるかで決まる。
// 英語版しかない作品ばかりなら、日本のサイトに置く価値は薄い。
// 実装に入る前にここで確かめる。
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

const seriesSlug = process.argv[2];
if (!seriesSlug) {
  console.error('使い方: node scripts/tmdb-trailers.mjs <シリーズのslug>');
  process.exit(1);
}

const KEY = await loadKey();
if (!KEY) {
  console.error('TMDB_API_KEY を設定してください（.env.local でも可）。');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 定義ファイルから slug ごとの kind を拾う（tmdb.json は kind を持っていないため） */
async function kindsOf(slug) {
  const text = await readFile(new URL(`../content/series/${slug}.ts`, import.meta.url), 'utf8');
  const body = text.slice(text.indexOf('films: ['), text.indexOf('releaseOrder:'));
  const kinds = {};
  const starts = [...body.matchAll(/\{\s*slug:\s*'([^']+)'/g)];
  for (let i = 0; i < starts.length; i++) {
    const block = body.slice(starts[i].index, i + 1 < starts.length ? starts[i + 1].index : body.length);
    kinds[starts[i][1]] = /kind:\s*'tv'/.test(block) ? 'tv' : 'movie';
  }
  return kinds;
}

async function videos(id, kind, lang) {
  const q = lang ? `&language=${lang}` : '';
  const res = await fetch(`${API}/${kind}/${id}/videos?api_key=${KEY}${q}`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.results ?? [];
}

/** YouTube の予告編だけを拾う。公式フラグが立っているものを優先する */
function pickTrailer(list) {
  const yt = list.filter((v) => v.site === 'YouTube');
  const trailers = yt.filter((v) => v.type === 'Trailer');
  const pool = trailers.length > 0 ? trailers : yt.filter((v) => v.type === 'Teaser');
  if (pool.length === 0) return null;
  return pool.find((v) => v.official) ?? pool[0];
}

const tmdb = JSON.parse(await readFile(new URL('../content/tmdb.json', import.meta.url), 'utf8'));
const kinds = await kindsOf(seriesSlug);

const entries = Object.entries(tmdb)
  .filter(([k]) => k.startsWith(`${seriesSlug}:`))
  .map(([k, v]) => ({ slug: k.slice(seriesSlug.length + 1), ...v }));

console.log(`\n── ${seriesSlug}（${entries.length}件）\n`);

let ja = 0, en = 0, none = 0;
const seenShow = new Set();

for (const e of entries) {
  const kind = kinds[e.slug] ?? 'movie';
  // 同じ番組IDを共有するシーズンは1回だけ数える
  const dedupe = `${kind}:${e.tmdbId}`;
  if (kind === 'tv' && seenShow.has(dedupe)) {
    console.log(`  - ${e.slug}（親番組が同じなので省略）`);
    continue;
  }
  if (kind === 'tv') seenShow.add(dedupe);

  try {
    const jaList = await videos(e.tmdbId, kind, 'ja-JP');
    const jaHit = pickTrailer(jaList);
    if (jaHit) {
      ja++;
      console.log(`  ✓ ja  ${e.slug}  ${jaHit.name}  → youtu.be/${jaHit.key}`);
    } else {
      await sleep(200);
      const enHit = pickTrailer(await videos(e.tmdbId, kind, null));
      if (enHit) {
        en++;
        console.log(`  △ en  ${e.slug}  ${enHit.name}  → youtu.be/${enHit.key}`);
      } else {
        none++;
        console.log(`  ✗ --  ${e.slug}（予告なし）`);
      }
    }
  } catch (error) {
    none++;
    console.log(`  ✗ --  ${e.slug}（${error.message}）`);
  }
  await sleep(220);
}

const total = ja + en + none;
console.log(`\n日本語版 ${ja} / 英語版のみ ${en} / なし ${none}（計 ${total}）`);
console.log(`日本語カバー率 ${total ? Math.round((ja / total) * 100) : 0}%`);
