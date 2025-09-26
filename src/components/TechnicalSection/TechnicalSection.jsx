"use client";
import { useEffect, useRef, useState } from "react";
import technicalImage from "../../assets/about_us_founder/new_what_we_do.webp";
import "./TechnicalSection.css";
function TechnicalSection({ sidebarTitle }) {
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
    // <section
    //   className="text-change  about-founder bgblack scroll-smooth sticky snap-scroll"
    //   data-sidebar-title={sidebarTitle}
    // >
    //   <div
    //     className="wrapper technical-wrapper
    //   "
    //   >
    //     <div className="dual-container inner-container">
    //       <div className="left">
    //         <div className="image-container reveal-image reveal-image-active image-new-technical">
    //           <img src={technicalImage} alt="Founder" className="" />
    //         </div>
    //       </div>
    //       <div className="right fadeup">
    //         <div className="about-container sb-custom technical-container">
    //           <h2 className="title">WHAT WE DO</h2>
    //           <p>
    //             We believe that living large is in the details. As the only real
    //             estate company in India to collaborate with landscape architects
    //             on every project, we ensure the use of top-quality materials
    //             without compromise. Each property is a masterpiece of refinement
    //             and minimalism. Design, innovation, and craft are at the center
    //             of every project. No two properties look or feel the same.{" "}
    //           </p>
    //           <p>
    //             With over 10 exclusive properties along with a tightly knit &
    //             dynamic team that has grown to be 50+ strong, RIO has achieved
    //             300% growth in revenue over the past two years; this is a
    //             product of the trust our clients place in our craftsmanship and
    //             unwavering service. whether it’s prior to, during, or after the
    //             handover, our ethos is grounded in offering premium living and
    //             exceptional comfort. Driven primarily by referrals, we pride
    //             ourselves on exceptional client satisfaction.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section
      className="text-change default-height about-intro bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title={sidebarTitle}
    >
      <div className="dual-container dual-container-2 dual-container-3">
        <div className="right">
          <div
            // style={{
            //   backgroundImage: `url(${rioHomeImage})`,
            //   backgroundPosition: "center",
            //   height: "100%",
            //   width: "100%",
            //   backgroundRepeat: "no-repeat",
            // }}
            ref={imageRef}
            className="image reveal-image reveal-image-active image-new-technical"
          >
            <img
              src={technicalImage.src || technicalImage}
              alt=""
              className="image-zoom"
            />
          </div>
        </div>
        <div className="left">
          <div className="content-container fadeup">
            <div className="about-container sb-custom technical-container">
              <h2 className="title">WHAT WE DO</h2>
              <p>
                We believe that living large is in the details. As the only real
                estate company in India to collaborate with landscape architects
                on every project, we ensure the use of top-quality materials
                without compromise. Each property is a masterpiece of refinement
                and minimalism. Design, innovation, and craft are at the center
                of every project. No two properties look or feel the same.{" "}
              </p>
              <p>
                With over 10 exclusive properties along with a tightly knit &
                dynamic team that has grown to be 50+ strong, RIO has achieved
                300% growth in revenue over the past two years; this is a
                product of the trust our clients place in our craftsmanship and
                unwavering service. whether it’s prior to, during, or after the
                handover, our ethos is grounded in offering premium living and
                exceptional comfort. Driven primarily by referrals, we pride
                ourselves on exceptional client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechnicalSection;
