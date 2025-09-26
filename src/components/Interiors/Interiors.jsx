"use client";
/* eslint-disable react/prop-types */
import { GrNext, GrPrevious } from "react-icons/gr";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Interiors.css";
import Link from "next/link";
import Image from "next/image";
import slick1 from "../../assets/homepage_images/assagao_main.webp";
import slick2 from "../../assets/homepage_images/assagao_thumb.webp";
import slick6 from "../../assets/homepage_images/black-forest-rooftop.webp";
import slick6_2 from "../../assets/homepage_images/slick_black_2.webp";

import slick_1_1 from "../../assets/homepage_images/interiors_section_1.webp";
import slick_1_2 from "../../assets/homepage_images/interiors_1_2.webp";
import slick_2_2 from "../../assets/homepage_images/rio-estado-villa-mob_web.webp";
import slick_2_3 from "../../assets/homepage_images/rio-estado-master-bedroom_web.webp";
import { useEffect, useState } from "react";
import SliderBar from "../SliderBar/SliderBar";
const PreviousArrow = ({ className, onClick, currentSlide }) => {
  return (
    <button
      className={`${className} custom-arrow  ${
        currentSlide === 0 ? "slick-disabled" : ""
      }`}
      aria-label="Previous"
      type="button"
      aria-disabled={currentSlide === 0}
      onClick={onClick}
    >
      <span className="arrow-icon">
        <GrPrevious style={{ fontSize: "45px" }} />
      </span>
    </button>
  );
};

// Custom next arrow component
const NextArrow = ({ className, onClick, slideCount, currentSlide }) => {
  return (
    <button
      className={`${className} custom-arrow  ${
        currentSlide === slideCount - 1 ? "slick-disabled" : ""
      }`}
      aria-label="Next"
      type="button"
      aria-disabled={currentSlide === slideCount - 1}
      onClick={onClick}
    >
      <span className="arrow-icon">
        <GrNext style={{ fontSize: "45px" }} />
      </span>
    </button>
  );
};
function Interiors({ onSlideChange }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    pauseOnHover: false,
    slidesToScroll: 1,
    waitForAnimate: false,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    afterChange: (current) => {
      onSlideChange(current);
      const currentSlideElement =
        document.querySelectorAll(".slick-slide")[current];
      if (currentSlideElement) {
        const projectsDualElement =
          currentSlideElement.querySelector("div.projects-dual");
        if (projectsDualElement) {
          setBackgroundType(
            projectsDualElement.classList.contains("bgwhite")
              ? "bgwhite"
              : "bgblack"
          );
        }
      }
    },
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [backgroundType, setBackgroundType] = useState("bgwhite");
  // const images = isMobile
  //   ? [mobileCardImage1, mobileCardImage2, mobileCardImage3, mobileCardImage4]
  //   : [cardImage1, cardImage3, cardImage2, cardImage4];
  return (
    <section className="properties-slider" data-sidebar-title="Properties">
      <Slider {...settings} className="single-slider">
        {/* Slide 1 */}

        {/* Slide 2 */}
        <div className="slick-slide ">
          <div className="projects-dual flip bgwhite">
            <div className="projects-container projects-selects-container">
              <div className="left">
                <div className="content-container projects-content-overlap">
                  <div className="content content-interiors">
                    <h2 className="title uppercase">Step into the Sublime</h2>
                    <h3 className="title-interiors">Rumah Hutan</h3>
                    <p className="description-interiors">
                      Inspired by Balinese architecture, with private pools,
                      elevated modern interiors, and access to Goa’s lush
                      outdoors.
                    </p>
                    <div
                      style={{
                        backgroundImage: `url(${slick_1_2.src || slick_1_2})`,
                      }}
                      className="image-container image-container-interior"
                    >
                      {/* <img src={slick_1_2} alt="Palatial Nest" /> */}
                    </div>
                    <div className="btn-container center">
                      <Link
                        href={
                          "https://rioluxuryhomes.myzow.in/properties/rumah-hutan-1/"
                        }
                        onClick={scrollToTop}
                        className="btn"
                      >
                        Indulge
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="image">
                  <Image src={slick_1_1} alt="Villa C Foyer" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slick-slide">
          <div className="projects-dual flip bgblack">
            <div className="projects-container projects-selects-container">
              <div className="left">
                <div className="content-container content-container-interiors projects-content-overlap">
                  <div className="content content-interiors">
                    <h2 className="title uppercase">Have Yourself a Hill</h2>
                    <h3 className="title-interiors">Black Forest</h3>
                    <p className="description-interiors">
                      Bask in the tropical wonderland of Siolim’s outdoors, stay
                      connected to nature through the roof garden and sun deck.
                    </p>
                    <div
                      style={{
                        backgroundImage: `url(${slick6_2.src || slick6_2})`,
                      }}
                      className="image-container image-container-interior"
                    >
                      {/* <img src={slick6_2} alt="Hill Exterior" /> */}
                    </div>
                    <div className="btn-container center">
                      <Link
                        href={
                          "https://rioluxuryhomes.myzow.in/properties/black-forest/"
                        }
                        onClick={scrollToTop}
                        className="btn white"
                      >
                        Indulge
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="image">
                  <Image src={slick6} alt="Hill Rooftop" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Slide 3 */}

        {/* Slide 4 */}
        <div className="slick-slide">
          <div className="projects-dual flip bgwhite">
            <div className="projects-container projects-selects-container">
              <div className="left">
                <div className="content-container projects-content-overlap">
                  <div className="content ">
                    <h2 className="title uppercase">Crafted for the 0.0001%</h2>
                    <h3 className="title-interiors">6 Assagao</h3>
                    <p className="description-interiors">
                      Our most awaited architectural marvel: sophistication
                      meets comfort like never before. The best is yet to come.{" "}
                    </p>
                    <div
                      style={{
                        backgroundImage: `url(${slick2.src || slick2})`,
                      }}
                      className="image-container image-container-interior"
                    >
                      {/* <img src={slick2} alt="Rumah Hutan" /> */}
                    </div>
                    <div className="btn-container center">
                      <Link
                        href={
                          "https://rioluxuryhomes.myzow.in/properties/6-assagao/"
                        }
                        onClick={scrollToTop}
                        className="btn"
                      >
                        Indulge
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="image">
                  <Image src={slick1} alt="Master Bedroom" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slick-slide">
          <div className="projects-dual flip bgblack">
            <div className="projects-container projects-selects-container">
              <div className="left">
                <div className="content-container projects-content-overlap">
                  <div className="content content-interiors">
                    <h2 className="title uppercase">SOLITUDE FOR THE SELECT</h2>
                    <h3 className="title-interiors">RIO Estado</h3>
                    <p className="description-interiors">
                      Based in Ucassaim, community spaces and landscaped water
                      bodies are the highlights of these Indo-Portugese villas
                    </p>
                    <div
                      style={{
                        backgroundImage: `url(${slick_2_2.src || slick_2_2})`,
                      }}
                      className="image-container image-container-interior"
                    >
                      {/* <img src={slick_2_2} alt="Suspended in Solitude" /> */}
                    </div>
                    <div className="btn-container center">
                      <Link
                        href={
                          "https://rioluxuryhomes.myzow.in/properties/rio-estado/"
                        }
                        onClick={scrollToTop}
                        className="btn white"
                      >
                        Indulge
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="image">
                  <Image src={slick_2_3} alt="Master Bedroom" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
}

export default Interiors;
