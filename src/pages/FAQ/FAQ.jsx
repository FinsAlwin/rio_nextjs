"use client";
import { useEffect, useRef } from "react";
import FAQSection from "../../components/FAQSection/FAQSection";
import Header from "../../components/Header/Header";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import SliderBar from "../../components/SliderBar/SliderBar";
import DynamicMeta from "../../components/DynamicMeta/DynamicMeta";
// import createScrollSnap from "scroll-snap"; // Conditional import to prevent SSR issues
import WhatsAppPopup from "../../components/WhatsAppPopup/WhatsAppPopup";
function FAQ() {
  const [logoType, setLogoType] = useState("logo-dark");
  const containerRef = useRef(null);
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
      if (element && typeof window !== "undefined") {
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
  const [sidebarTitle, setSidebarTitle] = useState("FAQ");
  const title =
    "FAQs | Your Questions About RIO’s Luxury Properties in Goa Answered";
  const description =
    "Find answers to common questions about RIO’s luxury villas, investment opportunities, property management services, and more. Explore our FAQs to learn everything you need to know about owning or investing in luxury properties in Goa.";

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
        <Header logoType={logoType} />
        <FAQSection data-logo-type="logo-dark" data-sidebar-title="FAQ" />
        <SliderBar sidebarTitle={sidebarTitle} />
        <WhatsAppPopup />
        <Footer data-logo-type="logo-dark" data-sidebar-title="Contact Us" />
      </div>
    </>
  );
}

export default FAQ;
