import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/client';
import { postSlugsQuery } from '@/sanity/lib/queries';
import { blogPosts as defaultBlogPosts } from '@/data/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sagar-nepali.com.np';

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Fetch blog post slugs
  let slugs: string[] = [];
  try {
    const fetched = await sanityFetch<string[]>({
      query: postSlugsQuery,
      tags: ['post'],
    });
    if (fetched && fetched.length > 0) {
      slugs = fetched;
    }
  } catch {
    // fallback to local data
  }

  if (slugs.length === 0) {
    slugs = defaultBlogPosts.map((p) => p.slug);
  }

  const blogRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...baseRoutes, ...blogRoutes];
}
