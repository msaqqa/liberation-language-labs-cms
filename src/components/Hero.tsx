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
  const getBackgroundImage = getMedia(backgroundImage)
  return (
    <section className="hero_section decoration_wrapper" id="home">
      <div className="hero_content_wrap">
        <img
          className="hero_bg_img"
          src={getBackgroundImage.url || '/assets/images/hero/hero.png'}
          alt={getBackgroundImage.alt || 'Speech therapy that affirms'}
        />
        <div className="hero_text_overlay">
          <h1 className="heading_text">{title}</h1>
        </div>
      </div>
    </section>
  )
}

export default Hero
