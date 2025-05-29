import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    '/api/**/*': ['./tina/**/*'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
};

export default nextConfig;
