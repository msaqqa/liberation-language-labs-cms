import { InfiniteBlogList } from '@/components/InfiniteBlogList'
import { ArchiveWidget } from '@/components/ArchiveWidget'
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
    <>
      {/* Page Banner */}
      <section className="page_banner decoration_wrapper">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="page_title mb-0">Labs Blog</h1>
            </div>
            <div className="col-lg-6">
              <ul className="breadcrumb_nav unordered_list justify-content-md-end justify-content-center">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>Labs Blog</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="decoration_item shape_leaf_1">
          <img src="/assets/images/shapes/shape_leaf_left.svg" alt="Shape Leaf" />
        </div>
        <div className="decoration_item shape_leaf_2">
          <img src="/assets/images/shapes/shape_leaf_right.svg" alt="Shape Leaf" />
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog_section section_space_lg">
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-lg-8">
              {blogs.length === 0 ? (
                <div className="text-center py-5">No blogs found</div>
              ) : (
                <InfiniteBlogList
                  initialBlogs={blogs}
                  initialPage={page}
                  initialHasNextPage={hasNextPage}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <ArchiveWidget />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
