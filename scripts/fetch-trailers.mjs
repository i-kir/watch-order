#!/usr/bin/env node
// 既存エントリに予告編だけを後から足す。対象は劇場版のみ。
//
//   node scripts/fetch-trailers.mjs                 すべてのシリーズ
//   node scripts/fetch-trailers.mjs --series mcu    1シリーズだけ
//   node scripts/fetch-trailers.mjs mcu             同上（位置引数でも可）
//
// fetch-tmdb.mjs を流用しないのは、あちらが「未取得なら検索する」作りだから。
// 予告編のために全件を流すと再検索が走り、曖昧なタイトルで別の作品を
// 掴んでポスターごと差し替わる危険がある。
// ここでは tmdb.json に保存済みの ID だけを使い、検索は一切しない。
//
// TVエントリ（ONE PIECEの編、鬼滅のシーズンなど）には付けない。
// シーズン単位の予告は揃っておらず、付いたり付かなかったりで
// リストが虫食いに見えるため。
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

// fetch-tmdb.mjs は --series 形式、こちらは元々位置引数だった。
// 取り違えると「--series という名前のシリーズ」を探して0件で静かに終わるので、
// 両方を受け付けたうえで、下で該当なしなら止めるようにしている。
const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.includes('--series')
  ? args[args.indexOf('--series') + 1] ?? null
  : args.find((a) => !a.startsWith('--')) ?? null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 定義ファイルから slug ごとの kind と season を拾う */
async function metaOf(file) {
  const text = await readFile(new URL(`../content/series/${file}`, import.meta.url), 'utf8');
  const seriesSlug = text.match(/slug:\s*'([^']+)'/)?.[1];
  const from = text.indexOf('films: [');
  const to = text.indexOf('releaseOrder:');
  if (from < 0 || to < 0) return { seriesSlug, meta: {} };
  const body = text.slice(from, to);
  const starts = [...body.matchAll(/\{\s*slug:\s*'([^']+)'/g)];
  const meta = {};
  for (let i = 0; i < starts.length; i++) {
    const block = body.slice(starts[i].index, i + 1 < starts.length ? starts[i + 1].index : body.length);
    meta[starts[i][1]] = {
      kind: /kind:\s*'tv'/.test(block) ? 'tv' : 'movie',
      season: block.match(/season:\s*(\d+)/)?.[1] ?? null,
    };
  }
  return { seriesSlug, meta };
}

/** YouTube の予告編を1本。日本語版を優先し、無ければ英語版に落とす */
async function trailerKeyOf(id) {
  const base = `${API}/movie/${id}/videos`;

  const pick = (list) => {
    const yt = (list ?? []).filter((v) => v.site === 'YouTube');
    const trailers = yt.filter((v) => v.type === 'Trailer');
    const pool = trailers.length > 0 ? trailers : yt.filter((v) => v.type === 'Teaser');
    if (pool.length === 0) return null;
    return (pool.find((v) => v.official) ?? pool[0]).key;
  };

  for (const lang of ['ja-JP', null]) {
    try {
      const res = await fetch(`${base}?api_key=${KEY}${lang ? `&language=${lang}` : ''}`);
      if (res.ok) {
        const key = pick((await res.json()).results);
        if (key) return key;
      }
    } catch {
      // 予告編は付加情報なので、失敗しても止めない
    }
    await sleep(150);
  }
  return null;
}

const outPath = new URL('../content/tmdb.json', import.meta.url);
const tmdb = JSON.parse(await readFile(outPath, 'utf8'));

const dir = new URL('../content/series/', import.meta.url);
const files = (await readdir(dir)).filter((f) => f.endsWith('.ts') && f !== 'index.ts').sort();

let added = 0, none = 0, skipped = 0, tvSkipped = 0;
let matched = 0;

for (const file of files) {
  const { seriesSlug, meta } = await metaOf(file);
  if (only && seriesSlug !== only) continue;
  matched++;

  const keys = Object.keys(tmdb).filter((k) => k.startsWith(`${seriesSlug}:`));
  if (keys.length === 0) continue;
  console.log(`\n── ${seriesSlug}（${keys.length}件）`);

  for (const key of keys) {
    const filmSlug = key.slice(seriesSlug.length + 1);
    const entry = tmdb[key];

    if (!force && entry.trailerKey !== undefined) {
      skipped++;
      continue;
    }
    if (!entry.tmdbId) {
      tmdb[key].trailerKey = null;
      none++;
      continue;
    }

    const m = meta[filmSlug] ?? { kind: 'movie', season: null };
    if (m.kind === 'tv') {
      tmdb[key].trailerKey = null;
      tvSkipped++;
      continue;
    }

    const trailer = await trailerKeyOf(entry.tmdbId);
    tmdb[key].trailerKey = trailer;
    if (trailer) {
      added++;
      console.log(`  ✓ ${filmSlug} → youtu.be/${trailer}`);
    } else {
      none++;
      console.log(`  ✗ ${filmSlug}（予告なし）`);
    }
    await sleep(220);
  }
}

// 綴り間違いを黙って成功扱いにしない
if (only && matched === 0) {
  console.error(`\nシリーズ '${only}' が見つかりません。content/series/ の slug を確認してください。`);
  console.error('何も書き込んでいません。');
  process.exit(1);
}

await writeFile(outPath, JSON.stringify(tmdb, null, 2) + '\n');
console.log(`\n予告あり ${added}件 / なし ${none}件 / TVのため対象外 ${tvSkipped}件 / 取得済み ${skipped}件`);
console.log('ポスターと上映時間には触っていません。差分を確認してコミットしてください。');
