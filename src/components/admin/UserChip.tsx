'use client'

import Link from 'next/link'
import { useAuth, useConfig } from '@payloadcms/ui'
import { useEffect, useRef, useState } from 'react'

/**
 * Header user chip — an accessible dropdown triggered by the initials avatar.
 * Reads the live auth state via useAuth() so it stays in sync with login/logout
 * (a server-rendered prop would go stale on client nav). Renders nothing when
 * signed out. The menu holds Account + Log out; logOut() clears auth state and
 * hits the logout endpoint but doesn't redirect, so we hard-redirect to /login after.
 */
const initialsFrom = (email: string): string => {
  const local = email.split('@')[0] || email
  const letters = local.replace(/[^a-zA-Z]/g, '').slice(0, 2)
  return (letters || 'LL').toUpperCase()
}

const initialsFromName = (name: string): string => {
  const parts = name.split(/\s+/).filter(Boolean)
  const letters = (parts[0]?.[0] ?? '') + (parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '')
  return (letters || name.slice(0, 2) || 'LL').toUpperCase()
}

const nameFrom = (email: string): string => {
  const local = email.split('@')[0]
  if (!local) return 'Account'
  return (
    local
      .split(/[._-]+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') || 'Account'
  )
}

export const UserChip = () => {
  const { user, logOut } = useAuth()
  const { config } = useConfig()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // close on outside click / Escape while open
  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!user) return null

  const adminRoute = config?.routes?.admin ?? '/admin'
  const email = (user.email as string | undefined) ?? ''
  const realName = (user.name as string | undefined)?.trim()
  const name = realName || nameFrom(email)
  // show only the first word in the chip (keeps the header compact); the full
  // name stays in the title tooltip + the account page.
  const firstName = name.split(/\s+/)[0] || name
  const initials = realName ? initialsFromName(realName) : initialsFrom(email)

  const handleLogout = async () => {
    setOpen(false)
    await logOut()
    // Hard navigation (not router.push): in production Next caches the RSC/router
    // payload, so a soft nav to /login re-renders the still-cached authed page and
    // bounces back. A full reload forces the server to re-evaluate the cleared
    // cookie and render the login screen. replace() keeps the authed page out of history.
    window.location.replace(`${adminRoute}/login`)
  }

  return (
    <div className="ll-topbar__user" ref={rootRef}>
      <button
        type="button"
        className="ll-topbar__userchip"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu — ${email || name}`}
        title={name}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="ll-topbar__avatar">{initials}</span>
        <span className="ll-topbar__uname">{firstName}</span>
        <svg
          className="ll-topbar__caret"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="ll-topbar__menu" role="menu">
          <Link
            className="ll-topbar__menu-item"
            href={`${adminRoute}/account`}
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M5 19c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span>Account</span>
          </Link>
          <button type="button" className="ll-topbar__menu-item" role="menuitem" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 4h2.5A1.5 1.5 0 0 1 19 5.5v13a1.5 1.5 0 0 1-1.5 1.5H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M10 8l-4 4 4 4M6 12h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default UserChip
