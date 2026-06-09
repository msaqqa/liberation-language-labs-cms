'use client'

import { useState, type MouseEvent } from 'react'

interface ShareBarProps {
  /** Absolute URL of the article (falls back to window.location at runtime) */
  url: string
  title: string
}

export function ShareBar({ url, title }: ShareBarProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const enc = encodeURIComponent
  const bluesky = `https://bsky.app/intent/compose?text=${enc(`${title} ${shareUrl}`)}`
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`
  const email = `mailto:?subject=${enc(title)}&body=${enc(shareUrl)}`

  // Open social shares in a centered popup, or the native share sheet when available,
  // instead of navigating the reader away from the article.
  const openShare = (event: MouseEvent<HTMLAnchorElement>, shareLink: string) => {
    event.preventDefault()
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title, url: shareUrl }).catch(() => {
        window.open(shareLink, 'share-dialog', 'noopener,noreferrer,width=600,height=540')
      })
      return
    }
    const width = 600
    const height = 540
    const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2)
    const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2)
    window.open(
      shareLink,
      'share-dialog',
      `noopener,noreferrer,width=${width},height=${height},left=${left},top=${top}`,
    )
  }

  const handleCopy = async () => {
    const link = url || (typeof window !== 'undefined' ? window.location.href : '')
    try {
      await navigator.clipboard.writeText(link)
    } catch {
      // ignore — clipboard may be unavailable
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="share">
      <span className="lbl">Share this article</span>
      <div className="share__btns">
        <a
          href={bluesky}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Bluesky"
          onClick={(event) => openShare(event, bluesky)}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 11c-1.6-3.1-6-9-8.4-7.3C2 5 3.6 9.5 4.6 11.2c-1.5.3-3 1.3-2.4 3.4.5 1.6 3 2 5 .7C9 13.9 11 12 12 11c1 1 3 2.9 4.8 4.3 2 1.3 4.5.9 5-.7.6-2.1-.9-3.1-2.4-3.4 1-1.7 2.6-6.2 1-7.5C18 1.9 13.6 7.9 12 11z" />
          </svg>
        </a>
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          onClick={(event) => openShare(event, facebook)}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.6C11.6 3 10.5 4.6 10.5 7v1.5H8.5V12h2v9h3.5v-9h2.4l.4-3.5H14z" />
          </svg>
        </a>
        <a href={email} aria-label="Share by email">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3.5 6.5 12 13l8.5-6.5" />
          </svg>
        </a>
        <button
          type="button"
          className={`share__copy${copied ? ' copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy link"
        >
          <span className="share__toast" aria-hidden="true">
            Copied
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.3 1.3" />
            <path d="M15 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1.3-1.3" />
          </svg>
        </button>
      </div>
    </div>
  )
}
