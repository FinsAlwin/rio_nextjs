"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";
const CareersFooter = () => {
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
            <Image src="/careers_images/careers-footer.webp" alt="Footer" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="left-footer-bottom">
            <div className="left-col">
              <div className="copy">
                <p>© Copyright RIO 2024</p>
              </div>
            </div>
            {/* <div className="right-col">
              <div className="links">
                <a href="https://www.rioluxuryhomes.in/privacy-policy/">
                  Privacy Policy
                </a>
              </div>
            </div> */}
          </div>
        </div>
        <div className="right">
          <div className="content-container">
            <div className="content">
              <div className="top">
                <div className="title-container">
                  <h3 className="title">NOT EVERYONE MAKES THE CUT</h3>
                </div>
              </div>
              <div className="middle">
                <div className="line"></div>
              </div>
              <div className="bottom">
                <div className="btn-container">
                  <Link
                    href={"/contact-us/"}
                    onClick={scrollToTop}
                    className="btn white"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
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
          <div className="sections-titles">
            <div className="about-us-titles">
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                href="/blog/"
                onClick={scrollToTop}
              >
                <p className="title-new">Blog</p>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                href="/career/"
                onClick={scrollToTop}
              >
                <p className="title-new">Career</p>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                href="/faq/"
                onClick={scrollToTop}
              >
                <p className="title-new">FAQ</p>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                href="/privacy-policy/"
                onClick={scrollToTop}
              >
                <p className="title-new">Privacy Policy</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CareersFooter;
