import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

interface PricingProps {
  title: string
  description?: string
  paymentInfo?: any // RichText
}

const Pricing: React.FC<PricingProps> = ({ title, description, paymentInfo }) => {
  return (
    <section className="service_section section_space_lg" id="pricing_insurance">
      <div className="container">
        <div className="section_heading text-center mb-4">
          <div className="office_hour_list bg_primary_light">
            <h2 className="section_heading_text">{title}</h2>
            {description && <p className="section_heading_description mb-4">{description}</p>}
            {paymentInfo && typeof paymentInfo === 'object' && (
              <div className="text-md mb-0 fs-6 lh-md lh-md-lg">
                <RichText data={paymentInfo} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing
