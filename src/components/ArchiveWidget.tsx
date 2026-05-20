import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/media'

interface Post {
  id: string
  title: string
  slug: string
  publishedDate: string
  image?: {
    url?: string
    alt?: string
  } | null
}

interface ArchiveWidgetProps {
  currentSlug?: string
}

interface ArchiveResponse {
  docs?: Post[]
}

async function fetchArchivePosts(currentSlug?: string): Promise<Post[]> {
  try {
    const baseUrl = process.env.SERVER_URL
    const excludeCurrentSlug = currentSlug
      ? `&where[slug][not_equals]=${encodeURIComponent(currentSlug)}`
      : ''

    const response = await fetch(
      `${baseUrl}/api/blogs?limit=3&sort=-publishedDate&where[published][equals]=true${excludeCurrentSlug}`,
      {
        next: { revalidate: 3600 },
      },
    )

    if (!response.ok) {
      return []
    }

    const data: ArchiveResponse = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Failed to fetch archive posts:', error)
    return []
  }
}

export async function ArchiveWidget({ currentSlug }: ArchiveWidgetProps) {
  const posts = await fetchArchivePosts(currentSlug)

  if (posts.length === 0) return null

  return (
    <aside className="sidebar ps-lg-4">
      <div className="sidebar_widget">
        <h3 className="sidebar_widget_title">
          <span className="title_icon">
            <img src="/assets/images/site_logo/favourite_icon.svg" alt="Archive Icon" />
          </span>
          <span className="title_text">Archive</span>
        </h3>
        <ul className="reecommended_post_group unordered_list_block">
          {posts.map((post) => (
            <li key={post.id}>
              <div className="blog_item_small">
                <div className="blog_image">
                  <Link className="blog_image_wrap" href={`/blog/${post.slug}`}>
                    {post.image?.url ? (
                      <Image
                        src={post.image.url}
                        alt={post.image.alt || post.title}
                        width={120}
                        height={90}
                      />
                    ) : (
                      <img src="/assets/images/blogs/small_blog_image_1.jpg" alt={post.title} />
                    )}
                  </Link>
                </div>
                <div className="blog_content">
                  <h3 className="item_title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <ul className="post_meta unordered_list">
                    <li>{formatDate(post.publishedDate)}</li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
