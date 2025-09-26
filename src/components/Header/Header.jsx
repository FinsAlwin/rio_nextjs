"use client";
import { useState, useEffect } from "react";
import "./Header.css";
import Link from "next/link";
import Image from "next/image";
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
                <Image 
                  src={whiteLogo.src || whiteLogo} 
                  alt="RIO Luxury Homes Logo" 
                  className="logo-white"
                  width={120}
                  height={40}
                  priority
                />
                <Image 
                  src={darkLogo.src || darkLogo} 
                  alt="RIO Luxury Homes Logo" 
                  className="logo-dark"
                  width={120}
                  height={40}
                  priority
                />
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
