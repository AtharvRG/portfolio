// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
{
        protocol: 'https',
        hostname: 'www.colorhexa.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Also adding this for your Arsenal component
        port: '',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig;