"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import Header from "../../components/Header/Header";
import PropertiesIntroSection from "../../components/PropertiesIntroSection/PropertiesIntroSection";
// import createScrollSnap from "scroll-snap"; // Conditional import to prevent SSR issues
import PropertiesListing from "../../components/PropertiesListing/PropertiesListing";
import FooterProperties from "../../components/FooterProperties/FooterProperties";
import SliderBar from "../../components/SliderBar/SliderBar";
import DynamicMeta from "../../components/DynamicMeta/DynamicMeta";
import WhatsAppPopup from "../../components/WhatsAppPopup/WhatsAppPopup";
import { DynamicProjects, DynamicPropertyBlogSlider } from "../../components/DynamicComponents/DynamicComponents";
// import { Modal } from "react-responsive-modal"; // Temporarily disabled due to ESM compatibility issue
// import "react-responsive-modal/styles.css"; // Temporarily disabled due to ESM compatibility issue
import ApplyNowForm from "../../components/ApplyForm/ApplyForm";
import ApplyFormModal from "../../components/ApplyFormModal/ApplyFormModal";

function Properties() {
  const containerRef = useRef(null);
  const [logoType, setLogoType] = useState("logo-dark");
  const [sidebarTitle, setSidebarTitle] = useState("Properties"); // Default value
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);

  // Handle modal open and close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCareer(null);
  };

  const handleApplyClick = (career) => {
    setSelectedCareer(career);
    setIsModalOpen(true);
  };

  // Open modal after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for updating sidebar title
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-sidebar-title]");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // Increase threshold for better detection
    };

    let currentTitle = "Properties"; // Default title

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newTitle =
            entry.target.getAttribute("data-sidebar-title") || "";

          if (newTitle !== currentTitle) {
            console.log("Updating sidebarTitle:", newTitle); // Debug log
            setSidebarTitle(newTitle);
            currentTitle = newTitle;
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
  }, []);

  // Scroll snap effect
  useEffect(() => {
    const element = containerRef.current;
    const applyScrollSnap = () => {
      if (element) {
        if (window.innerWidth >= 1366) {
          const config = {
            snapDestinationY: "100%",
            duration: 500,
            threshold: 0.1,
          };
          try {
            // Scroll snap disabled
            // if (element && typeof window !== "undefined") {
            //   import("scroll-snap").then(({ default: createScrollSnap }) => {
            //     createScrollSnap(element, config);
            //     if (element.style) {
            //       element.style.scrollSnapType = "y mandatory";
            //     }
            //   }).catch((error) => {
            //     console.warn("ScrollSnap import error:", error);
            //   });
            //   if (element.style) {
            //     
            //   }
            // }
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

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const title =
    "Luxury Properties in Goa | Completed, Ongoing & Upcoming Projects by RIO";
  const description =
    "Explore RIO’s exclusive luxury villas and properties in Goa. Browse completed, ongoing, and upcoming projects designed for elegance and investment.";

  return (
    <>
      <DynamicMeta title={title} description={description} />
      <Header logoType={logoType} />

      <PropertiesIntroSection />

      <section
        data-logo-type={isMobile ? "logo-dark" : "logo-dark-v"}
        data-sidebar-title="Properties"
        className="properties-section"
      >
        <PropertiesListing />
      </section>

      <section
        data-logo-type={isMobile ? "logo-dark" : "logo-dark-v"}
        data-sidebar-title="Overseas"
      >
        <Suspense fallback={<div className="loading-placeholder">Loading projects...</div>}>
          <DynamicProjects />
        </Suspense>
      </section>

      <section data-logo-type="logo-dark" data-sidebar-title="Blogs">
        <Suspense fallback={<div className="loading-placeholder">Loading blog slider...</div>}>
          <DynamicPropertyBlogSlider />
        </Suspense>
      </section>

      {/* Sidebar */}
      <SliderBar sidebarTitle={sidebarTitle} />

      <section data-logo-type="logo-dark" data-sidebar-title="Contact Us">
        <FooterProperties />
      </section>

      <WhatsAppPopup />

      {/* Modal Component */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "20px",
              maxWidth: "600px",
              width: "90%",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666",
                zIndex: 1001,
              }}
              aria-label="Close modal"
            >
              ×
            </button>
            <ApplyFormModal />
          </div>
        </div>
      )}
    </>
  );
}

export default Properties;
