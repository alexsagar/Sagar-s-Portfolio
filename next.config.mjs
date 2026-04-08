import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Tells Next.js to generate static HTML
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Required because GitHub Pages doesn't have an image server
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};

const sentryConfig = {
  silent: true,
  org: "javascript-mastery",
  project: "javascript-nextjs",
  // This prevents the build from crashing if Sentry tokens are missing
  dryRun: true, 
  disableLogger: true,
};

export default withSentryConfig(nextConfig, sentryConfig);
