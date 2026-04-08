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
  // This is the key part: 
  // It forces Sentry to skip all logic if there's no auth token.
  dryRun: !process.env.SENTRY_AUTH_TOKEN, 
}, {
  widenClientFileUpload: false,
  transpileClientSDK: false,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: false, // Set to false since you're on GitHub Pages, not Vercel
});
