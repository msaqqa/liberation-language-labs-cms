'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/media'

interface BlogCardProps {
  title: string
  description: string
  slug: string
  publishedDate: string
  image: {
    url?: string
    alt?: string
  }
}

export function BlogCard({ title, description, slug, publishedDate, image }: BlogCardProps) {
  return (
    <div className="blog_item">
      <div className="blog_image">
        <Link className="blog_image_wrap ratio ratio-16x9" href={`/blog/${slug}`}>
          {image?.url && (
            <Image
              src={image.url}
              alt={image.alt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
            />
          )}
        </Link>
      </div>
      <div className="blog_content">
        <ul className="post_meta unordered_list">
          <li>
            <i className="fa-solid fa-calendar-days"></i> {formatDate(publishedDate)}
          </li>
        </ul>
        <h3 className="item_title">{title}</h3>
        <p>{description}</p>
        <Link className="btn-link" href={`/blog/${slug}`}>
          <span className="btn_text">Read More</span>
          <span className="btn_icon">
            <i className="fa-solid fa-arrow-up-right"></i>
          </span>
        </Link>
      </div>
    </div>
  )
}
