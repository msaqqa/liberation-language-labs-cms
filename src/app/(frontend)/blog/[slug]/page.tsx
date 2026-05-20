import Image from 'next/image'
import Link from 'next/link'
import { ArchiveWidget } from '@/components/ArchiveWidget'
import { formatDate } from '@/lib/media'
import { RichText } from '@payloadcms/richtext-lexical/react'

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
  details: any // RichText from Payload
}

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/api/blogs?where[slug][equals]=${slug}&limit=1`,
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
    console.error('Failed to fetch post:', error)
    return null
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = await fetchPost(slug)

  return (
    <>
      {/* Page Banner */}
      <section className="page_banner decoration_wrapper">
        <div className="container">
          <h1 className="page_title">{post.title}</h1>
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

      {!post ? (
        <section className="section_space_lg">
          {/* Blog Not Found Section */}
          <div className="container">
            <div className="text-center">
              <p>The post you're looking for doesn't exist.</p>
              <div className="post_navigation my-5 pt-4">
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
                {post.image?.url && (
                  <div className="details_image mb-4">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt || post.title}
                      width={800}
                      height={500}
                      className="img-fluid rounded"
                    />
                  </div>
                )}

                {/* Post Content */}
                <div className="details_content">
                  {/* Post Meta */}
                  <ul className="post_meta unordered_list mb-4">
                    <li>
                      <i className="fa-solid fa-calendar-days"></i> {formatDate(post.publishedDate)}
                    </li>
                  </ul>

                  {/* Post Body */}
                  <div className="post_body mb-4">
                    {post.description && (
                      <p className="lead mb-3">
                        <strong>{post.description}</strong>
                      </p>
                    )}

                    {/* Rich Text Content */}
                    {post.details && typeof post.details === 'object' ? (
                      <RichText data={post.details} />
                    ) : (
                      <div className="content" dangerouslySetInnerHTML={{ __html: post.details }} />
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="post_navigation my-5 pt-4 border-top">
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
