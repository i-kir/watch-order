import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

// Node 20 の本番ビルド環境でも追加依存なしで純粋ロジックを検証する。
async function loadTs(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const { resolveWatchLinks } = await loadTs('../lib/watch-links.ts');
const source = 'https://www.themoviedb.org/movie/123-title/watch?locale=JP';
const ad = { seriesSlug: 'example', filmSlug: 'first', provider: 'Service A', url: 'https://example.com/approved-link', enabled: true };
const resolve = (ads, providers = ['Service A'], url = source) => resolveWatchLinks('example', 'first', providers, url, ads);

test('広告が未設定でも作品別の配信情報へ進める', () => {
  assert.deepEqual(resolve([]), [{ provider: 'TMDB', url: source, sponsored: false }]);
});
test('有効な提携リンクは対象作品・配信サービスが一致したときだけ表示する', () => {
  assert.equal(resolve([ad])[0].sponsored, true);
  for (const change of [{ enabled: false }, { filmSlug: 'second' }, { seriesSlug: 'other' }, { provider: 'Service B' }]) {
    assert.equal(resolve([{ ...ad, ...change }]).length, 1);
  }
  assert.equal(resolve([ad], []).length, 1);
});
test('不正なリンクや別ドメインを配信情報として表示しない', () => {
  for (const url of ['javascript:alert(1)', 'http://example.com', 'https://user:pass@example.com', 'not-a-url']) {
    assert.equal(resolve([{ ...ad, url }]).length, 1);
  }
  for (const url of [null, 'https://www.themoviedb.org.evil.example/movie/123/watch', 'https://www.themoviedb.org/movie/123', 'javascript:alert(1)']) {
    assert.deepEqual(resolve([], [], url), []);
  }
});
test('見放題データがない場合も既存の作品別確認ページを保持する', () => {
  assert.deepEqual(resolve([], []), [{ provider: 'TMDB', url: source, sponsored: false }]);
});
test('クリックイベントに作品・配置・広告区分を付け、URLや履歴を含めない', async () => {
  const { trackWatchClick } = await loadTs('../lib/analytics.ts');
  const calls = [];
  const events = [];
  globalThis.window = { gtag: (...args) => calls.push(args), dispatchEvent: (event) => events.push(event) };
  const params = { series_slug: 'example', film_slug: 'first', provider: 'Service A', placement: 'next_film', link_type: 'affiliate', order: 'release' };
  trackWatchClick(params);
  assert.deepEqual(calls, [['event', 'watch_provider_click', params]]);
  assert.equal(events[0].type, 'miruorder:watch_provider_click');
  assert.deepEqual(events[0].detail, params);
  window.gtag = () => { throw new Error('analytics unavailable'); };
  assert.doesNotThrow(() => trackWatchClick(params));
  delete globalThis.window;
});
