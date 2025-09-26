"use client";
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./PropertyDetails.css";

const PropertyDetails = ({
  configuration,
  land_area,
  features,
  google_map_url,
  location,
  possession,
  specs_cover_image,
}) => {
  const isValidUrl = (url) => {
    return url && (url.startsWith("http://") || url.startsWith("https://"));
  };

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
  return (
    <section
      className="property-details text-change bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Rumah Hutan"
    >
      <div className="property-details-container">
        <div className="left">
          <div
            className="image-container reveal-image reveal-image-active"
            ref={imageRef}
          >
            <Image
              src={
                typeof specs_cover_image === "string"
                  ? specs_cover_image
                  : (specs_cover_image?.src || "/placeholder.jpg")
              }
              alt="Living Room"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="right">
          <div className="property-details-lists fadeup">
            {/* Configuration */}
            {configuration && (
              <div className="property-details-list-item">
                <div className="col">
                  <h3 className="title">Configuration</h3>
                </div>
                <div className="col">
                  <p className="dec">{configuration}</p>
                </div>
              </div>
            )}

            {/* Land Area */}
            {land_area && (
              <div className="property-details-list-item">
                <div className="col">
                  <h3 className="title">LAND AREA</h3>
                </div>
                <div className="col">
                  <p className="dec">{land_area}</p>
                </div>
              </div>
            )}

            {/* Features */}
            {features && (
              <div className="property-details-list-item">
                <div className="col">
                  <h3 className="title">Features</h3>
                </div>
                <div className="col">
                  <p className="dec">{features}</p>
                </div>
              </div>
            )}

            {/* Location */}
            {location && (
              <div className="property-details-list-item">
                <div className="col">
                  <h3 className="title">LOCATION</h3>
                </div>
                <div className="col">
                  <p className="dec">
                    {google_map_url && isValidUrl(google_map_url) ? (
                      <a
                        href={google_map_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {location}
                      </a>
                    ) : (
                      location
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Possession */}
            {possession && (
              <div className="property-details-list-item">
                <div className="col">
                  <h3 className="title">POSSESSION</h3>
                </div>
                <div className="col">
                  <p className="dec">{possession}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
