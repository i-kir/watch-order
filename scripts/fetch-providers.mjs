#!/usr/bin/env node
// 日本での定額見放題の配信先を取得して content/providers.json に書く。
//
//   node scripts/fetch-providers.mjs              全作品を取り直す
//   node scripts/fetch-providers.mjs --series mcu 1シリーズだけ
//
// tmdb.json とは別ファイルにしている。ポスターや上映時間はほとんど変わらないのに対し、
// 配信状況は毎週動く。同じファイルに入れると、毎週の自動更新のたびに
// ポスターの差分まで混ざって、何が変わったのか読めなくなる。
//
// 保存済みの TMDb ID だけを使い、検索は一切しない（取り違えを避けるため）。
// 作品種別を見て /movie と /tv を振り分ける。TVを /movie に投げると
// 失敗するか、最悪まったく別の作品の配信情報が返る。
//
// このデータは TMDb が JustWatch から提供を受けているもので、
// 利用時は出典を JustWatch と明示する義務がある（フッターに記載済み）。
import { readdir, readFile, writeFile } from 'node:fs/promises';

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
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 定義ファイルから slug ごとの kind を拾う */
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

/**
 * 表示名の正規化。
 * 同じサービスの広告つきプランは別名で返ってくるので1つにまとめる。
 * Amazon のチャンネル系は、契約単位が Prime とは別なので残すが、
 * 日本で通じる名前に直す。
 */
const RENAME = {
  'Disney Plus': 'Disney+',
  'Amazon Prime Video': 'Prime Video',
  'U-Next': 'U-NEXT',
  'HBO Max on U-Next': 'U-NEXT',
  'dAnime Amazon Channel': 'dアニメストア（Amazon）',
  'Anime Times Amazon Channel': 'アニメタイムズ（Amazon）',
  'Sony Pictures Core Amazon Channel': 'Sony Pictures Core（Amazon）',
  'MGM Amazon Channel': 'MGM（Amazon）',
  'Cinefil Wow Plus Amazon Channel': 'シネフィルWOWOW（Amazon）',
  'Toei Animation Channel  Amazon Channel': '東映アニメーション（Amazon）',
  'Toei Animation Channel Amazon Channel': '東映アニメーション（Amazon）',
};

function normalize(name) {
  const base = name.replace(/ Standard with Ads$/, '').replace(/ with Ads$/, '');
  return RENAME[base] ?? base;
}

/** 主要サービスを先に出す。残りは取得順 */
const PRIORITY = ['Netflix', 'Prime Video', 'U-NEXT', 'Disney+', 'Hulu', 'FOD'];
function sortProviders(names) {
  return [...names].sort((a, b) => {
    const ia = PRIORITY.indexOf(a);
    const ib = PRIORITY.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b, 'ja');
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

async function flatrateOf(id, kind) {
  const path = kind === 'tv' ? 'tv' : 'movie';
  const res = await fetch(`${API}/${path}/${id}/watch/providers?api_key=${KEY}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const jp = (await res.json()).results?.JP;
  if (!jp) return { names: [], link: null };
  const names = sortProviders(new Set((jp.flatrate ?? []).map((p) => normalize(p.provider_name))));
  return { names, link: jp.link ?? null };
}

const KIND = await kindMap();
const tmdbPath = new URL('../content/tmdb.json', import.meta.url);
const outPath = new URL('../content/providers.json', import.meta.url);
const tmdb = JSON.parse(await readFile(tmdbPath, 'utf8'));

// 既存を読み込み、今回取れなかったぶんは前回の値を残す。
// 通信が一時的に失敗しただけで配信情報が消えるのを避ける。
let previous = { items: {} };
try {
  previous = JSON.parse(await readFile(outPath, 'utf8'));
} catch {
  // 初回は無くてよい
}

const keys = Object.keys(tmdb).filter((k) => (only ? k.startsWith(`${only}:`) : true));
if (only && keys.length === 0) {
  console.error(`シリーズ '${only}' が見つかりません。何も書き込んでいません。`);
  process.exit(1);
}

const items = { ...(previous.items ?? {}) };
let found = 0, empty = 0, failed = 0, changed = 0;

for (const key of keys) {
  const entry = tmdb[key];
  if (!entry.tmdbId) continue;

  let result;
  try {
    result = await flatrateOf(entry.tmdbId, KIND[key] ?? 'movie');
  } catch (e) {
    failed++;
    console.log(`  ✗ ${key} ${e.message}（前回の値を残します）`);
    continue;
  }

  const before = JSON.stringify(items[key]?.names ?? null);
  const after = JSON.stringify(result.names.length ? result.names : null);
  if (before !== after) changed++;

  if (result.names.length) {
    items[key] = { names: result.names, link: result.link };
    found++;
  } else {
    delete items[key];
    empty++;
  }
  await sleep(220);
}

const sorted = {};
for (const k of Object.keys(items).sort()) sorted[k] = items[k];

const out = {
  // 表示に使う。いつ時点のデータかを明示しないと、古い情報を断定で出すことになる
  updatedAt: new Date().toISOString().slice(0, 10),
  source: 'JustWatch (via TMDB)',
  items: sorted,
};

await writeFile(outPath, JSON.stringify(out, null, 2) + '\n');
console.log(`\n見放題あり ${found}件 / 無し ${empty}件 / 失敗 ${failed}件 / 前回から変化 ${changed}件`);
console.log(`content/providers.json を更新しました（${out.updatedAt} 時点）。`);
