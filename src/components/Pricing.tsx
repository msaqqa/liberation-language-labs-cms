import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

interface PricingProps {
  title: string
  description?: string
  paymentInfo?: any // RichText
}

const Pricing: React.FC<PricingProps> = ({ title, description, paymentInfo }) => {
  return (
    <section className="section" id="pricing_insurance" aria-labelledby="pricing-h">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <p className="eyebrow">Insurance &amp; pricing</p>
            <h2 className="display-lg" id="pricing-h">
              {title}
            </h2>
            {description && <p className="body-lg">{description}</p>}
          </div>
        </div>
        <div className="grid-3">
          <div className="pcard">
            <span className="tag">Superbills</span>
            <h3 className="h-md">Reimbursement through your insurer</h3>
            <p>
              Request a superbill to submit to insurance for reimbursement. Many families are
              reimbursed partially or fully — it depends on your specific plan.
            </p>
          </div>
          <div className="pcard">
            <span className="tag">Out-of-network</span>
            <h3 className="h-md">Licensed with all plans</h3>
            <p>
              Care isn&apos;t gated by network status. You work directly with the practice while
              your plan&apos;s out-of-network benefits do their part.
            </p>
          </div>
          <div className="pcard">
            <span className="tag">Payment</span>
            <h3 className="h-md">Due at time of service</h3>
            <p>
              Payment is collected at each session and can be made by credit card, cash, or check.
            </p>
          </div>
        </div>
        {/* {paymentInfo && typeof paymentInfo === 'object' && (
          <div className="pricing__note">
            <RichText data={paymentInfo} />
          </div>
        )} */}
      </div>
    </section>
  )
}

export default Pricing
