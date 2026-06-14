import type { ReactNode } from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Bespoke Liberation Labs admin dashboard ("Control Center").
 * Replaces Payload's default dashboard via admin.components.views.dashboard.
 * Styling lives in src/app/(payload)/custom.scss (.ll-dash) and adapts to
 * both light and dark themes. Modern line SVG icons (no text chips, no yellow).
 */

type IconName = 'file' | 'image' | 'users' | 'layers' | 'home' | 'heart' | 'layoutTop' | 'layoutBottom' | 'arrowUR'

/* Modern line icons — single stroke, currentColor, matching the design handoff. */
const Icon = ({ name }: { name: IconName }) => {
  const paths: Record<IconName, ReactNode> = {
    file: (
      <>
        <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8z" />
        <path d="M14 3.5V8h4.5" />
        <path d="M9 13h6M9 16.5h6" />
      </>
    ),
    image: (
      <>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.6" />
        <path d="m20 16-4.5-4.5L6 21" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
        <path d="M16 5.3a3.2 3.2 0 0 1 0 6.2M20.5 19.5a5.5 5.5 0 0 0-3.8-5.2" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8z" />
        <path d="m4 12 8 4.3L20 12" />
        <path d="m4 16 8 4.3L20 16" />
      </>
    ),
    home: (
      <>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
        <path d="M9.5 21v-6h5v6" />
      </>
    ),
    heart: <path d="M12 20s-7-4.4-7-9.1A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.9C19 15.6 12 20 12 20z" />,
    layoutTop: (
      <>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
        <path d="M3.5 9.5h17" />
      </>
    ),
    layoutBottom: (
      <>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
        <path d="M3.5 14.5h17" />
      </>
    ),
    arrowUR: (
      <>
        <path d="M7 17 17 7" />
        <path d="M8.5 7H17v8.5" />
      </>
    ),
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

type Stat = { label: string; value: number; href: string; icon: IconName }
type Entry = { title: string; desc: string; href: string; icon: IconName }
type Section = { group: string; desc: string; items: Entry[]; two?: boolean }

const SECTIONS: Section[] = [
  {
    group: 'Pages',
    desc: 'Editable singleton pages that make up the marketing site.',
    two: true,
    items: [
      {
        title: 'Home Page',
        desc: 'Hero, about, services, pricing & contact',
        href: '/admin/globals/home-page',
        icon: 'home',
      },
      {
        title: 'Principles',
        desc: 'Statement, commitment & what we strive for',
        href: '/admin/globals/principles-page',
        icon: 'heart',
      },
    ],
  },
  {
    group: 'Layout',
    desc: 'Global regions shared across every page of the site.',
    two: true,
    items: [
      {
        title: 'Header',
        desc: 'Logo, hotline & navigation links',
        href: '/admin/globals/header',
        icon: 'layoutTop',
      },
      {
        title: 'Footer',
        desc: 'Logo, links & copyright',
        href: '/admin/globals/footer',
        icon: 'layoutBottom',
      },
    ],
  },
  {
    group: 'Collections',
    desc: 'Repeatable content stored as records — browse, filter and edit in the data grid.',
    items: [
      {
        title: 'Blogs',
        desc: 'Articles & posts',
        href: '/admin/collections/blogs',
        icon: 'file',
      },
      {
        title: 'Media',
        desc: 'Image & asset library',
        href: '/admin/collections/media',
        icon: 'image',
      },
      {
        title: 'Users',
        desc: 'Admin accounts',
        href: '/admin/collections/users',
        icon: 'users',
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
    { label: 'Blog Posts', value: blogs, href: '/admin/collections/blogs', icon: 'file' },
    { label: 'Media Assets', value: media, href: '/admin/collections/media', icon: 'image' },
    { label: 'Team Members', value: users, href: '/admin/collections/users', icon: 'users' },
    { label: 'Managed Pages', value: 4, href: '/admin/globals/home-page', icon: 'layers' },
  ]

  return (
    <div className="ll-dash">
      <header className="ll-dash__head">
        <h1 className="ll-dash__title">
          Control <span>Center</span>
        </h1>
        <p className="ll-dash__sub">
          One console for the whole site — pages, layout, the blog and every media asset. Pick a
          surface to begin.
        </p>
      </header>

      <section className="ll-dash__stats" aria-label="Content statistics">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="ll-dash__stat">
            <span className="ll-dash__stat-icon">
              <Icon name={stat.icon} />
            </span>
            <span className="ll-dash__stat-value">{stat.value}</span>
            <span className="ll-dash__stat-label">{stat.label}</span>
          </Link>
        ))}
      </section>

      {SECTIONS.map((section) => (
        <section key={section.group} className="ll-dash__section" aria-label={section.group}>
          <div className="ll-dash__group-head">
            <span className="ll-dash__group-title">{section.group}</span>
            <span className="ll-dash__group-desc">{section.desc}</span>
          </div>
          <div className={`ll-dash__grid${section.two ? ' ll-dash__grid--two' : ''}`}>
            {section.items.map((item) => (
              <Link key={item.title} href={item.href} className="ll-dash__card">
                <span className="ll-dash__chip">
                  <Icon name={item.icon} />
                </span>
                <span className="ll-dash__card-body">
                  <span className="ll-dash__card-title">{item.title}</span>
                  <span className="ll-dash__card-desc">{item.desc}</span>
                </span>
                <span className="ll-dash__card-arrow">
                  <Icon name="arrowUR" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default Dashboard
