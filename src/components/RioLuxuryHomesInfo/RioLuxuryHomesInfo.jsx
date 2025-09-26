"use client";
import { useEffect, useState, useRef } from "react";
import rioHomeImage from "../../assets/about_us_founder/homes_info_image.webp";
import rioHomeImageMobile from "../../assets/about_us_founder/homes_info_image_mobile.webp";
import "./RioLuxuryHomesInfo.css"; // Import your CSS file here

function RioLuxuryHomesInfo({ sidebarTitle }) {
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef(null); // Reference for the image element

  // Update state based on screen size
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
      className="text-change default-height about-intro bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title={sidebarTitle}
    >
      <div className="dual-container dual-container-2">
        <div className="left">
          <div className="content-container fadeup">
            <div className="about-container sb-custom">
              <h2 className="title">ABOUT US</h2>
              <p>At RIO, we craft a future for our clients.</p>
              <p>
                This future is a lifestyle, anchored in exquisite curation and
                innovative craftsmanship. It offers lucrative opportunities in
                appreciating investment, exceeding expectations time after time.
              </p>
              <p>
                This future is a journey of cross-pollination, with global
                architects collaborating to build an elevated vision for our
                homes.
              </p>
              <p>
                This future of RIO's luxury homes is iconic. We leave no stone
                unturned and awaken spaces with a singular intent – to provide a
                level of exceptional service, peerless in design and
                distinction.
              </p>
              <p>
                In this future, our versatile architecture is informed by
                culture, community, and nature. Our work goes beyond building
                villas across Goa; we build legacies across time.
              </p>
              <p>
                The Spirit of RIO is intangible. It is unlike anything you’ve
                ever experienced. Welcome to the future. Singular in design.
                Select in essence.
              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="image reveal-image" ref={imageRef}>
            <img
              src={isMobile ? (rioHomeImageMobile.src || rioHomeImageMobile) : (rioHomeImage.src || rioHomeImage)}
              alt="RIO Luxury Homes"
              className="image-zoom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RioLuxuryHomesInfo;
