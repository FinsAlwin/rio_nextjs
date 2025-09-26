"use client";
import Link from "next/link";
import investImg1 from "../../assets/invest_page_image/invest_project_single.webp";
import investImg2 from "../../assets/invest_page_image/invest_image_project_2.webp";
import { useEffect, useRef } from "react";
const ProjectSingleSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const imageRef = useRef(null);
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
      className="project-single text-change bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Projects"
    >
      <div className="projects-dual bgwhite">
        <div className="projects-container">
          <div className="left new-project-slider">
            <div className="content-container fadeup">
              <div className="content align-left">
                <h3 className="title uppercase">Step into the Sublime</h3>
                <p className="title uppercase">Rumah Hutan, Goa</p>
                <div className="image-container">
                  <img src={investImg1.src || investImg1} alt="" />
                </div>
                <div className="btn-container verticle">
                  <div className="left-line">
                    <div className="glyph2">
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                    <div className="vline"></div>
                  </div>
                  <Link
                    href={
                      "https://rioluxuryhomes.myzow.in/properties/rumah-hutan-1/"
                    }
                    className="btn"
                    onClick={scrollToTop}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div
              ref={imageRef}
              className="image reveal-image reveal-image-active"
            >
                <img src={investImg2.src || investImg2} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSingleSection;
