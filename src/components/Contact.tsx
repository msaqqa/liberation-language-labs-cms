import React from "react";

interface ContactProps {
  title: string;
  description: string;
  phone?: string;
  fax?: string;
  email?: string;
  address?: string;
}

const Contact: React.FC<ContactProps> = ({
  title,
  description,
  phone,
  fax,
  email,
  address,
}) => {
  return (
    <section className="contact_section section_space_lg" id="contact">
      <div className="container">
        <div className="section_heading text-center">
          <h2 className="section_heading_text">{title}</h2>
          {description && (
            <p className="section_heading_description">{description}</p>
          )}
        </div>
        <div className="contact_infobox_wrapper row justify-content-center g-4">
          {phone && (
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="contact_info_box">
                <div className="item_icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="item_contact">
                  <h3 className="item_title">Phone</h3>
                  <ul className="info_list unordered_list_block">
                    <li>
                      <span className="info_text">{phone}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {fax && (
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="contact_info_box">
                <div className="item_icon">
                  <i className="fa-solid fa-fax"></i>
                </div>
                <div className="item_contact">
                  <h3 className="item_title">Fax</h3>
                  <ul className="info_list unordered_list_block">
                    <li>
                      <span className="info_text">{fax}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {email && (
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="contact_info_box">
                <div className="item_icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="item_contact">
                  <h3 className="item_title">Email</h3>
                  <ul className="info_list unordered_list_block">
                    <li>
                      <span className="info_text">{email}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {address && (
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="contact_info_box">
                <div className="item_icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="item_contact">
                  <h3 className="item_title">Address</h3>
                  <ul className="info_list unordered_list_block">
                    <li>
                      <span className="info_text">{address}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
