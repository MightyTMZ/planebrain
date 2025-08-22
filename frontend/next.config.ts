import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'planebrain-quiz-images.s3.us-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      // Allow any other S3 subdomains you might use
      {
        protocol: 'https',
        hostname: '*.s3.us-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
