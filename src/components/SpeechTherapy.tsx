import React from "react";

interface TherapyItem {
  title: string;
  description: string;
}

interface SpeechTherapyProps {
  title: string;
  description: string;
  items: TherapyItem[];
}

const SpeechTherapy: React.FC<SpeechTherapyProps> = ({
  title,
  description,
  items,
}) => {
  return (
    <section className="service_section section_space_lg" id="speech_therapy">
      <div className="container">
        <div className="section_heading text-center">
          <h2 className="section_heading_text">{title}</h2>
          {description && (
            <p className="section_heading_description">{description}</p>
          )}
        </div>
        <div className="row justify-content-center g-4">
          {items.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="service_item">
                <div className="item_contact">
                  <h3 className="item_title">{item.title}</h3>
                  <p>{item.description}</p>
                  <input
                    type="checkbox"
                    id={`read-more-toggle-${index}`}
                    className="read-more-input d-none"
                  />
                  <label
                    htmlFor={`read-more-toggle-${index}`}
                    className="read-more-btn"
                  ></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeechTherapy;
