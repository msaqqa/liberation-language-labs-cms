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
    <section className="about_section section_space_lg bg_primary_light" id="about">
      <div className="container">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 order-lg-last">
            <div className="image_widget">
              <img
                src={imageUrl || '/assets/images/about/about_image_1-min.jpeg'}
                alt="About Image - Liberation Language Labs – Psychotherapist Site Template"
              />
              <div className="image_shape bg_primary_light"></div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about_content">
              <div className="section_heading mb-4">
                <h2 className="section_heading_text">
                  <mark>{title}</mark>
                  {subtitle && (
                    <>
                      <br />
                      {subtitle}
                    </>
                  )}
                </h2>
                {description && typeof description === 'object' && (
                  <div className="section_heading_description">
                    <RichText data={description} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
