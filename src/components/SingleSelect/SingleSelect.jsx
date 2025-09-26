"use client";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "./SingleSelect.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import desktopView1 from "../../assets/homepage_images/new_images/desktop_view_1.webp";
import desktopView2 from "../../assets/homepage_images/new_images/desktop_view_2.webp";
import desktopView3 from "../../assets/homepage_images/new_images/desktop_view_3.webp";
import desktopView4 from "../../assets/homepage_images/new_images/desktop_view_4.webp";
import mobileView1 from "../../assets/homepage_images/new_images/mobile_view_1.webp";
import mobileView2 from "../../assets/homepage_images/new_images/mobile_view_2.webp";
import mobileView3 from "../../assets/homepage_images/new_images/mobile_view_3.webp";
import mobileView4 from "../../assets/homepage_images/new_images/mobile_view_4.webp";
import { useState, useEffect } from "react";

const PreviousArrow = ({ className, onClick, currentSlide }) => {
  return (
    <button
      className={`${className} custom-arrow   ${
        currentSlide === 0 ? "slick-disabled" : ""
      }`}
      aria-label="Previous"
      type="button"
      aria-disabled={currentSlide === 0}
      onClick={onClick}
    >
      <span className="arrow-icon">
        <GrPrevious fontSize="40px" />
      </span>
    </button>
  );
};

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
        <GrNext fontSize="40px" />
      </span>
    </button>
  );
};

function SingleSelect() {
  const desktopSlides = [
    { image: desktopView1, title: "One-of-a-kind luxury villas across Goa" },
    {
      image: desktopView2,
      title: "The absolute finest in global architecture & craftsmanship",
    },
    {
      image: desktopView3,
      title: "A team that cares; smooth-as-silk property management",
    },
    {
      image: desktopView4,
      title: "A legacy that appreciates & gives back over time",
    },
  ];

  const mobileSlides = [
    { image: mobileView1, title: "One-of-a-kind luxury villas across Goa" },
    {
      image: mobileView2,
      title: "The absolute finest in global architecture & craftsmanship",
    },
    {
      image: mobileView3,
      title: "A team that cares; smooth-as-silk property management",
    },
    {
      image: mobileView4,
      title: "A legacy that appreciates & gives back over time",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 500);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;
  // const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    // Start autoplay after a delay to ensure the first slide is viewed initially
    // const autoplayTimeout = setTimeout(() => {
    //   setAutoplay(true); // Enable autoplay after delay
    // }, 2000); // Adjust delay as needed
    // return () => clearTimeout(autoplayTimeout);
  }, []);
  const settings = {
    infinite: true,
    speed: 3000,
    autoplay: true,
    // fade: true,
    autoplaySpeed: 4000,
    dots: false,
    pauseOnHover: false,
    slidesToShow: 1,
    waitForAnimate: false,
    nextArrow: (
      <NextArrow slideCount={slides.length} currentSlide={currentSlide} />
    ),
    prevArrow: <PreviousArrow currentSlide={currentSlide} />,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <motion.section
      className="text-change intro-image flip-mob bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Goa"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="intro-image-container intro-image-container-2">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <motion.div
                className="image-container image-zoom image-container-single-select"
                style={{
                  backgroundImage: `url(${slide.image.src || slide.image})`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              ></motion.div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="intro-image-footer intro-section-titles">
        <div className="wrapper">
          <div className="inner-container">
            <motion.div
              className="left left-title-single-select"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {`${slides[currentSlide].title} `}
            </motion.div>
            <motion.div
              className="center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            ></motion.div>
            <motion.div
              className="right"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="title-homepage">
                <span className="comment">//</span>{" "}
                <span className="text text-singular">SINGULAR SELECT</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default SingleSelect;
