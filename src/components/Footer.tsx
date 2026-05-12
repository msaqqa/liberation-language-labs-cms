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

const Footer: React.FC<FooterProps> = ({
  logo,
  navLinks,
  copyright,
  designerText,
  designerLink,
}) => {
  const getLogo = getMedia(logo)
  return (
    <footer className="site_footer bg_primary">
      <div className="container">
        <div className="site_footer_content">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="site_logo">
                <Link className="site_link" href="/">
                  <img
                    src={getLogo.url || '/assets/images/site_logo/site_logo_white.webp'}
                    alt={
                      getLogo.alt ||
                      'Site Logo – Liberation Language Labs – Psychotherapist Site Template'
                    }
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-9">
              <ul className="info_list unordered_list justify-content-center row g-3">
                {navLinks.map((link, index) => (
                  <li key={index} className="col-auto col-lg-4">
                    <Link href={link.link}>
                      <span className="info_icon">
                        <i className="fa-solid fa-circle"></i>
                      </span>
                      <span className="info_text">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright_widget text-center">
          <p className="copyright_text">
            {copyright} | <Link href="/principles">Guiding Principles</Link>
          </p>
          {designerText && (
            <p className="copyright_text m-0">
              Website designed by
              <a href={designerLink} target="_blank" rel="noopener noreferrer">
                {designerText}
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
