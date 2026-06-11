import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Page not found — Liberation Language Labs',
  description: "The page you were looking for isn't here — let's get you back on track.",
  path: '/not-found',
  noindex: true,
})

const HELPFUL_LINKS: { label: string; href: string }[] = [
  { label: 'Labs blog', href: '/blog' },
  { label: 'Our principles', href: '/principles' },
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/#pricing' },
]

export default function FrontendNotFoundPage() {
  return (
    <div className="ll-root">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <main id="main">
        <section className="nf" aria-labelledby="nf-h">
          <div className="wrap">
            <div className="nf__inner">
              {/* HUD corner-bracket numeral frame */}
              <div className="nf__frame reveal">
                <span className="br tl" aria-hidden="true"></span>
                <span className="br tr" aria-hidden="true"></span>
                <span className="br bl" aria-hidden="true"></span>
                <span className="br br2" aria-hidden="true"></span>
                <p className="nf__code">
                  4<span className="acc-word">0</span>4
                </p>
              </div>

              <span className="status nf__status reveal d1">
                <span
                  className="dot"
                  aria-hidden="true"
                  style={{ background: 'var(--flight)', boxShadow: '0 0 8px var(--flight)' }}
                ></span>
                Page not found
              </span>

              <h1 className="reveal d1" id="nf-h">
                This page wandered off.
              </h1>
              <p className="reveal d2">
                The link may be old, or the page may have moved. Nothing&apos;s broken on your end —
                let&apos;s get you back to something useful.
              </p>

              <div className="nf__cta reveal d3">
                <Link className="btn btn-primary" href="/">
                  Back to home{' '}
                  <span className="arr" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link className="btn btn-secondary" href="/#contact">
                  Contact the practice
                </Link>
              </div>

              <nav className="nf__links reveal d3" aria-label="Helpful links">
                <p className="h">Try one of these</p>
                <ul>
                  {HELPFUL_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>
                        {item.label}{' '}
                        <span className="arr" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
