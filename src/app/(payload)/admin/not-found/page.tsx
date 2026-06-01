'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

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

  const htmlBsTheme = normalizeTheme(document.documentElement.getAttribute('data-bs-theme'))
  if (htmlBsTheme) return htmlBsTheme

  const bodyTheme = normalizeTheme(document.body?.getAttribute('data-theme'))
  if (bodyTheme) return bodyTheme

  const bodyBsTheme = normalizeTheme(document.body?.getAttribute('data-bs-theme'))
  if (bodyBsTheme) return bodyBsTheme

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
  const homeBtnClass = bsTheme === 'dark' ? 'btn btn-outline-light p-2' : 'btn btn-outline-dark p-2'
  const backBtnClass = bsTheme === 'dark' ? 'btn btn-light p-2' : 'btn btn-dark p-2'

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
      attributeFilter: ['data-theme', 'data-bs-theme', 'class'],
    })

    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme', 'data-bs-theme', 'class'],
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
      data-bs-theme={bsTheme}
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-body px-3 text-center"
    >
      <div className="position-relative d-flex flex-column align-items-center justify-content-center">
        <h1 className="display-2 fw-bold text-body-emphasis user-select-none mb-0">
          404 | Page Not Found
        </h1>
      </div>

      <div className="mt-4 mt-sm-5">
        <h2 className="h1 fw-bold text-body">Sorry, we couldn't find this page.</h2>

        <p className="mx-auto mt-4 mb-0 text-secondary fs-5" style={{ maxWidth: '32rem' }}>
          The link you followed might be broken, or the page may have been removed. Let&apos;s get
          you back on track.
        </p>

        <div className="d-flex flex-column flex-md-row justify-content-center gap-md-4 pt-4">
          <Link href="/admin" className={homeBtnClass}>
            Back to Homepage
          </Link>

          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.history.back()
            }}
            className={backBtnClass}
          >
            Go Back
          </Link>
        </div>
      </div>
    </main>
  )
}
