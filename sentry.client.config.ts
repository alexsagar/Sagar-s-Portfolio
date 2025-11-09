// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || "";
const isProd = process.env.NODE_ENV === "production";

// If no DSN or not production, initialize with a no-op transport or skip sending
if (isProd && SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    // other options...
    tracesSampleRate: 0.1,
  });
} else {
  // dev/no-dsn: safe fallback to avoid 403 spam or leaking keys
  // If you still want SDK in dev for local testing, set `enabled: false` or use a no-op transport:
  Sentry.init({
    dsn: undefined,
    enabled: false,
    tracesSampleRate: 0.0,
  });
}
