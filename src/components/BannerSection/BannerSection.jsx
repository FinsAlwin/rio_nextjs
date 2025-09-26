"use client";
import { useEffect, useRef, useState } from "react";
import entireTeam from "../../assets/about_us_founder/entire_team_rio.webp";

const BannerSection = () => {
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
  return (
    <section
      ref={sectionRef}
      className={`banner  bgblack scroll-smooth sticky snap-scroll ${
        isVisible ? "animate__animated animate__zoomIn animate__slower" : ""
      }`}
      data-sidebar-title="Team"
    >
      <div className="banner-wrapper">
        <div className="image-container image-zoom">
          <img src={entireTeam.src || entireTeam} alt="Banner" />
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
