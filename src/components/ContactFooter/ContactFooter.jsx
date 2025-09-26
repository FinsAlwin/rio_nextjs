"use client";
import investFooter from "../../assets/invest_page_image/Invest.webp";
import { useEffect, useRef } from "react";
import LocationDetails from "../LocationDetails/LocationDetails";
const ContactFooter = () => {
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
    <footer
      className="text-change bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Footer"
    >
      <div className="footer-container" data-sidebar-title="Footer">
        <div className="left">
          <div
            ref={imageRef}
            className="image-container reveal-image reveal-image-active"
          >
            <img src={investFooter.src || investFooter} alt="Footer" />
          </div>
          <div className="left-footer-bottom">
            <div className="left-col">
              <div className="copy">
                <p>@Copyright RIO 2024</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right container-footer-contact">
          <div className="content-container">
            {/* <div className="location-details">
             
              <div className="location-block">
                <h3 className="location-title">RIO, Goa</h3>
                <p className="location-address">
                  Address - Aldeia Serenia, Block C, Bounta Vaddo, Mapusa Anjuna
                  Main Road, Assagao, Goa - 403507
                </p>
                <p className="email-contact-us">
                  <a
                    href="mailto:sales@rioluxuryhomes.in"
                    className="email-link"
                  >
                    sales@rioluxuryhomes.in
                  </a>
                </p>
                <p className="phone-link">
                  <a href="tel:+918888900073">+91 88889 00073</a>
                </p>
              </div>

              <div className="location-block">
                <h3 className="location-title">RIO, Phuket</h3>
                <p className="location-address">
                  Address: 5/50 The Plaza Surin, Unit G6 Moo 3, Cherngtalay
                  Sub-district, Thalang District, Phuket 83110
                </p>
                <p className="email-contact-us">
                  <a href="mailto:info@riophuket.com" className="email-link">
                    info@riophuket.com
                  </a>
                </p>
                <p className="phone-link">
                  <a href="tel:+66855759222">+66 85575 9222</a>
                </p>
              </div>

    
              <div className="location-block">
                <h3 className="location-title">RIO, Dubai</h3>
                <p className="location-address">
                  Address: 2105-2107, Bay View Tower, Marasi Drive, Above Mist
                  Cafe / Opp. U-Bora Tower, Business Bay, Dubai, UAE
                </p>
                <p className="email-contact-us">
                  <a href="mailto:info@riodubai.co" className="email-link">
                    info@riodubai.co
                  </a>
                </p>
              </div>
            </div> */}
            <LocationDetails />
          </div>
          <div className="right-footer-bottom">
            <div className="touch">
              <p className="title-new-follow">Follow us on</p>
              <div className="icon">
                <a
                  href="https://www.facebook.com/rioluxuryhomes/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  href="https://www.youtube.com/@rioluxuryhomes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a
                  href="https://www.instagram.com/rioluxuryhomesgoa/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="https://wa.me/918888900073/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
