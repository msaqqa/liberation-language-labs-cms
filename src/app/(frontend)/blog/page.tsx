import { InfiniteBlogList } from '@/components/InfiniteBlogList'
import Banner from '@/components/Banner'
import Link from 'next/link'

const BLOGS_PER_PAGE = 6

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
}

interface BlogsResponse {
  docs: Blog[]
  totalDocs: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

async function fetchBlogs(page: number): Promise<BlogsResponse> {
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/api/blogs?page=${page}&limit=${BLOGS_PER_PAGE}&sort=-publishedDate&where[published][equals]=true`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    )

    if (!response.ok) {
      return {
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasNextPage: false,
        hasPrevPage: false,
      }
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }
}

export default async function BlogPage() {
  const { docs: blogs, page, hasNextPage } = await fetchBlogs(1)

  return (
    <div className="ll-root">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <main id="main">
        {/* Page header */}
        <Banner
          id="blog-h"
          crumb="Blog"
          title={
            <>
              Notes from the <span className="acc-word">practice</span>.
            </>
          }
          description="Neurodiversity-affirming perspectives on communication, therapy, and the families we work alongside — written between sessions."
        />

        {/* Blogs */}
        <section className="section" aria-label="Articles">
          <div className="wrap">
            {blogs.length === 0 ? (
              <p className="body-lg">No posts yet — check back soon.</p>
            ) : (
              <InfiniteBlogList
                initialBlogs={blogs}
                initialPage={page}
                initialHasNextPage={hasNextPage}
              />
            )}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="cta-band" aria-labelledby="cta-h">
          <div className="wrap">
            <div className="inner">
              <p className="eyebrow" style={{ justifyContent: 'center' }}>
                Have a question?
              </p>
              <h2 className="display-lg" id="cta-h">
                Let&apos;s talk about your family.
              </h2>
              <p className="body-lg">
                Reach out about availability, a consult, or whether the practice is a good fit —
                there&apos;s no wrong question to start with.
              </p>
              <div className="cta">
                <Link className="btn btn-primary" href="/#contact">
                  Start a conversation{' '}
                  <span className="arr" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link className="btn btn-secondary" href="/#process">
                  How therapy works
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
