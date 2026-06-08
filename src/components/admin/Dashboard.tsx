import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Bespoke Liberation Labs admin dashboard.
 * Replaces Payload's default dashboard via admin.components.views.dashboard.
 * Styling lives in src/app/(payload)/custom.scss (.ll-dash) and adapts to
 * both light and dark themes.
 */

type Stat = { label: string; value: number; href: string }
type Entry = { title: string; desc: string; href: string; chip: string }
type Section = { group: string; items: Entry[] }

const SECTIONS: Section[] = [
  {
    group: 'Pages',
    items: [
      {
        title: 'Home Page',
        desc: 'Hero, about, services, pricing & contact',
        href: '/admin/globals/home-page',
        chip: 'HM',
      },
      {
        title: 'Principles',
        desc: 'Statement, commitment & what we strive for',
        href: '/admin/globals/principles-page',
        chip: 'PR',
      },
    ],
  },
  {
    group: 'Layout',
    items: [
      {
        title: 'Header',
        desc: 'Logo, hotline & navigation links',
        href: '/admin/globals/header',
        chip: 'HD',
      },
      {
        title: 'Footer',
        desc: 'Logo, links & copyright',
        href: '/admin/globals/footer',
        chip: 'FT',
      },
    ],
  },
  {
    group: 'Collections',
    items: [
      {
        title: 'Blogs',
        desc: 'Articles & posts',
        href: '/admin/collections/blogs',
        chip: 'BL',
      },
      {
        title: 'Media',
        desc: 'Image & asset library',
        href: '/admin/collections/media',
        chip: 'MD',
      },
      {
        title: 'Users',
        desc: 'Admin accounts',
        href: '/admin/collections/users',
        chip: 'US',
      },
    ],
  },
]

const safeCount = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'blogs' | 'media' | 'users',
): Promise<number> => {
  try {
    const { totalDocs } = await payload.count({ collection })
    return totalDocs
  } catch {
    return 0
  }
}

export const Dashboard = async () => {
  const payload = await getPayload({ config: configPromise })

  const [blogs, media, users] = await Promise.all([
    safeCount(payload, 'blogs'),
    safeCount(payload, 'media'),
    safeCount(payload, 'users'),
  ])

  const stats: Stat[] = [
    { label: 'Blog Posts', value: blogs, href: '/admin/collections/blogs' },
    { label: 'Media Assets', value: media, href: '/admin/collections/media' },
    { label: 'Team Members', value: users, href: '/admin/collections/users' },
    { label: 'Managed Pages', value: 4, href: '/admin/globals/home-page' },
  ]

  return (
    <div className="ll-dash">
      <header className="ll-dash__head">
        <span className="ll-dash__eyebrow">Liberation Labs // Content Control</span>
        <h1 className="ll-dash__title">
          Control <span>Center</span>
        </h1>
        <p className="ll-dash__sub">
          Manage every section of the site from one console — pages, layout, blogs and media.
        </p>
      </header>

      <section className="ll-dash__stats" aria-label="Content statistics">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="ll-dash__stat hud-box">
            <span className="br-tl" aria-hidden="true" />
            <span className="br-br" aria-hidden="true" />
            <span className="ll-dash__stat-value">{stat.value}</span>
            <span className="ll-dash__stat-label">{stat.label}</span>
          </Link>
        ))}
      </section>

      {SECTIONS.map((section) => (
        <section key={section.group} className="ll-dash__section" aria-label={section.group}>
          <span className="ll-dash__group-label">{section.group}</span>
          <div className="ll-dash__grid">
            {section.items.map((item) => (
              <Link key={item.title} href={item.href} className="ll-dash__card">
                <span className="ll-dash__chip" aria-hidden="true">
                  {item.chip}
                </span>
                <span className="ll-dash__card-body">
                  <span className="ll-dash__card-title">{item.title}</span>
                  <span className="ll-dash__card-desc">{item.desc}</span>
                </span>
                <span className="ll-dash__card-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <footer className="ll-dash__foot">
        <span>Build 1.0</span>
        <span>·</span>
        <span>Powered by Payload</span>
      </footer>
    </div>
  )
}

export default Dashboard
