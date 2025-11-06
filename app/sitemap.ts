import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sagar-nepali.com.np'
  // Sitemaps should not include URL fragments (#...). Include only canonical pages.
  const routes = ['']
  const now = new Date()
  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 1,
  }))
}
