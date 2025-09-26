"use client";
import { useEffect, useRef, useState } from "react";
// import createScrollSnap from "scroll-snap"; // Conditional import to prevent SSR issues
import InvestSection from "../../components/InvestSection/InvestSection";
import Header from "../../components/Header/Header";
import RoiTrendsSection from "../../components/RioTrendsSection/RioTrendsSection";
import ProjectSingleSection from "../../components/ProjectSingleSection/ProjectSingleSection";
import InvestFooter from "../../components/InvestFooter/InvestFooter";
import SliderBar from "../../components/SliderBar/SliderBar";
import DynamicMeta from "../../components/DynamicMeta/DynamicMeta";
import InvestUs2 from "../../components/InvestUs2/InvestUs2";
import WhatsAppPopup from "../../components/WhatsAppPopup/WhatsAppPopup";
import InvestContact from "../../components/InvestContact/InvestContact";

function InvestUs() {
  const containerRef = useRef(null);
  const investContactRef = useRef(null);
  const [logoType, setLogoType] = useState("logo-dark");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

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
        if (window.innerWidth > 1366) {
          const config = {
            snapDestinationY: "100%",
            duration: 500,
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
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === investContactRef.current) {
          setIsHeaderVisible(!entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.5, // Adjust as needed
    });

    if (investContactRef.current) {
      observer.observe(investContactRef.current);
    }

    return () => {
      if (investContactRef.current) {
        observer.unobserve(investContactRef.current);
      }
    };
  }, []);

  const [sidebarTitle, setSidebarTitle] = useState("Properties");
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const title = "Invest Us";
  const description =
    "Explore RIO's comprehensive approach to maximizing your investment potential in Goa. Explore the data to visualise ROI. Invest in your legacy.";

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
        {isHeaderVisible && <Header logoType={logoType} />}{" "}
        {/* Hide Header when InvestContact is visible */}
        <section data-logo-type="logo-dark" data-sidebar-title="Invest">
          <InvestSection />
        </section>
        <section data-logo-type="logo-dark" data-sidebar-title="RIO Trends">
          <RoiTrendsSection />
        </section>
        <section
          ref={investContactRef}
          data-logo-type={isMobile ? "logo-dark" : "logo-dark-v"}
          data-sidebar-title="Contact"
        >
          <InvestContact />
        </section>
        <section data-logo-type="logo-dark" data-sidebar-title="Invest">
          <InvestUs2 />
        </section>
        <section
          data-logo-type={isMobile ? "logo-dark" : "logo-dark"}
          data-sidebar-title="Rumah Hutan"
        >
          <ProjectSingleSection />
        </section>
        <section data-logo-type="logo-dark" data-sidebar-title="Contact Us">
          <InvestFooter />
        </section>
        <WhatsAppPopup />
        <SliderBar sidebarTitle={sidebarTitle} />
      </div>
    </>
  );
}

export default InvestUs;
