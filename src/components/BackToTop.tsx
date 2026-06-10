'use client'

import { useEffect, useState } from 'react'

/**
 * Back-to-top button. Replaces the legacy `main.js` scroll handler and the
 * retired template stylesheet — fully self-contained (markup + behavior;
 * appearance lives in globals.css under `.backtotop`).
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="backtotop" style={{ display: visible ? 'block' : 'none' }}>
      <button type="button" className="scroll" aria-label="Back to top" onClick={scrollToTop}>
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}
