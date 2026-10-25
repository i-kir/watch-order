type WatchClick = {
  series_slug: string;
  film_slug: string;
  provider: string;
  placement: 'next_film' | 'film_card';
  link_type: 'affiliate' | 'availability';
  order: string;
};

/** GA4 が導入済みの場合に送信する。外部サービスの読み込みはここでは行わない。 */
export function trackWatchClick(params: WatchClick): void {
  try {
    const analyticsWindow = window as Window & {
      gtag?: (command: string, event: string, params: WatchClick) => void;
    };
    analyticsWindow.gtag?.('event', 'watch_provider_click', params);
    // GA4 未設定でもブラウザで動作を確認できる。URLや視聴履歴は送らない。
    window.dispatchEvent(new CustomEvent('miruorder:watch_provider_click', { detail: params }));
  } catch {
    // 計測の失敗で視聴先への移動を妨げない。
  }
}
