"use client";
import { useState, useEffect, useRef } from "react";
import cardImage1 from "../../assets/homepage_images/card_image_1.webp";
import cardImage2 from "../../assets/homepage_images/card_image_2.webp";
import cardImage3 from "../../assets/homepage_images/card_image_3.webp";
import cardImage4 from "../../assets/homepage_images/card_image_4.webp";
import mobileCardImage1 from "../../assets/homepage_images/card_image_mobile_1.webp";
import mobileCardImage2 from "../../assets/homepage_images/card_image_mobile_2.webp";
import mobileCardImage3 from "../../assets/homepage_images/card_image_mobile_3.webp";
import mobileCardImage4 from "../../assets/homepage_images/card_image_mobile_4.webp";
import "./Features.css";

function Features() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
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
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = isMobile
    ? [mobileCardImage1, mobileCardImage2, mobileCardImage3, mobileCardImage4]
    : [cardImage1, cardImage3, cardImage2, cardImage4];

  return (
    <section
      ref={sectionRef}
      className="text-change project-features bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Features"
    >
      <div className="wrapper">
        <div className="inner-container">
          <div className="title-container">
            <h2 className="title">Living Large is in the Details</h2>
          </div>
          <div className="features-container">
            <div
              className={`col zoomin ${
                isVisible
                  ? "animate__animated animate__zoomIn animate__slower"
                  : ""
              }`}
            >
              <div className="image-container">
                <img src={images[0].src || images[0]} alt="Architecture" />
              </div>
              <div className="title-container">
                <h4 className="title">Architecture</h4>
                <div className="desc sb-custom">
                  <p className="description-features">
                    Discover the world of RIO – where each space celebrates the
                    harmonious synthesis of design, style, and legacy. We make
                    landmarks not homes.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`col zoomin ${
                isVisible
                  ? "animate__animated animate__zoomIn animate__slower"
                  : ""
              }`}
            >
              <div className="image-container">
                <img src={images[1].src || images[1]} alt="Guarantee & Warranty" />
              </div>
              <div className="title-container">
                <h4 className="title">Guarantee & Warranty</h4>
                <div className="desc sb-custom">
                  <p className="description-features">
                    Best quality, on time delivery, best locations, clear title
                    properties, 8% appreciation p.a, 6-8% ROI p.a
                  </p>
                  <p>Warranty as per RERA</p>
                </div>
              </div>
            </div>
            <div
              className={`col zoomin ${
                isVisible
                  ? "animate__animated animate__zoomIn animate__slower"
                  : ""
              }`}
            >
              <div className="image-container">
                <img src={images[2].src || images[2]} alt="Housekeeping" />
              </div>
              <div className="title-container">
                <h4 className="title">Housekeeping</h4>
                <div className="desc sb-custom">
                  <p className="description-features">
                    Our team epitomizes the Spirit of RIO. Their diligence and
                    excellence lay the foundation for our exceptional service.
                    Most of these individuals have been with us since the
                    inception of RIO. They truly care, and that continues to
                    inspire us to go above and beyond.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`col zoomin ${
                isVisible
                  ? "animate__animated animate__zoomIn animate__slower"
                  : ""
              }`}
            >
              <div className="image-container">
                <img src={images[3].src || images[3]} alt="Rental Management" />
              </div>
              <div className="title-container">
                <h4 className="title">Rental Management</h4>
                <div className="desc sb-custom">
                  <p className="description-features">
                    We manage your property, you reap the profits. RIO handles
                    everything – marketing, booking, guest communication, and
                    maintenance. Entrust your property to us and enjoy high
                    rental yields. Build your legacy, one investment at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
