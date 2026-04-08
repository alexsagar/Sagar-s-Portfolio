import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, 
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};

const sentryConfig = {
  silent: true,
  org: "javascript-mastery",
  project: "javascript-nextjs",
  // Skip sentry during build if no token is present
  dryRun: true, 
  disableLogger: true,
};

export default withSentryConfig(nextConfig, sentryConfig);
