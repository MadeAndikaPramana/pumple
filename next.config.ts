import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://s3.tradingview.com https://www.tradingview.com;",
          },
        ],
      },
    ]
  },
};

export default nextConfig;
