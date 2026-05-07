export type Media = {
  url: string
  alt: string
}
export type MediaField = Media | string | null | undefined

export function getMedia(media: MediaField, fallback = ''): { url: string; alt: string } {
  if (!media) return { url: '', alt: fallback }
  if (typeof media === 'string') return { url: media, alt: fallback }

  return {
    url: media.url ?? '',
    alt: media.alt ?? fallback,
  }
}
