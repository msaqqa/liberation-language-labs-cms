'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

function normalizeTheme(raw: string | null | undefined): 'dark' | 'light' | null {
  if (!raw) return null
  const value = raw
    .trim()
    .replace(/^['\"]|['\"]$/g, '')
    .toLowerCase()
  if (value === 'dark') return 'dark'
  if (value === 'light') return 'light'
  return null
}

function getThemeFromDOM(): 'dark' | 'light' | null {
  const htmlTheme = normalizeTheme(document.documentElement.getAttribute('data-theme'))
  if (htmlTheme) return htmlTheme

  const bodyTheme = normalizeTheme(document.body?.getAttribute('data-theme'))
  if (bodyTheme) return bodyTheme

  return null
}

function resolveTheme(raw: string | null): 'dark' | 'light' {
  const normalized = normalizeTheme(raw)
  if (normalized) return normalized
  // 'auto' or null → follow OS preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function AdminNotFoundPage() {
  const [bsTheme, setBsTheme] = useState<'dark' | 'light'>('light')
  const isDark = bsTheme === 'dark'

  const palette = {
    bg: isDark ? '#1b1b1b' : '#ffffff',
    fg: isDark ? '#f4f4f5' : '#1a1a1a',
    muted: isDark ? '#a1a1aa' : '#6b7280',
    border: isDark ? '#52525b' : '#1a1a1a',
  }

  const buttonBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1.25rem',
    borderRadius: 8,
    fontWeight: 600,
    textDecoration: 'none',
    minHeight: 44,
    border: `1px solid ${palette.border}`,
    transition: 'opacity 0.15s',
  }

  // Outline button (Back to Homepage)
  const homeBtnStyle: React.CSSProperties = {
    ...buttonBase,
    background: 'transparent',
    color: palette.fg,
  }

  // Solid button (Go Back)
  const backBtnStyle: React.CSSProperties = {
    ...buttonBase,
    background: palette.fg,
    color: palette.bg,
  }

  useEffect(() => {
    const syncTheme = () => {
      const domTheme = getThemeFromDOM()
      if (domTheme) {
        setBsTheme(domTheme)
        return
      }

      const raw = localStorage.getItem('payload-theme')
      setBsTheme(resolveTheme(raw))
    }

    syncTheme()

    // Keep in sync if theme changes while this page is open
    const handler = (e: StorageEvent) => {
      if (e.key === 'payload-theme') syncTheme()
    }

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })

    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme', 'class'],
      })
    }

    window.addEventListener('storage', handler)
    window.addEventListener('focus', syncTheme)
    document.addEventListener('visibilitychange', syncTheme)

    return () => {
      observer.disconnect()
      window.removeEventListener('storage', handler)
      window.removeEventListener('focus', syncTheme)
      document.removeEventListener('visibilitychange', syncTheme)
    }
  }, [])

  return (
    <main
      data-theme={bsTheme}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 1rem',
        background: palette.bg,
        color: palette.fg,
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
          fontWeight: 800,
          margin: 0,
          userSelect: 'none',
        }}
      >
        404 | Page Not Found
      </h1>

      <div style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, margin: 0, color: palette.fg }}>
          Sorry, we couldn&apos;t find this page.
        </h2>

        <p
          style={{
            maxWidth: '32rem',
            margin: '1.5rem auto 0',
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: palette.muted,
          }}
        >
          The link you followed might be broken, or the page may have been removed. Let&apos;s get
          you back on track.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            paddingTop: '2rem',
          }}
        >
          <Link href="/admin" style={homeBtnStyle}>
            Back to Homepage
          </Link>

          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.history.back()
            }}
            style={backBtnStyle}
          >
            Go Back
          </Link>
        </div>
      </div>
    </main>
  )
}
