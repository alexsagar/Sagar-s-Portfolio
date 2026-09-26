export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'st3egm4a';

// Build-time fetches must be fresh: the CDN lags publishes by up to ~60s,
// so a rebuild right after publishing would otherwise bake stale content.
export const useCdn = false;

export const token = process.env.SANITY_API_TOKEN || '';
