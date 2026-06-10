import Link from 'next/link'
import type { ReactNode } from 'react'

interface CtaLink {
  label: ReactNode
  href: string
}

interface ClosingCtaProps {
  /** Mono-caps eyebrow above the heading */
  eyebrow: string
  /** Heading — defaults to the shared "Let's talk about your family." */
  title?: ReactNode
  /** Supporting paragraph */
  description: ReactNode
  /** Filled primary action (arrow is added automatically). Defaults to "Start a conversation". */
  primary?: CtaLink
  /** Outline secondary action */
  secondary: CtaLink
  /** id used to associate the section with its heading */
  id?: string
}

/**
 * Closing call-to-action band (`.cta-band`) shared across frontend pages
 * (Blog, Principles, …). Self-contained: wraps its own `.ll-root` scope so it
 * can drop into any page, mirroring the Banner component.
 */
export default function ClosingCta({
  eyebrow,
  title = "Let's talk about your family.",
  description,
  primary = { label: 'Start a conversation', href: '/#contact' },
  secondary,
  id = 'cta-h',
}: ClosingCtaProps) {
  return (
    <div className="ll-root">
      <section className="cta-band" aria-labelledby={id}>
        <div className="wrap">
          <div className="inner">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>
              {eyebrow}
            </p>
            <h2 className="display-lg" id={id}>
              {title}
            </h2>
            <p className="body-lg">{description}</p>
            <div className="cta">
              <Link className="btn btn-primary" href={primary.href}>
                {primary.label}{' '}
                <span className="arr" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link className="btn btn-secondary" href={secondary.href}>
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
