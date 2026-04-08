import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Keep this for GitHub Pages
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Required for static hosting
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: "javascript-mastery",
  project: "javascript-nextjs",
  // CRITICAL: Ensure dryRun is true if the Sentry token is missing
  dryRun: true, 
  disableLogger: true,
});