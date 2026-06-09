'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BlogCard } from '@/components/BlogCard'

const BLOGS_PER_PAGE = 6
const BLOG_PLACEHOLDER_BG_COLOR = 'var(--soft)'

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
  const barStyle = {
    backgroundColor: BLOG_PLACEHOLDER_BG_COLOR,
    borderRadius: '4px',
  }

  return (
    <article className="bcard" aria-hidden="true">
      <div className="bcard__top">
        <span className="stripes" aria-hidden="true"></span>
      </div>
      <div className="bcard__body">
        <div style={{ ...barStyle, height: '12px', width: '40%' }}></div>
        <div style={{ ...barStyle, height: '20px', width: '85%' }}></div>
        <div style={{ ...barStyle, height: '12px', width: '95%' }}></div>
        <div style={{ ...barStyle, height: '12px', width: '70%' }}></div>
        <div style={{ ...barStyle, height: '14px', width: '32%', marginTop: '4px' }}></div>
      </div>
    </article>
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
      <div className="bgrid">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}

        {isLoading &&
          skeletonItems.map((_, index) => <BlogCardSkeleton key={`skeleton-${index}`} />)}
      </div>

      <div ref={sentinelRef} style={{ paddingTop: 16 }} aria-hidden="true" />

      {error && (
        <p className="body" style={{ textAlign: 'center', marginTop: 24, color: 'var(--error)' }}>
          {error}
        </p>
      )}
    </>
  )
}
