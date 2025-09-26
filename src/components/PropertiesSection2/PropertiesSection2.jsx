"use client";
import { useEffect, useRef, useState } from "react";
import "./PropertiesSection2.css";
import "animate.css";
const PropertiesSection2 = ({ property_tagline_1_img, property_tagline_1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  if (!property_tagline_1) {
    return null;
  }

  return (
    <section
      id="anchor-down"
      ref={sectionRef}
      className={`text-change intro-image bgblack scroll-smooth sticky snap-scroll  ${
        isVisible ? "animate__animated animate__zoomIn animate__slow" : ""
      }`}
      data-sidebar-title=""
    >
      <div className="intro-image-container properties-content-image">
        <div className="image-container image-zoom image reveal-image reveal-image-active">
          <img src={property_tagline_1_img.src || property_tagline_1_img} alt="Rumah Hutan Facade" />
        </div>
      </div>
      <div className="intro-image-footer withline bgblack">
        <div className="wrapper">
          <div className="inner-container">
            <div className="left zoomout">
              <h3 className="title">{property_tagline_1}</h3>
            </div>
            <div className="center m-hide"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection2;
