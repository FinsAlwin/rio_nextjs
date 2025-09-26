"use client";
// /* eslint-disable react/prop-types */

import "./SectionSlick1.css";
import leftImage from "../../assets/homepage_images/new_image_have_what.webp";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

function SectionSlick1() {
  const imageRef = useRef(null);
  const post_content = `
  Over 10 exclusive properties across Goa<br />
  Global architecture, contemporary aesthetic<br />
  Exceptional investment opportunities<br /><br />

  A feeling so instinctive, so rare<br />
  A feeling invisible to the ordinary<br />
  A feeling you can't put into words<br /><br />

 <strong> The Address becomes the Landmark.</strong>
`;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <section className="projects-section" data-sidebar-title="Properties">
      <div className="projects-dual flip bgblack project-slick-explore">
        <div className="projects-container">
          <div className="left">
            <div className="content-container">
              <div className="content content-section-slick">
                <h2 className="title uppercase">Have what no one has</h2>

                <div className="sb-custom ">
                  <div
                    className="have-no-what-one-has-2"
                    dangerouslySetInnerHTML={{ __html: post_content }}
                  />
                </div>
                <div className="btn-container center">
                  <Link
                    href={"/properties/"}
                    className="btn white"
                    onClick={scrollToTop}
                  >
                    Explore Our Properties
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div
              className="image reveal-image reveal-image-active"
              ref={imageRef}
              // style={{
              //   backgroundImage: `url(${leftImage})`,
              //   backgroundPosition: "center right",
              //   backgroundSize: "70%",
              //   height: "100%",
              //   width: "100%",
              //   backgroundRepeat: "no-repeat",
              // }}
            >
              <Image className="image-zoom" src={leftImage} alt="Hills Estate" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionSlick1;
