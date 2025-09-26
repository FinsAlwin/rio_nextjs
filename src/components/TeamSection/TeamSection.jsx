"use client";
import { useEffect, useRef, useState } from "react";
import CEOImage from "../../assets/about_us_founder/ceo_image.webp";
import CFOImage from "../../assets/about_us_founder/cfo_image.webp";
import DirectorImage from "../../assets/about_us_founder/director_image.webp";
import HRImage from "../../assets/about_us_founder/hr_image.webp";
import "./TeamSection.css";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const sections = [
  "section-ceo",
  "section-cfo",
  "section-director",
  "section-hr",
];

const TeamSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const scrollToSection = (index) => {
    document
      .getElementById(sections[index])
      .scrollIntoView({ behavior: "smooth" });
    setCurrentSection(index);
  };

  const handlePrev = () => {
    const newIndex =
      currentSection === 0 ? sections.length - 1 : currentSection - 1;
    scrollToSection(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentSection === sections.length - 1 ? 0 : currentSection + 1;
    scrollToSection(newIndex);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`team-members text-change scroll-smooth bgblack zindex-10 sticky snap-scroll ${
        isVisible ? "animate__animated animate__zoomIn animate__slow" : ""
      }`}
      data-sidebar-title="Team"
    >
      <div className="wrapper">
        <div className="arrow-container">
          <div className="arrow" onClick={handlePrev}>
            <MdOutlineArrowBackIosNew size={24} color="#fff" />{" "}
            {/* Using React Icon for left arrow */}
          </div>
          <div className="arrow" onClick={handleNext}>
            <MdOutlineArrowForwardIos size={24} color="#fff" />{" "}
            {/* Using React Icon for right arrow */}
          </div>
        </div>
        <div className="top-blank-section h-5 top-right">
          <div className="title-container">
            <h2>Team</h2>
          </div>
        </div>
        <div className="inner-container ">
          <div className="teams-container scaleup sb-custom">
            <div id="section-ceo" className="team-item">
              <div className="team-item-details">
                <h3 className="name">
                  Nilesh
                  <br />
                  Dessai
                </h3>
                <h4 className="designation">CEO</h4>
              </div>
              <div className="team-item-image">
                <div className="image-container">
                  <img src={CEOImage.src || CEOImage} alt="Nilesh Dessai" />
                </div>
                <div className="contact">
                  <a href="mailto:ceo@rioluxuryhomes.in" className="mail">
                    ceo@rioluxuryhomes.in
                  </a>
                </div>
              </div>
            </div>

            <div id="section-cfo" className="team-item">
              <div className="team-item-details">
                <h3 className="name">
                  Evita
                  <br />
                  Fernandes
                </h3>
                <h4 className="designation">Chief Financial Officer</h4>
              </div>
              <div className="team-item-image">
                <div className="image-container">
                  <img src={CFOImage.src || CFOImage} alt="Evita Fernandes" />
                </div>
                <div className="contact">
                  <a href="mailto:accounts@rioluxuryhomes.in" className="mail">
                    accounts@rioluxuryhomes.in
                  </a>
                </div>
              </div>
            </div>

            <div id="section-director" className="team-item">
              <div className="team-item-details">
                <h3 className="name">
                  Sheetal
                  <br />
                  Pandit
                </h3>
                <h4 className="designation">Sales Director</h4>
              </div>
              <div className="team-item-image">
                <div className="image-container">
                  <img src={DirectorImage.src || DirectorImage} alt="Sheetal Pandit" />
                </div>
                <div className="contact">
                  <a href="mailto:sales@rioluxuryhomes.in" className="mail">
                    sales@rioluxuryhomes.in
                  </a>
                </div>
              </div>
            </div>

            <div id="section-hr" className="team-item">
              <div className="team-item-details">
                <h3 className="name">
                  Scarlet
                  <br />
                  Braganza
                </h3>
                <h4 className="designation">Human Resources</h4>
              </div>
              <div className="team-item-image">
                <div className="image-container">
                  <img src={HRImage.src || HRImage} alt="Scarlet Braganza" />
                </div>
                <div className="contact">
                  <a href="mailto:hr@rioluxuryhomes.in" className="mail">
                    hr@rioluxuryhomes.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
