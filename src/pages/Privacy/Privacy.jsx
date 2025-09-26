"use client";
import { useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import SliderBar from "../../components/SliderBar/SliderBar";
// import createScrollSnap from "scroll-snap"; // Conditional import to prevent SSR issues
import DynamicMeta from "../../components/DynamicMeta/DynamicMeta";
import WhatsAppPopup from "../../components/WhatsAppPopup/WhatsAppPopup";
function Privacy() {
  const [logoType, setLogoType] = useState("logo-dark");
  const [sidebarTitle, setSidebarTitle] = useState("Privacy Policy");
  const containerRef = useRef(null);
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

    applyScrollSnap();

    window.addEventListener("resize", applyScrollSnap);

    return () => {
      window.removeEventListener("resize", applyScrollSnap);
    };
  }, []);
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
  const title = "Privacy Policy | RIO Luxury Properties in Goa";
  const description =
    "Read RIO’s Privacy Policy to understand how we protect your personal information. Learn about data collection, usage, and security practices when engaging with our luxury real estate services in Goa.";

  return (
    <>
      <div
        ref={containerRef}
        style={{
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <DynamicMeta title={title} description={description} />
        <Header logoType={logoType} sidebarTitle={sidebarTitle} />
        <PrivacyPolicy
          data-logo-type="logo-dark"
          data-sidebar-title="Privacy Policy"
        />
        <WhatsAppPopup />
        <SliderBar sidebarTitle={sidebarTitle} />
        <Footer />
      </div>
    </>
  );
}

export default Privacy;
