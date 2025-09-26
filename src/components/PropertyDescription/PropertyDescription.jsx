"use client";
import React, { useEffect, useRef, useState } from "react";

const PropertyDescription = ({
  property_name,
  property_brief,
  property_brief_cover_img,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef(null);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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
  if (!property_brief) {
    return null;
  }
  return (
    <section
      className="property-description new-property-desc text-change bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Rumah Hutan"
    >
      <div className="dual-container">
        <div className="left">
          <div className="content-container fadeup new-left-content-property">
            <div className="property-description-container sb-custom">
              <h2 className="title">{property_name}</h2>
              <p>{property_brief}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <div
            className="image reveal-image reveal-image-active"
            ref={imageRef}
          >
            <img
              src={
                typeof property_brief_cover_img === "string"
                  ? property_brief_cover_img
                  : (property_brief_cover_img?.src || "/placeholder.jpg")
              }
              alt="Aerial view of Rumah Hutan"
              className="image-zoom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDescription;
