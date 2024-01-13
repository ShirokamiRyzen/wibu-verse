/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otakudesu.media',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;