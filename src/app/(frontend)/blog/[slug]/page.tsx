import Image from 'next/image'
import Link from 'next/link'
import { ArchiveWidget } from '@/components/ArchiveWidget'
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

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blog = await fetchBlog(slug)
  const navigation = blog ? await fetchBlogNavigation(blog.slug) : { previous: null, next: null }

  return (
    <>
      {/* Page Banner */}
      <section className="page_banner decoration_wrapper">
        <div className="container">
          <h1 className="page_title">{blog?.title || 'Blog Not Found'}</h1>
          <ul className="breadcrumb_nav unordered_list justify-content-center justify-content-lg-start">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>Blog Details</li>
          </ul>
        </div>
        <div className="decoration_item shape_leaf_1">
          <img src="/assets/images/shapes/shape_leaf_left.svg" alt="Shape Leaf" />
        </div>
        <div className="decoration_item shape_leaf_2">
          <img src="/assets/images/shapes/shape_leaf_right.svg" alt="Shape Leaf" />
        </div>
      </section>

      {!blog ? (
        <section className="section_space_lg">
          {/* Blog Not Found Section */}
          <div className="container">
            <div className="text-center">
              <h4>The blog you're looking for doesn't exist.</h4>
              <div className="my-5">
                <Link className="btn btn-primary" href="/blog">
                  <span className="btn_text" data-text="Back to Blog">
                    Back to Blogs
                  </span>
                  <span className="btn_icon">
                    <i className="fa-solid fa-arrow-up-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="blog_details_section section_space_lg pb-0">
          {/* Blog Details Section */}
          <div className="container">
            <div className="row">
              {/* Main Content */}
              <div className="col-lg-8">
                {/* Featured Image */}
                {blog?.image?.url && (
                  <div className="details_image mb-4">
                    <Image
                      src={blog.image.url}
                      alt={blog.image.alt || blog.title}
                      width={800}
                      height={500}
                      className="img-fluid rounded"
                    />
                  </div>
                )}

                {/* Blog Content */}
                <div className="details_content">
                  {/* Blog Meta */}
                  <ul className="post_meta unordered_list mb-4">
                    <li>
                      <i className="fa-solid fa-calendar-days"></i>{' '}
                      {blog?.publishedDate && formatDate(blog.publishedDate)}
                    </li>
                  </ul>

                  {/* Blog Body */}
                  <div className="mb-4">
                    {blog?.description && (
                      <p className="lead mb-3">
                        <strong>{blog.description}</strong>
                      </p>
                    )}

                    {/* Rich Text Content */}
                    {blog?.details && typeof blog.details === 'object' && (
                      <RichText data={blog.details} />
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="my-5">
                    <div className="prev_next_post_nav">
                      {navigation.previous ? (
                        <Link href={`/blog/${navigation.previous.slug}`}>
                          <span className="item_icon">
                            <i className="fa-solid fa-angle-left"></i>
                          </span>
                          <span className="item_content">
                            <b>Previous</b>
                            <small className="d-block">{navigation.previous.title}</small>
                          </span>
                        </Link>
                      ) : (
                        <Link href="#!" className="d-flex align-items-start opacity-50 pe-none">
                          <span className="item_icon">
                            <i className="fa-solid fa-angle-left"></i>
                          </span>
                          <span className="item_content">
                            <b>Previous</b>
                          </span>
                        </Link>
                      )}

                      {navigation.next ? (
                        <Link href={`/blog/${navigation.next.slug}`}>
                          <span className="item_content text-end">
                            <b>Next</b>
                            <small className="d-block">{navigation.next.title}</small>
                          </span>
                          <span className="item_icon">
                            <i className="fa-solid fa-angle-right"></i>
                          </span>
                        </Link>
                      ) : (
                        <Link href="#!" className="d-flex align-items-start opacity-50 pe-none">
                          <span className="item_content text-end">
                            <b>Next</b>
                          </span>
                          <span className="item_icon">
                            <i className="fa-solid fa-angle-right"></i>
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-lg-4">
                <ArchiveWidget />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
