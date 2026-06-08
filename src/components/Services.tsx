import React from 'react'

interface ServicesProps {
  title: string
  description?: string
  servicesLists: { listTitle: string; listItems: { item: string }[] }[]
}

const CheckIcon = () => (
  <span className="ck" aria-hidden="true">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  </span>
)

const Services: React.FC<ServicesProps> = ({ title, description, servicesLists }) => {
  return (
    <section className="section band--subtle" id="services" aria-labelledby="services-h">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Services</p>
          <h2 className="display-lg" id="services-h">
            {title}
          </h2>
          {description && <p className="body-lg">{description}</p>}
        </div>
        <div className="serv-grid">
          {servicesLists.map((l, index) => (
            <div className={`panel${index % 2 === 1 ? ' panel--feature' : ''}`} key={index}>
              <h3 className="h-lg">{l.listTitle}</h3>
              <ul className="checklist">
                {l.listItems.map((i, idx) => (
                  <li key={idx}>
                    <CheckIcon />
                    {i.item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
