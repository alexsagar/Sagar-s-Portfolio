import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sagar-nepali.com.np'

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-03-02'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ]
}
