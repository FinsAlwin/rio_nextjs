"use client";
import { useEffect, useRef, useState } from "react";
import timeLine1 from "../../assets/about_us_founder/timeline_image_1.webp";
import timeLine2 from "../../assets/about_us_founder/timeline_image_2.webp";
import timeLine3 from "../../assets/about_us_founder/timeline_image_3.webp";
import timeLine4 from "../../assets/about_us_founder/timeline_image_4.webp";
import timeLine5 from "../../assets/about_us_founder/timeline_image_5.webp";
import timeLine6 from "../../assets/about_us_founder/timeline_image_6.webp";
import timeLine7 from "../../assets/about_us_founder/timeline_image_7.webp";
import "./TimelineSection.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
const sections = [
  "timeitem1",
  "timeitem2",
  "timeitem3",
  "timeitem4",
  "timeitem5",
  "timeitem6",
  "timeitem7",
];
const TimelineSection = () => {
  const [activeItem, setActiveItem] = useState("#timeitem1");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const handleItemClick = (target) => {
    setActiveItem(target);
  };

  const [currentSection, setCurrentSection] = useState(0);
  const scrollToSection = (index) => {
    const targetElement = document.getElementById(sections[index]);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(index);
    }
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
      className={`timeline text-change bgblack scroll-smooth sticky snap-scroll ${
        isVisible ? "animate__animated animate__zoomIn animate__slow" : ""
      }`}
      data-sidebar-title="Timeline"
    >
      <div className="wrapper wrapper-timeline">
        <div className="inner-container">
          <div className="our-journey-heading">
            <h2 className="title-container-our-heading">OUR JOURNEY</h2>
          </div>

          <div className="timeline-container">
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
            <div className="timeline-items">
              <div className="dates-container sb-custom">
                <div
                  className={`date-item ${
                    activeItem === "#timeitem1" ? "active" : ""
                  }`}
                  data-target="#timeitem1"
                  onClick={() => handleItemClick("#timeitem1")}
                >
                  <h3 className="date">2018</h3>
                  <h3 className="title">RUMAH HUTAN</h3>
                </div>
                <div
                  className={`date-item ${
                    activeItem === "#timeitem2" ? "active" : ""
                  }`}
                  data-target="#timeitem2"
                  onClick={() => handleItemClick("#timeitem2")}
                >
                  <h3 className="date">2020</h3>
                  <h3 className="title">CASA BRILHANTE</h3>
                </div>
                <div
                  className={`date-item ${
                    activeItem === "#timeitem3" ? "active" : ""
                  }`}
                  data-target="#timeitem3"
                  onClick={() => handleItemClick("#timeitem3")}
                >
                  <h3 className="date">2021</h3>
                  <h3 className="title">BLACK FOREST</h3>
                </div>
                <div
                  className={`date-item ${
                    activeItem === "#timeitem4" ? "active" : ""
                  }`}
                  data-target="#timeitem4"
                  onClick={() => handleItemClick("#timeitem4")}
                >
                  <h3 className="date">2021</h3>
                  <h3 className="title">RIO ESTILO</h3>
                </div>
                <div
                  className={`date-item ${
                    activeItem === "#timeitem5" ? "active" : ""
                  }`}
                  data-target="#timeitem5"
                  onClick={() => handleItemClick("#timeitem5")}
                >
                  <h3 className="date">2022</h3>
                  <h3 className="title">RIO ROYALE</h3>
                </div>
                <div
                  className={`date-item ${
                    activeItem === "#timeitem6" ? "active" : ""
                  }`}
                  data-target="#timeitem6"
                  onClick={() => handleItemClick("#timeitem6")}
                >
                  <h3 className="date">2022</h3>
                  <h3 className="title">RIO ESTADO</h3>
                </div>
                <div
                  className={`date-item ${
                    activeItem === "#timeitem7" ? "active" : ""
                  }`}
                  data-target="#timeitem7"
                  onClick={() => handleItemClick("#timeitem7")}
                >
                  <h3 className="date">2023</h3>
                  <h3 className="title">A CAPPELLA</h3>
                </div>
              </div>
            </div>
            <div className="timeline-content sb-custom">
              <div className="timeline-content-container scaleup namob">
                <div
                  id="timeitem1"
                  className={`timeline-content-item ${
                    activeItem === "#timeitem1" ? "active" : ""
                  }`}
                >
                  <div className="top">
                    <div className="image-container">
                      <img src={timeLine1.src || timeLine1} alt="RUMAH HUTAN" />
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="left">
                      <h2 className="title uppercase">RUMAH HUTAN</h2>
                    </div>
                    <div className="right">
                      <p className="desc sb-custom">
                        Skylights bring daylight into our signature new age
                        luxury homes across Goa. Private pools that rejuvenate,
                        understated modern interiors, and the lush outdoors.
                        This is what you can expect in our eight stunning Rumah
                        Hutan villas.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  id="timeitem2"
                  className={`timeline-content-item ${
                    activeItem === "#timeitem2" ? "active" : ""
                  }`}
                >
                  <div className="top">
                    <div className="image-container">
                      <img src={timeLine2.src || timeLine2} alt="CASA BRILHANTE" />
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="left">
                      <h2 className="title uppercase">CASA BRILHANTE</h2>
                    </div>
                    <div className="right">
                      <p className="desc sb-custom">
                        The word “brilhante” signifies brightness and unmatched
                        luxury. Distinct from the transparency of Modernism and
                        the starkness of tradition, it embraces a mystical Goan
                        architectural philosophy, inviting visitors to explore
                        its sun-dappled corridors, expansive arches and
                        nostalgic courtyards, ultimately revealing its secrets
                        through the interplay of light and shadow.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  id="timeitem3"
                  className={`timeline-content-item ${
                    activeItem === "#timeitem3" ? "active" : ""
                  }`}
                >
                  <div className="top">
                    <div className="image-container">
                      <img src={timeLine3.src || timeLine3} alt="BLACK FOREST" />
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="left">
                      <h2 className="title uppercase">BLACK FOREST</h2>
                    </div>
                    <div className="right">
                      <p className="desc sb-custom">
                        This 4 bedroom property offers awe-inspiring, panoramic
                        views of the forest around Siolim, without compromising
                        your privacy. Designed to leverage the light and wonder
                        of Goa, each bedroom is interwoven into the tropical
                        ecosystem. A seamless open-plan layout, floor-to-ceiling
                        windows and verdant roof gardens accompanied by an
                        expansive pool and sundeck form a central space to enjoy
                        the best of indoor-outdoor living.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  id="timeitem4"
                  className={`timeline-content-item ${
                    activeItem === "#timeitem4" ? "active" : ""
                  }`}
                >
                  <div className="top">
                    <div className="image-container">
                      <img src={timeLine4.src || timeLine4} alt="RIO ESTILO" />
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="left">
                      <h2 className="title uppercase">RIO ESTILO</h2>
                    </div>
                    <div className="right">
                      <p className="desc sb-custom">
                        Designed in the spirit of Bali’s idyllic climate, with a
                        seamless flow between indoor and outdoor living spaces,
                        these villas feature modern, chic pavilions that open
                        into magnificent, expansive swimming pools.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  id="timeitem5"
                  className={`timeline-content-item ${
                    activeItem === "#timeitem5" ? "active" : ""
                  }`}
                >
                  <div className="top">
                    <div className="image-container">
                      <img src={timeLine5.src || timeLine5} alt="RIO ROYALE" />
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="left">
                      <h2 className="title uppercase">RIO ROYALE</h2>
                    </div>
                    <div className="right">
                      <p className="desc sb-custom">
                        Set back from the shore, with direct access to the beach
                        and turquoise sea, RIO unveils its exclusive gated
                        community, RIO Royale. Influenced by modern
                        Mediterranean architecture, styled with chequered retro
                        windows, enhanced by fresh terrazzo floorings,
                        double-height ceilings and intimate bedroom settings,
                        RIO Royale presents a panorama of scenic views. Natural
                        light floods into spacious rooms, set with high ceilings
                        and custom furnishings. Sophistication has never looked
                        so good.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  id="timeitem6"
                  className={`timeline-content-item ${
                    activeItem === "#timeitem6" ? "active" : ""
                  }`}
                >
                  <div className="top">
                    <div className="image-container">
                      <img src={timeLine6.src || timeLine6} alt="RIO ESTADO" />
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="left">
                      <h2 className="title uppercase">RIO ESTADO</h2>
                    </div>
                    <div className="right">
                      <p className="desc sb-custom">
                        Inspired by Indo-Portuguese architecture, tucked away on
                        the meandering slopes of a quaint village in Ucassaim,
                        these homes have been meticulously designed keeping your
                        ultimate comforts in mind. These 11 independent luxury
                        villas are dotted across the lush landscapes of Goa,
                        with private pools and landscaped water bodies,
                        encircled by large community spaces.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  id="timeitem7"
                  className={`timeline-content-item ${
                    activeItem === "#timeitem7" ? "active" : ""
                  }`}
                >
                  <div className="top">
                    <div className="image-container">
                      <img src={timeLine7.src || timeLine7} alt="A CAPPELLA" />
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="left">
                      <h2 className="title uppercase">A CAPPELLA</h2>
                    </div>
                    <div className="right">
                      <p className="desc sb-custom">
                        Set across 4 lush acres, this property offers stunning
                        views that will leave you speechless. Situated within an
                        oasis of the palm trees and postcard blue skies, A
                        Cappella lies just minutes from the beaches of Morjim,
                        Ashwem, and Mandrem, and a mere 30 minute drive from the
                        MOPA Airport. These distinctive 4 bedroom villas have
                        extended terraces and patios accompanied by private
                        patches of green and private pools. RIO's A Cappella
                        provides you with an immersive Goan experience without
                        compromising on your supreme comfort and privacy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
