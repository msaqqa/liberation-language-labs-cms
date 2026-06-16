'use client'

import { useNav } from '@payloadcms/ui'
import { useEffect, useRef } from 'react'

/**
 * Persists the desktop sidebar open/closed state in localStorage and defaults it
 * to OPEN. Payload remembers the nav state in server preferences (default open),
 * but we want a localStorage-backed default-open that applies instantly on the
 * client. Rendered inside the Nav (via admin.components.beforeNavLinks) so it can
 * read the live nav context.
 *
 * Desktop-only: on mobile/tablet the sidebar is a modal that Payload keeps closed
 * by default, so we never force it open there (and never persist that state).
 */
const KEY = 'll-nav-open'
const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches

export const NavStatePersist = () => {
  const { hydrated, navOpen, setNavOpen } = useNav()
  const applied = useRef(false)

  // Apply the saved (or default-open) state once, after hydration, on desktop.
  useEffect(() => {
    if (!hydrated || applied.current || !isDesktop()) return
    applied.current = true
    const saved = localStorage.getItem(KEY)
    const open = saved === null ? true : saved === 'true'
    if (open !== navOpen) setNavOpen(open)
  }, [hydrated, navOpen, setNavOpen])

  // Persist subsequent toggles (desktop only — don't let mobile's modal state
  // overwrite the remembered desktop preference).
  useEffect(() => {
    if (!applied.current || !isDesktop()) return
    localStorage.setItem(KEY, String(navOpen))
  }, [navOpen])

  return null
}

export default NavStatePersist
