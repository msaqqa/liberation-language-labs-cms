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
