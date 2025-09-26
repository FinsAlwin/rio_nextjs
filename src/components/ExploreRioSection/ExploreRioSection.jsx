import React from "react";

const ExploreRioSection = () => {
  return (
    <section
      className="text-change cta full-height bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Explore"
    >
      <div className="cta-container">
        <div className="image-container reveal-image reveal-image-active">
          <img
            src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2024/02/properties-explore.jpg"
            alt="Explore Rio"
          />
        </div>
        <div className="cta-content-container center">
          <div className="content black-text">
            <div className="top">
              <div className="title-container">
                <h3 className="title">EXPLORE RIO</h3>
              </div>
            </div>
            <div className="middle">
              <div className="line"></div>
            </div>
            <div className="bottom">
              <div className="btn-container">
                <a
                  href="https://www.rioluxuryhomes.in/contact-us/"
                  className="btn"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreRioSection;
