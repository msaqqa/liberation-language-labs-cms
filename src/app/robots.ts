import type { MetadataRoute } from 'next'
import { getSiteUrl, toAbsoluteUrl } from '@/lib/seo'

// Served at /robots.txt. Keeps the admin panel and API surface out of the
// index while allowing the public marketing/blog pages to be crawled.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/', '/not-found'],
    },
    sitemap: toAbsoluteUrl('/sitemap.xml'),
    host: getSiteUrl(),
  }
}
