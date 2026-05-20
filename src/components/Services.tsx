import React from 'react'

interface ServicesProps {
  title: string
  description?: string
  servicesLists: { listTitle: string; listItems: { item: string }[] }[]
}

const Services: React.FC<ServicesProps> = ({ title, description, servicesLists }) => {
  return (
    <section
      className="pricing_section section_space_lg bg_primary_light decoration_wrapper"
      id="services"
    >
      <div className="container">
        <div className="section_heading text-center">
          <h2 className="section_heading_text">{title}</h2>
          {description && <p className="section_heading_description">{description}</p>}
        </div>
        <div className="row justify-content-center g-4">
          {servicesLists.map((l, index) => (
            <div className="col-12 col-md-6" key={index}>
              <div className="pricing_item">
                <h3 className="pricing_heading">{l.listTitle}</h3>
                <ul className="info_list unordered_list_block">
                  {l.listItems.map((i, index) => (
                    <li key={index}>
                      <span className="info_icon">
                        <i className="fa-light fa-circle-check"></i>
                      </span>
                      <span className="info_text">{i.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="decoration_item shape_leaf_1">
        <img
          src="/assets/images/shapes/shape_leaf_right_top.svg"
          alt="Shape Leaf - Liberation Language Labs"
        />
      </div>
      <div className="decoration_item shape_leaf_2">
        <img
          src="/assets/images/shapes/shape_leaf_left_bottom.svg"
          alt="Shape Leaf - Liberation Language Labs"
        />
      </div>
    </section>
  )
}

export default Services
