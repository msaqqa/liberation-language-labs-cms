'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getMedia } from '@/lib/media'

interface NavLink {
  label: string
  link: string
}

export type Media = {
  url?: string | null
  alt?: string
}

interface HeaderProps {
  logo: Media | number | null
  hotline: {
    number: string
    link: string
  }
  navLinks: NavLink[]
}

const normalizeNavHref = (href: string) => {
  // Ensure section links from CMS always target sections on the home page.
  if (href.startsWith('#')) {
    return `/${href}`
  }

  return href
}

const Header: React.FC<HeaderProps> = ({ logo, hotline, navLinks }) => {
  const getLogo = getMedia(logo)
  const [open, setOpen] = useState(false)

  return (
    <header className="ll-root site-nav">
      <nav className="nav__inner" aria-label="Primary">
        <Link className="nav__logo" href="/" aria-label="Liberation Language Labs — home">
          <img
            src={getLogo.url || '/assets/images/site_logo/site_logo_primary.png'}
            alt={getLogo.alt || 'Liberation Language Labs'}
          />
        </Link>

        <ul className={`nav__links${open ? ' open' : ''}`} id="navlinks">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link href={normalizeNavHref(link.link)} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {hotline?.number && (
          <a className="nav__phone" href={hotline.link}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.25 1z" />
            </svg>
            {hotline.number}
          </a>
        )}

        <button
          className="burger"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="navlinks"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </nav>
    </header>
  )
}

export default Header
