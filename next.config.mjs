/** @type {import('next').NextConfig} */
const nextConfig = {
  // S3 + CloudFront へ置くため、ビルド結果を out/ に静的書き出しする。
  // サーバー処理は元から無く（全ページが generateStaticParams で事前生成）、
  // 失うのは Next の画像最適化だけ。
  output: 'export',
  images: {
    // 静的書き出しでは Next の画像最適化が使えない。
    // ただし TMDb から w92 / w185 といった小さいサイズを指定して取得しているので、
    // 最適化を外しても転送量はほとんど変わらない。
    unoptimized: true,
    // TMDb の画像を表示するため
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org' }],
  },
  // 静的書き出しでは /series/godzilla が out/series/godzilla.html になる。
  // CloudFront 側の Function で拡張子を補う（infra/lib/site-stack.ts 参照）。
  trailingSlash: false,
};

export default nextConfig;
