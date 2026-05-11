'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
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

export function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          '/api/blogs?limit=3&sort=-publishedDate&where[published][equals]=true',
        )
        const data = await response.json()
        setPosts(data.docs || [])
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="blog_section section_space_lg bg_primary_light">
        <div className="container">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    )
  }

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
        <div className="row justify-content-center">
          {posts.map((post) => (
            <div className="col-12 col-md-6 col-lg-4">
              <BlogCard key={post.id} {...post} />
            </div>
          ))}
        </div>
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
