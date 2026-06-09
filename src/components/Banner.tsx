import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'

export interface Crumb {
  label: string
  /** When omitted, the item renders as the current (non-link) page */
  href?: string
}

interface BannerProps {
  /**
   * Breadcrumb trail shown after the implicit "Home" link.
   * A plain string is shorthand for a single current-page label.
   */
  crumb: string | Crumb[]
  /** Heading content — may include <span className="acc-word"> for the accent word */
  title: ReactNode
  /** Optional subtitle paragraph */
  description?: string
  /** id used to associate the section with its heading */
  id?: string
}

export default function Banner({ crumb, title, description, id = 'page-banner-h' }: BannerProps) {
  const trail: Crumb[] = typeof crumb === 'string' ? [{ label: crumb }] : crumb

  return (
    <div className="ll-root">
      <section className="section band--subtle pagehead" aria-labelledby={id}>
        <div className="wrap">
          <p className="crumb reveal">
            <Link href="/">Home</Link>
            {trail.map((item, index) => (
              <Fragment key={index}>
                <span className="sep" aria-hidden="true">
                  /
                </span>
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span className="here">{item.label}</span>
                )}
              </Fragment>
            ))}
          </p>
          <h1 className="display-lg reveal d1" id={id}>
            {title}
          </h1>
          {description && <p className="body-lg reveal d2">{description}</p>}
        </div>
      </section>
    </div>
  )
}
