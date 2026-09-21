import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sagar-nepali.com.np'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/studio/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
