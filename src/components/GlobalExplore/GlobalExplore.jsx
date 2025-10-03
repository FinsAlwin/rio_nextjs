"use client";
import "./GlobalExplore.css";
import desktopView1 from "../../assets/homepage_images/new_images/desktop_view_1.webp";
import mobileView1 from "../../assets/homepage_images/new_images/mobile_view_1.webp";
import { useState, useEffect } from "react";

function GlobalExplore() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 500);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const image = isMobile ? mobileView1 : desktopView1;
  const title = "Step Into the Future of Global Luxury Living";

  return (
    <section
      className="text-change intro-image flip-mob bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Global"
    >
      <div className="intro-image-container intro-image-container-2">
        <div
          className="image-container image-zoom image-container-global-explore"
          style={{
            backgroundImage: `url(${image.src || image})`,
          }}
        ></div>
      </div>
      <div className="intro-image-footer intro-section-titles">
        <div className="wrapper">
          <div className="inner-container">
            <div className="left left-title-global-explore">
              {title}
            </div>
            <div className="center"></div>
            <div className="right">
              <button className="btn">
                Explore Global
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GlobalExplore;

