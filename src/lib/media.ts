export type Media = {
  url: string
  alt: string
}
export type MediaField = Media | number | null

export function getMedia(media: MediaField, fallback = ''): { url: string; alt: string } {
  if (!media || typeof media === 'number') return { url: '', alt: fallback }
  if (typeof media === 'string') return { url: media, alt: fallback }

  return {
    url: media.url ?? '',
    alt: media.alt ?? fallback,
  }
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  } catch {
    return dateString
  }
}
