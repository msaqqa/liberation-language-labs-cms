'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ClientScripts() {
  const pathname = usePathname()

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return

    const prev = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = prev
    }
  }, [])

  // load Bootstrap and main.js files
  useEffect(() => {
    // load Bootstrap file
    require('bootstrap/dist/js/bootstrap.bundle.min.js')

    // load main.js file
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const script = document.createElement('script')
      script.src = '/assets/js/main.js'
      script.async = true
      script.onload = () => {
        if ((window as any).initTheme) {
          ;(window as any).initTheme()
        }
      }

      document.body.appendChild(script)

      return () => {
        // cleanup
        if ((window as any).cleanupTheme) {
          ;(window as any).cleanupTheme()
        }
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
  }, [])

  // Re-run theme logic after each route change in App Router navigation.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    if ((window as any).initTheme) {
      ;(window as any).initTheme()
    }
  }, [pathname])

  // Listening for the back/next button from the browser
  useEffect(() => {
    const handlePopState = () => {
      if ((window as any).initTheme) {
        ;(window as any).initTheme()
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return null
}
