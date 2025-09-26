"use client";
import { useEffect, useRef, useState } from "react";
// import createScrollSnap from "scroll-snap"; // Conditional import to prevent SSR issues
import { Element } from "react-scroll";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import SingleSelect from "../../components/SingleSelect/SingleSelect";
import SectionSlick1 from "../../components/SectionSlick1/SectionSlick1";
import Interiors from "../../components/Interiors/Interiors";
import Projects from "../../components/Projects/Projects";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import SliderBar from "../../components/SliderBar/SliderBar";
import DynamicMeta from "../../components/DynamicMeta/DynamicMeta";
import "./Home.css";
import WhatsAppPopup from "../../components/WhatsAppPopup/WhatsAppPopup";

function Home() {
  const containerRef = useRef(null);
  const [logoType, setLogoType] = useState("logo-dark");
  const [sidebarTitle, setSidebarTitle] = useState("Goa");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [backgroundType, setBackgroundType] = useState("bgwhite");

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
          const sidebarTitle = entry.target.getAttribute("data-sidebar-title");

          setLogoType(entry.target.getAttribute("data-logo-type"));
          setSidebarTitle(sidebarTitle);

          if (sidebarTitle === "Selects") {
            setBackgroundType(currentSlide % 2 === 0 ? "bgwhite" : "bgdark");
          }
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
  }, [currentSlide]);

  useEffect(() => {
    const element = containerRef.current;

    const applyScrollSnap = () => {
      if (element && typeof window !== "undefined") {
        if (window.innerWidth >= 1400) {
          const config = {
            snapDestinationY: "100%",
            duration: 500,
            threshold: 0.2,
          };
          try {
            if (element && typeof window !== "undefined") {
              // Dynamic import to prevent SSR issues
              import("scroll-snap").then(({ default: createScrollSnap }) => {
                createScrollSnap(element, config);
                if (element.style) {
                  element.style.scrollSnapType = "y mandatory";
                }
              }).catch((error) => {
                console.warn("ScrollSnap import error:", error);
              });
            }
          } catch (error) {
            console.warn("ScrollSnap error:", error);
          }
        } else {
          element.style.scrollSnapType = "none";
        }
      }
    };

    if (typeof window !== "undefined") {
      applyScrollSnap();
      window.addEventListener("resize", applyScrollSnap);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", applyScrollSnap);
      }
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // You can adjust the breakpoint as needed
  };

  useEffect(() => {
    handleResize(); // Check size on mount
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  const title = "RIO Luxury Homes | Iconic Luxury Villas for Sale in Goa";
  const description =
    "Exclusive luxury villas for sale in Goa. Homes that offer private pools & 24/7 security. Global architecture, contemporary aesthetic, & high ROI.";

  return (
    <div ref={containerRef} style={{ height: "100vh", overflowY: "scroll" }}>
      <>
        <DynamicMeta title={title} description={description} />
        <Header logoType={logoType} />
        <section
          data-logo-type={isMobile ? "logo-dark" : "logo-dark"}
          data-sidebar-title="Goa"
        >
          <Hero />
        </section>
        <section
          data-logo-type={isMobile ? "logo-dark" : "logo-dark"}
          data-sidebar-title="Goa"
        >
          <Element name="single-select">
            <SingleSelect />
          </Element>
        </section>
        <section data-logo-type="logo-dark" data-sidebar-title="Properties">
          <SectionSlick1 />
        </section>
        <section
          data-logo-type={currentSlide % 2 === 0 ? "logo-dark" : "logo-dark-v"}
          data-sidebar-title="Selects"
        >
          <Interiors
            onSlideChange={(slideIndex) => {
              setCurrentSlide(slideIndex);
            }}
          />
        </section>

        <section
          data-logo-type={isMobile ? "logo-dark" : "logo-dark-v"}
          data-sidebar-title="Features"
        >
          <Features />
        </section>
        <section
          data-logo-type={isMobile ? "logo-dark" : "logo-dark-v"}
          data-sidebar-title="Overseas"
        >
          <Projects />
        </section>

        <section
          data-logo-type={isMobile ? "logo-dark" : "logo-dark"}
          data-sidebar-title="Contact Us"
          className="footer-home-section"
        >
          <Footer />
        </section>
        <WhatsAppPopup />
        <SliderBar
          sidebarTitle={sidebarTitle}
          backgroundType={backgroundType}
        />
      </>
    </div>
  );
}

export default Home;
