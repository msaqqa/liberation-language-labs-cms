import { getMedia } from '@/lib/media'
import React from 'react'

export type Media = {
  url: string
  alt: string
}

interface HeroProps {
  title: string
  backgroundImage: Media | number | null
}

const Hero: React.FC<HeroProps> = ({ title, backgroundImage }) => {
  const heroImage = getMedia(backgroundImage)

  return (
    <section className="hero" id="home" aria-labelledby="hero-h">
      <img
        className="hero__bg"
        src={heroImage.url || '/assets/images/hero/hero.png'}
        alt={
          heroImage.alt ||
          'Two pairs of hands, adult and child, cradling soil and a young green seedling.'
        }
        fetchPriority="high"
      />
      <span className="hero__scrim" aria-hidden="true"></span>
      <div className="wrap hero__inner">
        <div className="hero__content">
          <p className="eyebrow reveal">Whatcom County &amp; WA telehealth</p>
          <h1 className="display-hero reveal d1" id="hero-h">
            {title}
          </h1>
          <p className="hero__sub reveal d2">
            Neurodiversity-affirming, collaborative speech-language care — built around what each
            client wants, needs, and feels.
          </p>
          <div className="hero__cta reveal d3">
            <a className="btn btn-primary" href="#speech_therapy">
              How therapy works{' '}
              <span className="arr" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
