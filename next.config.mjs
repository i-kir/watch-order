/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // TMDb の画像を表示するため
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org' }],
  },
};

export default nextConfig;
