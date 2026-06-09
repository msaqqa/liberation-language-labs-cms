import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

interface AboutProps {
  title: string
  subtitle?: string
  description: any // RichText from Payload
  imageUrl: string
}

const About: React.FC<AboutProps> = ({ title, subtitle, description, imageUrl }) => {
  return (
    <section className="section band--subtle" id="about" aria-labelledby="about-h">
      <div className="wrap about__grid">
        <div className="about__media reveal">
          <div className="hud-frame">
            <span className="br br-tl" aria-hidden="true"></span>
            <span className="br br-tr" aria-hidden="true"></span>
            <span className="br br-bl" aria-hidden="true"></span>
            <span className="br br-br" aria-hidden="true"></span>
            <figure className="photo" style={{ margin: 0 }}>
              <img
                src={imageUrl || '/assets/images/about/about_image_1-min.jpeg'}
                alt="Jessica Burchiel, founder and speech-language pathologist."
              />
            </figure>
          </div>
        </div>
        <div className="about__body reveal d1">
          <p className="eyebrow">Welcome to the labs</p>
          <h2 className="display-lg" id="about-h">
            {title}
          </h2>
          <p className="about__lead">
            {subtitle || 'Communication, treated as an experiment worth running together.'}
          </p>
          {description && typeof description === 'object' && (
            <div className="about__prose">
              <RichText data={description} />
            </div>
          )}
          <p className="about__sig">Jessica Burchiel · M.A., CCC-SLP · she/her</p>
        </div>
      </div>
    </section>
  )
}

export default About
