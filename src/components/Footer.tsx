import React from 'react'
import Link from 'next/link'
import { getMedia } from '@/lib/media'

export type Media = {
  url?: string | null
  alt?: string
}

interface FooterProps {
  logo: Media | number | null
  navLinks: { label: string; link: string }[]
  copyright: string
  designerText?: string
  designerLink?: string
}

const normalizeHref = (href: string) => (href.startsWith('#') ? `/${href}` : href)

const Footer: React.FC<FooterProps> = ({
  logo,
  navLinks,
  copyright,
  designerText,
  designerLink,
}) => {
  const getLogo = getMedia(logo)

  return (
    <div className="ll-root polarity-dark">
      <footer className="footer">
        <div className="wrap footer__top">
          <div className="footer__brand-col">
            <Link href="/" aria-label="Liberation Language Labs — home">
              <img
                className="footer__logo"
                src={'/assets/images/site_logo/site_logo_white.png'}
                alt={'Liberation Language Labs'}
              />
            </Link>
            <p className="footer__principles-head">Guiding principles</p>
            <p className="footer__statement">
              Grounded in abolitionist, decolonial values, on the traditional lands of the Lummi,
              Nooksack, Nuwaha &amp; Semiahmoo tribes.
            </p>
            <Link className="link footer__principles-link" href="/principles">
              Read the full statement{' '}
              <span className="arr" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <p className="footer__navhead">Links</p>
            <ul className="footer__links">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link href={normalizeHref(link.link)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <p className="footer__navhead">Contact</p>
            <ul className="footer__links">
              <li>
                <a href="tel:+15642433504">(564) 243-3504</a>
              </li>
              <li>
                <a href="mailto:info@liberationlanguagelabs.org">info@liberationlanguagelabs.org</a>
              </li>
              <li>
                <span>Western Whatcom County</span>
              </li>
              <li>
                <span>Telehealth across Washington</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="wrap footer__base">
          <span className="footer__c">{copyright}</span>
          {designerText && (
            <a
              className="footer__credit-link"
              href={designerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website designed by <strong>{designerText}</strong>
            </a>
          )}
        </div>
      </footer>
    </div>
  )
}

export default Footer
