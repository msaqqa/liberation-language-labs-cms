import Link from 'next/link'
import { BlogCard } from './BlogCard'

interface Post {
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
  docs: Post[]
}

async function fetchBlogs(): Promise<Post[]> {
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/api/blogs?limit=3&sort=-publishedDate&where[published][equals]=true`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    )

    if (!response.ok) {
      return []
    }

    const data: BlogsResponse = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return []
  }
}

export async function BlogSection() {
  const blogs = await fetchBlogs()

  return (
    <section className="section band--subtle" id="blog" aria-labelledby="blog-h">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <p className="eyebrow">Labs Blog</p>
            <h2 className="display-lg" id="blog-h">
              Notes from the practice.
            </h2>
          </div>
          <Link className="btn-ghost" href="/blog">
            All posts{' '}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        {blogs.length === 0 ? (
          <p className="body-lg">No posts yet — check back soon.</p>
        ) : (
          <div className="bgrid">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
