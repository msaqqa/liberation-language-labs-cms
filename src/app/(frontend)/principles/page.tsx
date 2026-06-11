import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Banner from '@/components/Banner'
import ClosingCta from '@/components/ClosingCta'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Our Principles — Liberation Language Labs',
  description:
    'The guiding principles behind the practice — neurodiversity-affirming, access-first, child-led, family-centered, grounded in abolitionist and decolonial values.',
  path: '/principles',
})

const PRINCIPLES: { no: string; title: string; body: ReactNode }[] = [
  {
    no: '01',
    title: 'Every person communicates.',
    body: (
      <>
        A reach, a glance, a sound repeated until someone notices — these aren&apos;t precursors to
        communication, they <em>are</em> communication. We assume intent and respond to it.
      </>
    ),
  },
  {
    no: '02',
    title: 'Access is a right, not a reward.',
    body: (
      <>
        Robust communication — spoken, AAC, signs, gestures — is never gated behind prerequisites or
        earned through compliance. The tools come first; competence grows through use.
      </>
    ),
  },
  {
    no: '03',
    title: 'We presume competence.',
    body: (
      <>
        We assume every client understands more than they can yet express, and we build from there —
        with respect, not with low expectations dressed up as care.
      </>
    ),
  },
  {
    no: '04',
    title: 'Neurodivergence is difference, not deficit.',
    body: (
      <>
        We don&apos;t work to make children look less autistic or less ADHD. We scaffold skills,
        honor regulation, and protect the joy that makes communication worth it.
      </>
    ),
  },
  {
    no: '05',
    title: 'Families are partners.',
    body: (
      <>
        The most powerful therapy happens in everyday moments between a child and the people who
        love them. We coach, we follow your lead, and we never talk over you.
      </>
    ),
  },
  {
    no: '06',
    title: 'Calm is a clinical choice.',
    body: (
      <>
        Low-stimulation spaces, predictable rhythms, and unhurried sessions aren&apos;t extras —
        they&apos;re the conditions under which trust, and language, actually grow.
      </>
    ),
  },
]

const TRIBES = ['Lummi', 'Nooksack', 'Nuwhaha', 'Semiahmoo']

export default function PrinciplesPage() {
  return (
    <div className="ll-root">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <main id="main">
        {/* Page header */}
        <Banner
          id="pr-h"
          crumb="Principles"
          title={
            <>
              What we <span className="acc-word">stand on</span>.
            </>
          }
          description="A short set of commitments that shape every evaluation, every session, and every conversation with a family."
        />

        {/* Principles */}
        <section className="section" aria-label="Guiding principles">
          <div className="wrap">
            <div className="pgrid">
              {PRINCIPLES.map((principle) => (
                <article className="principle reveal" key={principle.no}>
                  <p className="principle__no">{principle.no}</p>
                  <h2>{principle.title}</h2>
                  <p>{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Land acknowledgment / full statement — cinematic dark moment */}
        <div className="ll-root polarity-dark">
          <section className="statement" aria-labelledby="st-h">
            <span className="glow a" aria-hidden="true"></span>
            <span className="glow b" aria-hidden="true"></span>
            <div className="wrap">
              <div className="inner">
                <p className="eyebrow">The ground beneath the work</p>
                <h2 id="st-h">Grounded in abolitionist, decolonial values.</h2>
                <p>
                  This practice operates on the traditional, ancestral, and unceded lands of Coast
                  Salish peoples — past, present, and future. We name this not as a formality, but
                  as a commitment: to centering self-determination, to questioning systems that
                  pathologize difference, and to building a practice that gives power back to the
                  families and communities it serves.
                </p>
                <div className="tribes">
                  {TRIBES.map((tribe) => (
                    <span className="tribe" key={tribe}>
                      {tribe}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Closing CTA */}
        <ClosingCta
          eyebrow="Curious if we're a fit?"
          description="If these commitments resonate, that's exactly the conversation we love to start — no wrong question, no pressure."
          secondary={{ label: 'Read the blog', href: '/blog' }}
        />
      </main>
    </div>
  )
}
