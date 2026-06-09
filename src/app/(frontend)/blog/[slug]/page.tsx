import Link from 'next/link'
import Banner from '@/components/Banner'
import { BlogSection } from '@/components/BlogSection'
import { ShareBar } from '@/components/ShareBar'
import { formatDate } from '@/lib/media'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface Blog {
  id: string
  title: string
  description: string
  slug: string
  publishedDate: string
  image: {
    url?: string
    alt?: string
  }
  details: any // RichText from Payload
}

interface RelatedBlog {
  id: string
  title: string
  description: string
  slug: string
  publishedDate: string
  image: {
    url?: string
    alt?: string
  }
}

interface BlogNavigationItem {
  title: string
  slug: string
}

interface BlogNavigation {
  previous: BlogNavigationItem | null
  next: BlogNavigationItem | null
}

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

// Estimate reading time from the Lexical rich-text tree (~200 wpm).
function countWords(node: any): number {
  if (!node || typeof node !== 'object') return 0
  let count = 0
  if (typeof node.text === 'string') {
    count += node.text.trim().split(/\s+/).filter(Boolean).length
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) count += countWords(child)
  }
  return count
}

function getReadingTime(details: any): number {
  const root = details?.root ?? details
  const words = countWords(root)
  return Math.max(1, Math.round(words / 200))
}

async function fetchBlog(slug: string): Promise<Blog | null> {
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/api/blogs?where[slug][equals]=${slug}&where[published][equals]=true&limit=1`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.docs && data.docs.length > 0 ? data.docs[0] : null
  } catch (error) {
    console.error('Failed to fetch blog:', error)
    return null
  }
}

async function fetchBlogNavigation(currentSlug: string): Promise<BlogNavigation> {
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/api/blogs?limit=1000&sort=-publishedDate&where[published][equals]=true`,
      {
        next: { revalidate: 3600 },
      },
    )

    if (!response.ok) {
      return { previous: null, next: null }
    }

    const data = await response.json()
    const blogs: BlogNavigationItem[] = Array.isArray(data.docs)
      ? data.docs.map((item: BlogNavigationItem) => ({
          title: item.title,
          slug: item.slug,
        }))
      : []

    const currentIndex = blogs.findIndex((item) => item.slug === currentSlug)

    if (currentIndex === -1) {
      return { previous: null, next: null }
    }

    return {
      previous: currentIndex > 0 ? blogs[currentIndex - 1] : null,
      next: currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null,
    }
  } catch (error) {
    console.error('Failed to fetch blog navigation:', error)
    return { previous: null, next: null }
  }
}

async function fetchRelatedBlogs(currentSlug: string): Promise<RelatedBlog[]> {
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/api/blogs?limit=4&sort=-publishedDate&where[published][equals]=true`,
      {
        next: { revalidate: 3600 },
      },
    )

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    const blogs: RelatedBlog[] = Array.isArray(data.docs) ? data.docs : []
    return blogs.filter((item) => item.slug !== currentSlug).slice(0, 3)
  } catch (error) {
    console.error('Failed to fetch related blogs:', error)
    return []
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blog = await fetchBlog(slug)

  if (!blog) {
    return (
      <div className="ll-root">
        <main id="main">
          <Banner
            id="art-h"
            crumb={[{ label: 'Blog', href: '/blog' }, { label: 'Not found' }]}
            title="This article doesn't exist."
          />
          <div className="section">
            <div className="wrap">
              <div className="art-missing">
                <p className="body-lg">
                  The post you&apos;re looking for may have moved or been unpublished.
                </p>
                <Link className="btn btn-primary" href="/blog">
                  Back to all posts{' '}
                  <span className="arr" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const [navigation, related] = await Promise.all([
    fetchBlogNavigation(blog.slug),
    fetchRelatedBlogs(blog.slug),
  ])

  const readingTime = getReadingTime(blog.details)
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/blog/${blog.slug}`

  return (
    <div className="ll-root">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <main id="main">
        <article aria-labelledby="art-h">
          {/* Article header */}
          <Banner
            id="art-h"
            crumb={[{ label: 'Blog', href: '/blog' }, { label: blog.title }]}
            title={blog.title}
            description={blog.description}
          />

          {/* Media + body */}
          <div className="section article-body">
            <div className="wrap">
              {/* Hero media */}
              <div className="arthero">
                <div className="hud-frame reveal">
                  <span className="br br-tl" aria-hidden="true"></span>
                  <span className="br br-tr" aria-hidden="true"></span>
                  <span className="br br-bl" aria-hidden="true"></span>
                  <span className="br br-br" aria-hidden="true"></span>
                  <div className="arthero__panel">
                    {blog.image?.url ? (
                      <img src={blog.image.url} alt={blog.image.alt || blog.title} />
                    ) : (
                      <>
                        <span className="stripes" aria-hidden="true"></span>
                        <span className="glow" aria-hidden="true"></span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="9" r="3" />
                          <path d="M12 15v5M8.5 12.5a5 5 0 0 1 7 0M6 10a8 8 0 0 1 12 0" />
                        </svg>
                      </>
                    )}
                  </div>
                </div>
                <time className="arthero__date" dateTime={blog.publishedDate}>
                  {formatDate(blog.publishedDate)} · {readingTime} min read
                </time>
              </div>

              {/* Article body */}
              <div className="prose">
                {blog.details && typeof blog.details === 'object' && (
                  <RichText data={blog.details} />
                )}
              </div>

              {/* Prev / Next */}
              {(navigation.previous || navigation.next) && (
                <nav className="postnav" aria-label="More articles">
                  {navigation.previous ? (
                    <Link
                      className="postnav__item postnav__item--prev"
                      href={`/blog/${navigation.previous.slug}`}
                    >
                      <span className="postnav__dir">
                        <span className="arr" aria-hidden="true">
                          ←
                        </span>{' '}
                        Previous
                      </span>
                      <span className="postnav__title">{navigation.previous.title}</span>
                    </Link>
                  ) : (
                    <div aria-hidden="true" />
                  )}
                  {navigation.next ? (
                    <Link
                      className="postnav__item postnav__item--next"
                      href={`/blog/${navigation.next.slug}`}
                    >
                      <span className="postnav__dir">
                        Next{' '}
                        <span className="arr" aria-hidden="true">
                          →
                        </span>
                      </span>
                      <span className="postnav__title">{navigation.next.title}</span>
                    </Link>
                  ) : (
                    <div aria-hidden="true" />
                  )}
                </nav>
              )}

              {/* Share */}
              <ShareBar url={postUrl} title={blog.title} />
            </div>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <BlogSection
            posts={related}
            eyebrow="Keep reading"
            title="More from the labs."
            headingId="related-h"
            sectionId="related"
            className="related"
          />
        )}
      </main>
    </div>
  )
}
