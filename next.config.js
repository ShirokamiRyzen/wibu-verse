/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otakudesu.cam',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;