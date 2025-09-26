"use client";
import { useState, useEffect } from "react";
import "./Header.css";
import Link from "next/link";
import whiteLogo from "../../assets/homepage_images/logo-white-2.svg";
import darkLogo from "../../assets/homepage_images/logo-dark.svg";
function Header({ logoType }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    console.log("Scroll position:", window.scrollY);
    setIsScrolled(window.scrollY > 20); // Adjust threshold for mobile if needed
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    console.log("isScrolled:", isScrolled);
  }, [isScrolled]);

  return (
    <>
      <header className={`${isScrolled ? "" : ""}`}>
        <div className="wrapper">
          <div className="left">
            <div className="logo-container">
              <div className={`logo ${logoType}`}>
                <Link href={"/"} onClick={scrollToTop} className="uni-link">
                </Link>
                <img src={whiteLogo.src || whiteLogo} alt="" className="logo-white" />
                <img src={darkLogo.src || darkLogo} alt="" className="logo-dark" />
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </header>
      {/* <SliderBar /> */}
    </>
  );
}

export default Header;
