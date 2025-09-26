"use client";
import { useEffect, useRef, useState } from "react";
// import createScrollSnap from "scroll-snap"; // Conditional import to prevent SSR issues
import Header from "../../components/Header/Header";
import CareersSection from "../../components/CareersSection/CareersSection";
import CareersFooter from "../../components/CareersFooter/CareersFooter";
import SliderBar from "../../components/SliderBar/SliderBar";
import DynamicMeta from "../../components/DynamicMeta/DynamicMeta";
import WhatsAppPopup from "../../components/WhatsAppPopup/WhatsAppPopup";

function Careers() {
  const containerRef = useRef(null);
  const [logoType, setLogoType] = useState("logo-dark");
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-logo-type]");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust the threshold as needed
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLogoType(entry.target.getAttribute("data-logo-type"));
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
  useEffect(() => {
    const element = containerRef.current;

    const applyScrollSnap = () => {
      if (element) {
        if (window.innerWidth >= 1366) {
          const config = {
            snapDestinationY: "100%", // snap to each section vertically
            //timeout: 200,
            duration: 500,
            // snapStop: true,
            threshold: 0.1,
          };
          try {
            if (element && typeof window !== "undefined") {
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

    applyScrollSnap(); // Apply on initial load

    window.addEventListener("resize", applyScrollSnap); // Apply on window resize

    return () => {
      window.removeEventListener("resize", applyScrollSnap);
    };
  }, []);
  const [sidebarTitle, setSidebarTitle] = useState("Careers");

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-logo-type]");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust the threshold as needed
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLogoType(entry.target.getAttribute("data-logo-type"));
          setSidebarTitle(entry.target.getAttribute("data-sidebar-title"));
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

  const title = "Careers at RIO | Join Our Luxury Real Estate Team in Goa";
  const description =
    " Explore exciting career opportunities at RIO, a leader in luxury real estate in Goa. If you’re passionate about quality and innovation, browse our current vacancies and join a team that’s redefining excellence in property development.";

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <>
        <DynamicMeta title={title} description={description} />
        <Header logoType={logoType} />
        <CareersSection
          data-logo-type="logo-dark"
          data-sidebar-title="Careers"
        />
        <CareersFooter
          data-logo-type="logo-dark"
          data-sidebar-title="Contact Us"
        />
        <WhatsAppPopup />
        <SliderBar sidebarTitle={sidebarTitle} />
      </>
    </div>
  );
}

export default Careers;
