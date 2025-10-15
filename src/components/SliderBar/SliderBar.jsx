"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

function SliderBar({ sidebarTitle, backgroundType }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [glyphClass, setGlyphClass] = useState("");
  const [menuIconClass, setMenuIconClass] = useState("");
  const [currentSectionTitle, setCurrentSectionTitle] = useState("");
  const [sidebarTitleColor, setSidebarTitleColor] = useState("");
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
    // Helper function to determine if a color is light or dark
    const isLightColor = (color) => {
      if (!color) return false;

      // Convert color to RGB
      let r, g, b;

      // Handle hex colors
      if (color.startsWith("#")) {
        let hex = color.replace("#", "");

        // Convert 3-char hex to 6-char hex (e.g., #fff -> #ffffff)
        if (hex.length === 3) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }

        r = parseInt(hex.substr(0, 2), 16);
        g = parseInt(hex.substr(2, 2), 16);
        b = parseInt(hex.substr(4, 2), 16);
      }
      // Handle rgb/rgba colors
      else if (color.startsWith("rgb")) {
        const matches = color.match(/\d+/g);
        if (matches) {
          r = parseInt(matches[0]);
          g = parseInt(matches[1]);
          b = parseInt(matches[2]);
        }
      }
      // Default named colors
      else if (color.toLowerCase() === "white") {
        return true;
      } else if (color.toLowerCase() === "black") {
        return false;
      }

      // Calculate relative luminance
      if (r !== undefined && g !== undefined && b !== undefined) {
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5; // If luminance > 0.5, it's a light color
      }

      return false;
    };

    const sections = document.querySelectorAll("section[data-logo-type]");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // Lower threshold for earlier/better detection
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const logoType = entry.target.getAttribute("data-logo-type");
          const sidebarTitle = entry.target.getAttribute("data-sidebar-title");
          const sidebarColor = entry.target.getAttribute(
            "data-sidebar-title-color"
          );

          setCurrentSectionTitle(sidebarTitle);

          // Set color: custom color > logo-type based color > default white
          if (sidebarColor) {
            setSidebarTitleColor(sidebarColor);
            // If color is dark (like black), use dark-v class for icons
            // If color is light (like white), don't use dark-v class
            const shouldUseDarkIcons = !isLightColor(sidebarColor);
            setGlyphClass(shouldUseDarkIcons ? "dark-v" : "");
            setMenuIconClass(shouldUseDarkIcons ? "dark-v" : "");
          } else {
            setSidebarTitleColor(""); // Clear inline style
            const isDarkVSection = logoType === "logo-dark-v";
            setGlyphClass(isDarkVSection ? "dark-v" : "");
            setMenuIconClass(isDarkVSection ? "dark-v" : "");
          }

          console.log("SliderBar Observer - Section detected:", {
            logoType,
            sidebarTitle,
            sidebarColor,
          });
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
            <div
              className={`sidebar-text ${menuIconClass}`}
              style={sidebarTitleColor ? { color: sidebarTitleColor } : {}}
            >
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
