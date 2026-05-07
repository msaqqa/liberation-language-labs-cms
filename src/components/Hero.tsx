import React from 'react'

interface HeroProps {
  title: string
  backgroundImageUrl: string
}

const Hero: React.FC<HeroProps> = ({ title, backgroundImageUrl }) => {
  return (
    <section className="hero_section decoration_wrapper" id="home">
      <div className="hero_content_wrap">
        <img
          className="hero_bg_img"
          src={backgroundImageUrl || "/assets/images/hero/hero.png"}
          alt="Speech therapy that affirms"
        />
        <div className="hero_text_overlay">
          <h1 className="heading_text">{title}</h1>
        </div>
      </div>
    </section>
  )
}

export default Hero
