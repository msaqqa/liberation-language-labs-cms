import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { toAbsoluteUrl } from '@/lib/seo'

// Served at /sitemap.xml. Lists the static marketing pages plus every published
// blog post so search engines can discover and prioritise them. Revalidated
// hourly to match the blog pages' own cache window.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: toAbsoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: toAbsoluteUrl('/principles'), changeFrequency: 'yearly', priority: 0.8 },
    { url: toAbsoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.8 },
  ]

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'blogs',
      where: { published: { equals: true } },
      limit: 1000,
      depth: 0,
      sort: '-publishedDate',
      select: { slug: true, publishedDate: true, updatedAt: true },
    })

    const blogEntries: MetadataRoute.Sitemap = docs
      .filter((doc: any) => typeof doc.slug === 'string' && doc.slug.length > 0)
      .map((doc: any) => ({
        url: toAbsoluteUrl(`/blog/${doc.slug}`),
        lastModified: new Date(doc.updatedAt ?? doc.publishedDate ?? Date.now()),
        changeFrequency: 'monthly',
        priority: 0.6,
      }))

    return [...staticEntries, ...blogEntries]
  } catch (error) {
    console.error('Failed to build blog sitemap entries:', error)
    return staticEntries
  }
}
