import { createClient, type QueryParams } from '@sanity/client';
import { apiVersion, dataset, projectId, useCdn, token } from '../env';

export const isSanityConfigured = Boolean(projectId);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
      perspective: 'published',
    })
  : null;

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<QueryResponse | null> {
  if (!client) {
    return null;
  }

  try {
    return await client.fetch<QueryResponse>(query, params, {
      next: {
        revalidate: typeof revalidate === 'number' ? revalidate : undefined,
        tags,
      },
    });
  } catch (error) {
    console.warn('[Sanity] Fetch failed, falling back to static data:', error);
    return null;
  }
}
