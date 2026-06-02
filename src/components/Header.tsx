import Link from 'next/link'
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
  // const [isSticky, setIsSticky] = useState(false)
  const getLogo = getMedia(logo)

  // useEffect(() => {
  //   const syncStickyState = () => {
  //     setIsSticky(window.scrollY > 0)
  //   }

  //   syncStickyState()
  //   window.addEventListener('scroll', syncStickyState)
  //   window.addEventListener('pageshow', syncStickyState)

  //   return () => {
  //     window.removeEventListener('scroll', syncStickyState)
  //     window.removeEventListener('pageshow', syncStickyState)
  //   }
  // }, [])

  return (
    <header className="site_header">
      <div className="container">
        <div className="d-flex align-items-center gap-4">
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
          <div className="flex-grow-1">
            <nav className="main_menu navbar navbar-expand-lg">
              <div
                className="main_menu_inner collapse navbar-collapse justify-content-center"
                id="main_menu_dropdown"
              >
                <ul className="main_menu_list unordered_list">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link className="nav-link" href={normalizeNavHref(link.link)}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
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
    </header>
  )
}

export default Header
