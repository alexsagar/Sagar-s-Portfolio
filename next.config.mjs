import { withSentryConfig } from '@sentry/nextjs';
const isProd = process.env.NODE_ENV === 'production';
const hasSentryToken = !!process.env.SENTRY_AUTH_TOKEN;
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

// Suppresses source map uploading logs during build
silent: true,
org: "javascript-mastery",
project: "javascript-nextjs",
// Avoid upload attempts (and warnings) locally or when no token is set
dryRun: !isProd || !hasSentryToken,
}, {
// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload only essential source maps
widenClientFileUpload: false,

// Avoid transpiling SDK for legacy browsers to keep bundle small
transpileClientSDK: false,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors.
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});