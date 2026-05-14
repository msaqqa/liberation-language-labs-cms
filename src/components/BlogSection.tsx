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
    <section className="blog_section section_space_lg bg_primary_light">
      <div className="container">
        <div className="section_heading">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="section_heading_text mb-0">Labs Blog</h2>
            </div>
            <div className="col-md-6 d-none d-md-flex justify-content-end">
              <Link className="btn btn-primary" href="/blog">
                <span className="btn_text" data-text="Read More">
                  Read More
                </span>
                <span className="btn_icon">
                  <i className="fa-solid fa-arrow-up-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className="row justify-content-center">
            <div className="col-12 text-center">No blogs found</div>
          </div>
        ) : (
          <div className="row justify-content-center">
            {blogs.map((blog) => (
              <div className="col-12 col-md-6 col-lg-4" key={blog.id}>
                <BlogCard {...blog} />
              </div>
            ))}
          </div>
        )}

        <div className="d-md-none text-center mt-4">
          <Link className="btn btn-primary" href="/blog">
            <span className="btn_text">Read More</span>
            <span className="btn_icon">
              <i className="fa-solid fa-arrow-up-right"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
