"use client";
import { useEffect, useRef, useState } from "react";
import investImage from "../../assets/invest_page_image/invest_us_main_image.webp";
import "./InvestSection.css";
import { RxDoubleArrowDown } from "react-icons/rx";
const InvestSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef(null);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  useEffect(() => {
    // Create an intersection observer to detect when the image is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-image-active"); // Add active class when in view
        } else {
          entry.target.classList.remove("reveal-image-active"); // Remove active class when out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the image is in view
    );

    if (imageRef.current) {
      observer.observe(imageRef.current); // Start observing the image
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current); // Stop observing the image when component unmounts
      }
    };
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="top"
      className="text-change about-intro new-set bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Invest"
    >
      <div className="dual-container flip-mob dual-invest-section">
        <div className="left">
          <div className="content-container fadeup new-set-content-invest">
            <div className="about-container sb-custom">
              <h2 className="title">WHY INVEST WITH RIO?</h2>
              <p>
                RIO stands out in its comprehensive approach to maximize your
                investment potential. We do this through a three-tiered
                approach. First, every aspect of our properties is analyzed for
                both value and prime location, maximizing the value of your
                property.
              </p>
              <p>
                Second, our expert sales and rental management team handles all
                aspects of leasing and property maintenance, giving you peace of
                mind while securing steady rental income.
              </p>
              <p>
                Third, we believe in the utmost transparency for your returns.
                Explore the data to visualize the impressive ROI of our
                properties.
              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <div
            ref={imageRef}
            className="image reveal-image larg-mobile reveal-image-active"
          >
            <img
              src={investImage.src || investImage}
              alt="Why Invest with RIO"
              className="image-zoom"
            />
            <div className="scroll-down-wrapper scroll-down-wrapper-invest-section">
              <div className="scroll-down-container">
                <div className="scroll-down-icon">
                  <RxDoubleArrowDown className="animated-arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestSection;
