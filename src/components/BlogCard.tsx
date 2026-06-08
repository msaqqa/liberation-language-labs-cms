import Link from 'next/link'
import { formatDate } from '@/lib/media'

interface BlogCardProps {
  title: string
  description: string
  slug: string
  publishedDate: string
  image: {
    url?: string
    alt?: string
  }
}

export function BlogCard({ title, description, slug, publishedDate, image }: BlogCardProps) {
  return (
    <article className="bcard">
      <Link href={`/blog/${slug}`} aria-label={`Read: ${title}`}>
        <div className="bcard__top">
          {image?.url ? (
            <img src={image.url} alt={image.alt || title} />
          ) : (
            <>
              <span className="stripes" aria-hidden="true"></span>
              <svg
                className="ph"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="9" r="3" />
                <path d="M12 15v5M8.5 12.5a5 5 0 0 1 7 0M6 10a8 8 0 0 1 12 0" />
              </svg>
            </>
          )}
        </div>
      </Link>
      <div className="bcard__body">
        <span className="bcard__meta">{formatDate(publishedDate)}</span>
        <h3 className="h-sm">{title}</h3>
        <p>{description}</p>
        <Link className="btn-ghost" href={`/blog/${slug}`} style={{ minHeight: 0, marginTop: 4 }}>
          Read more{' '}
          <span className="arr" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  )
}
