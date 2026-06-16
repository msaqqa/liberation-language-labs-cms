'use client'

import { useNav, usePreferences } from '@payloadcms/ui'
import { PREFERENCE_KEYS } from 'payload/shared'
import { useEffect, useRef } from 'react'

/**
 * Desktop sidebar: default OPEN + remember the user's choice in localStorage.
 *
 * Payload's NavProvider fights us in two ways on mount: it force-closes the nav
 * on viewports at/below its large breakpoint, and (above it) it sets the nav
 * from the async server preference. So a single setNavOpen() gets overwritten.
 * We therefore (a) write Payload's own `nav` preference to match, and (b)
 * re-assert our desired state across a short settling window to win both races.
 * After that window, nav changes are treated as user toggles and persisted.
 *
 * Desktop-only (≥1024px, matching our fixed-sidebar layout): on mobile/tablet the
 * nav is a modal Payload keeps closed, so we never force it open or persist it.
 *
 * Rendered inside the Nav via admin.components.beforeNavLinks so useNav() works.
 */
const KEY = 'll-nav-open'
const isDesktop = () =>
  typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches

export const NavStatePersist = () => {
  const { hydrated, navOpen, setNavOpen } = useNav()
  const { setPreference } = usePreferences()
  const ready = useRef(false)

  // Apply saved (or default-open) state once hydrated, re-asserting through a
  // settling window so Payload's mount-time effects don't override it.
  useEffect(() => {
    if (!hydrated || !isDesktop()) return
    const saved = localStorage.getItem(KEY)
    const desired = saved === null ? true : saved === 'true'
    // align Payload's own preference so subsequent loads agree (merge: keep groups)
    void setPreference(PREFERENCE_KEYS.NAV, { open: desired }, true)
    // setNavOpen is a no-op when already in `desired`, so re-asserting is cheap
    const timers = [0, 80, 200, 400, 650].map((ms) =>
      setTimeout(() => setNavOpen(desired), ms),
    )
    const done = setTimeout(() => {
      ready.current = true
    }, 700)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(done)
    }
    // run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated])

  // Persist genuine user toggles (after the settling window), desktop only.
  useEffect(() => {
    if (!ready.current || !isDesktop()) return
    localStorage.setItem(KEY, String(navOpen))
    void setPreference(PREFERENCE_KEYS.NAV, { open: navOpen }, true)
  }, [navOpen, setPreference])

  // Payload marks the closed nav `inert` (NavWrapper), which makes our icon rail
  // non-interactive (no click/hover/focus). On desktop we strip `inert` so the
  // rail icons stay usable; a MutationObserver re-strips it if React re-applies.
  useEffect(() => {
    if (!isDesktop()) return
    const aside = document.querySelector('aside.nav')
    if (!aside) return
    const strip = () => aside.hasAttribute('inert') && aside.removeAttribute('inert')
    strip()
    const obs = new MutationObserver(strip)
    obs.observe(aside, { attributes: true, attributeFilter: ['inert'] })
    return () => obs.disconnect()
  }, [navOpen])

  // In the collapsed rail the labels are hidden (CSS), so expose each item's text
  // as a native `title` tooltip. Cleared when expanded so it doesn't duplicate the
  // visible labels.
  useEffect(() => {
    const aside = document.querySelector('aside.nav')
    if (!aside) return
    const rail = isDesktop() && !navOpen
    aside.querySelectorAll<HTMLElement>('.nav__link').forEach((link) => {
      const label = link.querySelector('.nav__link-label')?.textContent?.trim()
      if (rail && label) link.setAttribute('title', label)
      else link.removeAttribute('title')
    })
  }, [navOpen])

  return null
}

export default NavStatePersist
