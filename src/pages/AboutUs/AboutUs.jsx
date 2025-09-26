"use client";
import SliderBar from "../../components/SliderBar/SliderBar";
import OwnerInfo from "../../components/OwnerInfo/OwnerInfo";
import RioLuxuryHomesInfo from "../../components/RioLuxuryHomesInfo/RioLuxuryHomesInfo";
import FounderSection from "../../components/FounderSection/FounderSection";
import TimelineSection from "../../components/TimelineSection/TimelineSection";
import { useEffect, useRef, useState } from "react";
// import createScrollSnap from "scroll-snap"; // Conditional import to prevent SSR issues
import TeamSection from "../../components/TeamSection/TeamSection";
import Header from "../../components/Header/Header";
import BannerSection from "../../components/BannerSection/BannerSection";
import UpcomingProjectsSection from "../../components/UpcomingProjectsSection/UpcomingProjectsSection";
import CTASection from "../../components/CTASection/CTASection";
import AboutUsFooter from "../../components/AboutUsFooter/AboutUsFooter";
import TechnicalSection from "../../components/TechnicalSection/TechnicalSection";
import DynamicMeta from "../../components/DynamicMeta/DynamicMeta";
import WhatsAppPopup from "../../components/WhatsAppPopup/WhatsAppPopup";

const AboutSection = () => {
  const containerRef = useRef(null);
  const [logoType, setLogoType] = useState("logo-dark");
  const [sidebarTitle, setSidebarTitle] = useState("About Us");

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

  useEffect(() => {
    const element = containerRef.current;

    const applyScrollSnap = () => {
      if (element && typeof window !== "undefined") {
        if (window.innerWidth >= 1400) {
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
          if (element.style) { element.style.scrollSnapType = "none"; }
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

  const title = "About Us";
  const description =
    "Under the leadership of Mr Riyaz Somani, RIO has risen to become one of the top real estate companies in Goa, focusing on premium high-end properties.";

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
        <section data-logo-type="logo-dark" data-sidebar-title="About Us">
          <OwnerInfo />
        </section>
        <section data-logo-type="logo-dark" data-sidebar-title="About Us">
          <RioLuxuryHomesInfo />
        </section>
        <section data-logo-type="logo-dark" data-sidebar-title="What We Do">
          <TechnicalSection />
        </section>
        <section data-logo-type="logo-dark" data-sidebar-title="Founder">
          <FounderSection />
        </section>
        <section data-logo-type="logo-dark" data-sidebar-title="Team ">
          <TeamSection />
        </section>
        <section data-logo-type="logo-dark">
          <BannerSection />
        </section>
        <section data-logo-type="logo-dark" data-sidebar-title="Timeline">
          <TimelineSection />
        </section>
        <section data-logo-type="logo-dark" data-sidebar-title="Overseas">
          <UpcomingProjectsSection />
        </section>
        {/* <CTASection /> */}
        <section data-logo-type="logo-dark" data-sidebar-title="Contact Us">
          <AboutUsFooter />
        </section>
        <WhatsAppPopup />
        <SliderBar sidebarTitle={sidebarTitle} />
      </div>
    </>
  );
};

export default AboutSection;
