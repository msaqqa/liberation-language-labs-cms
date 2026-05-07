import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getMedia } from '@/lib/media'

interface NavLink {
  label: string
  link: string
}

interface HeaderProps {
  logoUrl: { url: string; alt: string } | string | null
  hotline: {
    number: string
    link: string
  }
  navLinks: NavLink[]
}

const Header: React.FC<HeaderProps> = ({ logoUrl, hotline, navLinks }) => {
  const getLogo = getMedia(logoUrl)
  return (
    <header className="site_header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-2 col-5">
            <div className="site_logo">
              <Link className="site_link" href="/">
                <img
                  src={getLogo.url || '/assets/images/site_logo/site_logo_primary.png'}
                  alt={
                    getLogo.alt ||
                    'Site Logo – Liberation Language Labs – Psychotherapist Site Template'
                  }
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-8 col-2">
            <nav className="main_menu navbar navbar-expand-lg">
              <div
                className="main_menu_inner collapse navbar-collapse justify-content-center"
                id="main_menu_dropdown"
              >
                <ul className="main_menu_list unordered_list">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link className="nav-link" href={link.link}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-lg-2 col-5">
            <ul className="header_btns_group unordered_list justify-content-end">
              <li>
                <button
                  className="mobile_menu_btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#main_menu_dropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="far fa-bars"></i>
                </button>
              </li>
              <li>
                <a className="btn_hotline" href={hotline.link}>
                  <span className="btn_icon">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <span className="btn_text">{hotline.number}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
