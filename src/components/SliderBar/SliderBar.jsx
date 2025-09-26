"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

function SliderBar({ sidebarTitle, backgroundType }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [glyphClass, setGlyphClass] = useState("");
  const [menuIconClass, setMenuIconClass] = useState("");
  const [currentSectionTitle, setCurrentSectionTitle] = useState("");
  const sidebarRef = useRef(null); // Create ref for sidebar

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setGlyphClass(backgroundType === "bgwhite" ? "dark-v" : "");
    setMenuIconClass(backgroundType === "bgwhite" ? "dark-v" : "");
  }, [backgroundType]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-logo-type]");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const logoType = entry.target.getAttribute("data-logo-type");
          const sidebarTitle = entry.target.getAttribute("data-sidebar-title");
          setCurrentSectionTitle(sidebarTitle);
          const isDarkVSection = logoType === "logo-dark-v";
          setGlyphClass(isDarkVSection ? "dark-v" : "");
          setMenuIconClass(isDarkVSection ? "dark-v" : "");
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current && // Sidebar is defined
        !sidebarRef.current.contains(event.target) && // Click is outside sidebar
        !event.target.closest("a") // Click is not on a link inside sidebar
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`sidebar ${isMenuOpen ? "nav-active" : ""}`}
      >
        <div className="sidebar-container">
          <div className="top">
            <div
              className={`menu-icon ${isMenuOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <div className={`hamburger ${menuIconClass}`}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
              </div>
            </div>
          </div>
          <div className="center">
            <div className={`sidebar-text ${menuIconClass}`}>
              <h3 className="menutext">Menu</h3>
              <h3 className="changetext">
                {currentSectionTitle || sidebarTitle}
              </h3>
            </div>
          </div>
          <div className="bottom">
            <a
              href="#top"
              className="uni-link backtotop"
              onClick={(e) => handleScroll(e, "top")}
            ></a>
            <div className={`glyph ${glyphClass}`}>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </div>
      <nav className={isMenuOpen ? "open" : ""}>
        <div className="nav-container">
          <div className="left"></div>
          <div className="right">
            <div className="center">
              <ul>
                <li>
                  <Link href="/" onClick={scrollToTop}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about-us/" onClick={scrollToTop}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/properties/" onClick={scrollToTop}>
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/invest/" onClick={scrollToTop}>
                    Capital Investment
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us/" onClick={scrollToTop}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="bottom">
              <div className="touch">
                <p className="title">Get in Touch</p>
                <div className="icon">
                  <a
                    href="https://wa.me/918888900073"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                </div>
              </div>
              <div className="touch">
                <p className="title">Follow us on</p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SliderBar;
