import React from 'react'

interface ContactProps {
  title: string
  description: string
  phone?: string
  fax?: string
  email?: string
  address?: string
}

const Contact: React.FC<ContactProps> = ({ title, description, phone, fax, email, address }) => {
  const telHref = phone ? `tel:+1${phone.replace(/[^0-9]/g, '')}` : undefined

  return (
    <section className="section" id="contact" aria-labelledby="contact-h">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Contact</p>
          <h2 className="display-lg" id="contact-h">
            {title}
          </h2>
          {description && <p className="body-lg">{description}</p>}
        </div>
        <div className="contact-grid">
          {phone && (
            <div className="ccard">
              <div className="ic" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                >
                  <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.25 1z" />
                </svg>
              </div>
              <h3 className="h-sm">Phone</h3>
              <div className="v">
                <a href={telHref}>{phone}</a>
              </div>
            </div>
          )}
          {fax && (
            <div className="ccard">
              <div className="ic" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                >
                  <path d="M7 9V4h10v5" />
                  <rect x="3" y="9" width="18" height="8" rx="1.5" />
                  <rect x="7" y="14" width="10" height="6" />
                </svg>
              </div>
              <h3 className="h-sm">Fax</h3>
              <div className="v">{fax}</div>
            </div>
          )}
          {email && (
            <div className="ccard">
              <div className="ic" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3.5 6.5 12 13l8.5-6.5" />
                </svg>
              </div>
              <h3 className="h-sm">Email</h3>
              <div className="v">
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
          )}
          {address && (
            <div className="ccard">
              <div className="ic" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                >
                  <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <h3 className="h-sm">Where</h3>
              <div className="v">{address}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
