import { BlogCard } from '@/components/BlogCard'
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

interface BlogPageProps {
  searchParams: Promise<{
    page?: string
  }>
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

function getPaginationPages(currentPage: number, totalPages: number): (number | null)[] {
  const items: (number | null)[] = []
  const siblingsCount = 1

  // Always show first page
  items.push(1)

  // Calculate start and end of sibling pages
  const leftSiblingIndex = Math.max(currentPage - siblingsCount, 2)
  const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages - 1)

  // Add ellipsis or pages on the left
  if (leftSiblingIndex > 2) {
    items.push(null) // null represents ellipsis
  } else {
    for (let i = 2; i < leftSiblingIndex; i++) {
      items.push(i)
    }
  }

  // Add sibling pages
  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    items.push(i)
  }

  // Add ellipsis or pages on the right
  if (rightSiblingIndex < totalPages - 1) {
    items.push(null)
  } else {
    for (let i = rightSiblingIndex + 1; i < totalPages; i++) {
      items.push(i)
    }
  }

  // Always show last page if totalPages > 1
  if (totalPages > 1 && !items.includes(totalPages)) {
    items.push(totalPages)
  }

  return items
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)
  const { docs: blogs, totalPages } = await fetchBlogs(currentPage)

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
                <>
                  <div className="row">
                    {blogs.map((blog) => (
                      <div className="col-12 col-md-6" key={blog.id}>
                        <BlogCard {...blog} />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination_wrap mt-5">
                      <ul className="pagination_nav unordered_list justify-content-center">
                        {getPaginationPages(currentPage, totalPages).map((page, index) =>
                          page === null ? (
                            <li key={`ellipsis-${index}`}>
                              <a href="#!">...</a>
                            </li>
                          ) : (
                            <li key={page} className={currentPage === page ? 'active' : ''}>
                              <Link href={`/blog?page=${page}`}>{page}</Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </>
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
