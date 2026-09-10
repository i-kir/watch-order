#!/usr/bin/env node
// 日本での配信状況がどれだけ揃うかを数えるだけのスクリプト。何も書き込まない。
//
//   node scripts/tmdb-providers.mjs            全シリーズ
//   node scripts/tmdb-providers.mjs --series mcu
//   node scripts/tmdb-providers.mjs --detail   作品ごとの内訳も出す
//
// 作ってから「実は半分しか埋まらない」と分かるのを避けるため、
// 先に実測する。tmdb.json は読むだけで、書き換えない。
//
// 配信情報は TMDb が JustWatch から提供を受けているもので、
// 利用時は出典を JustWatch と明示する義務がある（実装時に対応すること）。
import { readdir, readFile } from 'node:fs/promises';

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

const KEY = await loadKey();
if (!KEY) {
  console.error('TMDB_API_KEY を設定してください（.env.local でも可）。');
  process.exit(1);
}

const args = process.argv.slice(2);
const only = args.includes('--series') ? args[args.indexOf('--series') + 1] : null;
const detail = args.includes('--detail');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const tmdb = JSON.parse(await readFile(new URL('../content/tmdb.json', import.meta.url), 'utf8'));

const keys = Object.keys(tmdb).filter((k) => (only ? k.startsWith(`${only}:`) : true));
if (only && keys.length === 0) {
  console.error(`シリーズ '${only}' が見つかりません。`);
  process.exit(1);
}

/**
 * 定義ファイルから slug ごとの kind を拾う。
 * TVシリーズを /movie/ に投げると必ず失敗するため、種別を見て振り分ける。
 */
async function kindMap() {
  const dir = new URL('../content/series/', import.meta.url);
  const files = (await readdir(dir)).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
  const map = {};
  for (const file of files) {
    const text = await readFile(new URL(`../content/series/${file}`, import.meta.url), 'utf8');
    const seriesSlug = text.match(/slug:\s*'([^']+)'/)?.[1];
    const from = text.indexOf('films: [');
    const to = text.indexOf('releaseOrder:');
    if (from < 0 || to < 0) continue;
    const body = text.slice(from, to);
    const starts = [...body.matchAll(/\{\s*slug:\s*'([^']+)'/g)];
    for (let i = 0; i < starts.length; i++) {
      const block = body.slice(starts[i].index, i + 1 < starts.length ? starts[i + 1].index : body.length);
      map[`${seriesSlug}:${starts[i][1]}`] = /kind:\s*'tv'/.test(block) ? 'tv' : 'movie';
    }
  }
  return map;
}

const KIND = await kindMap();

/** 同じサービスの別プランをまとめる。広告つきの版は同一サービスとして数える */
function normalize(name) {
  return name
    .replace(/ Standard with Ads$/, '')
    .replace(/ with Ads$/, '')
    .replace(/^HBO Max on U-Next$/, 'U-NEXT')
    .replace(/^U-Next$/, 'U-NEXT');
}

/** 日本での「定額見放題」だけを見る。レンタルと購入は数えない */
async function providersOf(id, kind) {
  const path = kind === 'tv' ? 'tv' : 'movie';
  const res = await fetch(`${API}/${path}/${id}/watch/providers?api_key=${KEY}`);
  if (!res.ok) return { httpError: res.status };
  const jp = (await res.json()).results?.JP;
  if (!jp) return { flatrate: [], rent: [], buy: [], link: null };
  return {
    flatrate: [...new Set((jp.flatrate ?? []).map((p) => normalize(p.provider_name)))],
    rent: (jp.rent ?? []).map((p) => p.provider_name),
    buy: (jp.buy ?? []).map((p) => p.provider_name),
    link: jp.link ?? null,
  };
}

let checked = 0, withFlat = 0, withAny = 0, noId = 0, failed = 0;
const errors = [];
const tally = new Map();
const bySeries = new Map();

for (const key of keys) {
  const entry = tmdb[key];
  const seriesSlug = key.split(':')[0];
  if (!bySeries.has(seriesSlug)) bySeries.set(seriesSlug, { n: 0, flat: 0 });
  const agg = bySeries.get(seriesSlug);
  agg.n++;

  if (!entry.tmdbId) { noId++; continue; }

  let p;
  try {
    p = await providersOf(entry.tmdbId, KIND[key] ?? 'movie');
  } catch (e) {
    failed++;
    errors.push(`${key} 通信エラー`);
    continue;
  }
  checked++;
  if (p.httpError) {
    failed++;
    errors.push(`${key} HTTP ${p.httpError}（種別 ${KIND[key] ?? 'movie'}）`);
    continue;
  }

  if (p.flatrate.length > 0) { withFlat++; agg.flat++; }
  if (p.flatrate.length + p.rent.length + p.buy.length > 0) withAny++;
  for (const name of p.flatrate) tally.set(name, (tally.get(name) ?? 0) + 1);

  if (detail) {
    const label = p.flatrate.length ? p.flatrate.join('、') : '（見放題なし）';
    console.log(`  ${key.padEnd(32)} ${label}`);
  }
  await sleep(220);
}

console.log('\n──────── 集計 ────────');
console.log(`対象 ${keys.length}件 / 問い合わせ ${checked}件 / TMDb ID なし ${noId}件 / 失敗 ${failed}件`);
const ok = checked - failed;
console.log(`定額見放題あり  ${withFlat}件（取得できた ${ok}件のうち ${((withFlat / Math.max(ok, 1)) * 100).toFixed(1)}%）`);
console.log(`レンタル・購入も含めれば ${withAny}件（${((withAny / Math.max(ok, 1)) * 100).toFixed(1)}%）`);
if (errors.length) {
  console.log(`\n──── 失敗した ${errors.length}件 ────`);
  errors.slice(0, 20).forEach((e) => console.log('  ' + e));
  if (errors.length > 20) console.log(`  ...ほか ${errors.length - 20}件`);
}

console.log('\n──── 見放題サービス別 ────');
[...tally.entries()].sort((a, b) => b[1] - a[1]).forEach(([name, n]) => {
  console.log(`  ${String(n).padStart(4)}件  ${name}`);
});

console.log('\n──── シリーズ別の充足率 ────');
[...bySeries.entries()]
  .map(([s, v]) => [s, v, v.n ? (v.flat / v.n) * 100 : 0])
  .sort((a, b) => a[2] - b[2])
  .forEach(([s, v, pct]) => {
    console.log(`  ${s.padEnd(20)} ${String(v.flat).padStart(3)}/${String(v.n).padEnd(3)} ${pct.toFixed(0).padStart(3)}%`);
  });

console.log('\n※ 何も書き込んでいません。数えただけです。');
