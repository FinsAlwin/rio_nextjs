"use client";
import React, { useEffect, useState } from "react";
import "./FounderSection.css";
import founderImage from "../../assets/about_us_founder/founder_image.webp";
import { useRef } from "react";

const FounderSection = ({ sidebarTitle }) => {
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef(null);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // You can adjust the breakpoint as needed
  };

  useEffect(() => {
    handleResize(); // Check size on mount
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);
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
      { threshold: 0.25 } // Trigger when 50% of the image is in view
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

  return (
    <section
      className="text-change about-founder founder-height bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title={sidebarTitle}
    >
      <div className="wrapper founder-wrapper">
        <div className="inner-container">
          {isMobile ? (
            <>
              <div className="left">
                <div
                  ref={imageRef}
                  className="image-container reveal-image reveal-image-active"
                >
                  <img src={founderImage.src || founderImage} alt="Founder" className="" />
                </div>
              </div>
              <div className="right fadeup">
                <div className="top">
                  <h2 className="name">RIYAZ SOMANI</h2>
                </div>
                <div className="middle">
                  <div className="who-container">
                    <div className="col">
                      <h3 className="title">Founder</h3>
                    </div>
                    <div className="col middle">
                      <div className="line"></div>
                    </div>
                    <div className="col">
                      <h3 className="title">Visionary</h3>
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="content-sec">
                    <p>
                      RIO has risen to become a premium real estate firm
                      specialising in exclusive high-end properties in Goa,
                      India.
                    </p>
                    <p>
                      Under the leadership of Mr Riyaz Somani, RIO continues to
                      raise the bar for luxury real estate with its
                      uncompromisingly singular select approach to service,
                      attention to detail and exceptional locations.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="right fadeup">
                <div className="top">
                  <h2 className="name">RIYAZ SOMANI</h2>
                </div>
                <div className="middle">
                  <div className="who-container">
                    <div className="col">
                      <h3 className="title">Founder</h3>
                    </div>
                    <div className="col middle">
                      <div className="line"></div>
                    </div>
                    <div className="col">
                      <h3 className="title">Visionary</h3>
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="content-sec">
                    <p>
                      RIO has risen to become a premium real estate firm
                      specialising in exclusive high-end properties in Goa,
                      India.
                    </p>
                    <p>
                      Under the leadership of Mr Riyaz Somani, RIO continues to
                      raise the bar for luxury real estate with its
                      uncompromisingly singular select approach to service,
                      attention to detail and exceptional locations.
                    </p>
                  </div>
                </div>
              </div>
              <div className="left">
                <div
                  ref={imageRef}
                  className="image image-container reveal-image reveal-image-active"
                >
                  <img
                    src={founderImage.src || founderImage}
                    alt="Founder"
                    className=""
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
