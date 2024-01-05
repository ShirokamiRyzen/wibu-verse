/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

dotenv.config();

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
