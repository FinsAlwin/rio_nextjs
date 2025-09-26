import React from "react";
import founderImage from "../../assets/about_us_founder/about_landing_founder_image-CNf9BNcm.webp";
import { RxDoubleArrowDown } from "react-icons/rx";
import "animate.css"; // Import Animate.css styles

function OwnerInfo({ sidebarTitle }) {
  return (
    <section
      id="top"
      className="text-change about-intro-image bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title={sidebarTitle}
    >
      <div className="image-container hero-zoom">
        {/* Add Animate.css classes here */}
        <img
          src={founderImage.src || founderImage}
          alt="Founder"
          className="animate__animated animate__zoomIn animate__slow"
          data-sr-id="7"
        />
      </div>
      <div className="scroll-down-wrapper">
        <div className="scroll-down-container">
          <div className="scroll-down-icon">
            <RxDoubleArrowDown className="animated-arrow" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OwnerInfo;
