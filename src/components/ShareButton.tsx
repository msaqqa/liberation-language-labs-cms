'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface ShareButtonProps {
  /** Absolute URL of the article (falls back to window.location at runtime) */
  url: string
  title: string
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const enc = encodeURIComponent
  const text = `${title} ${shareUrl}`

  const platforms = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.6C11.6 3 10.5 4.6 10.5 7v1.5H8.5V12h2v9h3.5v-9h2.4l.4-3.5H14z" />
        </svg>
      ),
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(shareUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.53 3H20.5l-6.49 7.42L21.75 21h-6.16l-4.82-6.3L5.25 21H2.28l6.94-7.93L2.5 3h6.32l4.36 5.76L17.53 3zm-1.08 16.2h1.71L7.62 4.71H5.79l10.66 14.49z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(shareUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.4 8.4h3.1V21H3.4zM9.1 8.4h2.97v1.72h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.1v-5.62c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97V21H9.1z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${enc(text)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.08c-.25.69-1.45 1.32-1.99 1.36-.53.05-.53.42-3.34-.7-2.81-1.12-4.6-3.98-4.74-4.16-.14-.18-1.14-1.51-1.14-2.88 0-1.37.72-2.04.97-2.32.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.62.48.25.6.83 2.07.9 2.22.07.14.12.31.02.49-.09.18-.14.29-.28.45-.14.16-.29.36-.42.48-.14.13-.28.27-.12.55.16.28.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.22 1.36.28.14.44.12.6-.07.16-.18.69-.8.87-1.08.18-.28.37-.23.62-.14.25.09 1.6.76 1.87.9.28.14.46.21.53.32.07.12.07.65-.18 1.34z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: `mailto:?subject=${enc(title)}&body=${enc(shareUrl)}`,
      icon: (
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
      ),
    },
  ]

  const closeModal = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {
      // ignore — clipboard may be unavailable
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  // Modal a11y: lock body scroll, move focus into the dialog, trap Tab, and
  // close on Escape. Focus returns to the trigger via closeModal().
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const panel = panelRef.current
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    focusables?.[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
        return
      }
      if (event.key === 'Tab' && focusables && focusables.length > 0) {
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, closeModal])

  return (
    <div className="share">
      <button
        ref={triggerRef}
        type="button"
        className="btn btn-secondary share__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        Share
      </button>

      {open && (
        <div
          className="share-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
          onClick={closeModal}
        >
          <div
            ref={panelRef}
            className="share-modal__panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="share-modal__head">
              <h2 id="share-modal-title" className="share-modal__title">
                Share this article
              </h2>
              <button
                type="button"
                className="share-modal__close"
                aria-label="Close share dialog"
                onClick={closeModal}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="share-modal__grid">
              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  className="share-modal__item"
                  href={platform.href}
                  target={platform.name === 'Email' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  onClick={closeModal}
                >
                  {platform.icon}
                  <span>{platform.name}</span>
                </a>
              ))}

              <button
                type="button"
                className={`share-modal__item share-modal__item--copy${copied ? ' copied' : ''}`}
                onClick={handleCopy}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.3 1.3" />
                  <path d="M15 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1.3-1.3" />
                </svg>
                <span>{copied ? 'Link copied!' : 'Copy link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
