'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BlogCard } from '@/components/BlogCard'

const BLOGS_PER_PAGE = 6
const BLOG_PLACEHOLDER_BG_COLOR = '#eef3f7'

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
  page: number
  hasNextPage: boolean
}

interface InfiniteBlogListProps {
  initialBlogs: Blog[]
  initialPage: number
  initialHasNextPage: boolean
}

function BlogCardSkeleton() {
  const skeletonStyle = {
    backgroundColor: BLOG_PLACEHOLDER_BG_COLOR,
    borderRadius: '8px',
  }

  return (
    <div className="blog_item" aria-hidden="true">
      <div className="blog_image">
        <div className="ratio ratio-4x3 rounded" style={skeletonStyle}></div>
      </div>
      <div className="blog_content">
        <div className="mb-3">
          <div style={{ ...skeletonStyle, height: '14px', width: '36%' }}></div>
        </div>
        <div className="mb-3">
          <div style={{ ...skeletonStyle, height: '28px', width: '88%' }}></div>
        </div>
        <div className="mb-2">
          <div style={{ ...skeletonStyle, height: '12px', width: '95%' }}></div>
        </div>
        <div className="mb-3">
          <div style={{ ...skeletonStyle, height: '12px', width: '80%' }}></div>
        </div>
        <div>
          <div style={{ ...skeletonStyle, height: '14px', width: '30%' }}></div>
        </div>
      </div>
    </div>
  )
}

export function InfiniteBlogList({
  initialBlogs,
  initialPage,
  initialHasNextPage,
}: InfiniteBlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)
  const [page, setPage] = useState(initialPage)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const isLoadingRef = useRef(false)

  const skeletonItems = useMemo(() => Array.from({ length: BLOGS_PER_PAGE }), [])

  const loadMoreBlogs = useCallback(async () => {
    if (isLoadingRef.current || !hasNextPage) return

    isLoadingRef.current = true
    setIsLoading(true)
    setError(null)

    try {
      const nextPage = page + 1
      const response = await fetch(
        `/api/blogs?page=${nextPage}&limit=${BLOGS_PER_PAGE}&sort=-publishedDate&where[published][equals]=true`,
      )

      if (!response.ok) {
        throw new Error('Failed to load more blogs')
      }

      const data: BlogsResponse = await response.json()
      const pageDocs = data.docs.slice(0, BLOGS_PER_PAGE)
      setBlogs((prev) => {
        const existingIds = new Set(prev.map((item) => item.id))
        const uniqueIncoming = pageDocs.filter((item) => !existingIds.has(item.id))
        return [...prev, ...uniqueIncoming]
      })
      setPage(data.page)
      setHasNextPage(data.hasNextPage)
    } catch (fetchError) {
      console.error('Failed to fetch additional blogs:', fetchError)
      setError('Unable to load more blogs right now.')
    } finally {
      isLoadingRef.current = false
      setIsLoading(false)
    }
  }, [hasNextPage, page])

  useEffect(() => {
    const sentinel = sentinelRef.current

    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]

        if (firstEntry.isIntersecting) {
          loadMoreBlogs()
        }
      },
      {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0.1,
      },
    )

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
    }
  }, [loadMoreBlogs])

  return (
    <>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-12 col-md-6" key={blog.id}>
            <BlogCard {...blog} />
          </div>
        ))}

        {isLoading &&
          skeletonItems.map((_, index) => (
            <div className="col-12 col-md-6" key={`skeleton-${index}`}>
              <BlogCardSkeleton />
            </div>
          ))}
      </div>

      <div ref={sentinelRef} className="pt-4" aria-hidden="true" />

      {error && <p className="text-danger text-center mt-4 mb-0">{error}</p>}
    </>
  )
}
