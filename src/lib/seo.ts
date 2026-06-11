import type { Metadata } from 'next'

const FALLBACK_SITE_URL = 'http://localhost:3000'
const DEFAULT_OG_IMAGE = '/assets/images/site_logo/og_preview_logo.png'
const SITE_NAME = 'Liberation Language Labs'

export type BuildMetadataInput = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  /** Keep the page out of search indexes (e.g. error / not-found pages). */
  noindex?: boolean
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL
}

export function toAbsoluteUrl(urlOrPath: string): string {
  return new URL(urlOrPath, getSiteUrl()).toString()
}

export function buildMetadata({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  publishedTime,
  noindex = false,
}: BuildMetadataInput): Metadata {
  const canonicalUrl = toAbsoluteUrl(path)
  const imageUrl = toAbsoluteUrl(image && image.trim().length > 0 ? image : DEFAULT_OG_IMAGE)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}
