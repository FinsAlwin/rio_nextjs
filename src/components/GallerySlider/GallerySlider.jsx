import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

// Custom styles to hide default slick arrows since we're using custom ones
const sliderStyles = `
  .gallery-slider .slick-arrow:not(.custom-arrow) {
    display: none !important;
  }
  .gallery-slider .custom-arrow {
    z-index: 10;
  }
`;

const GallerySlider = ({ propertyGallery = [] }) => {
  // Custom previous arrow component
  const PreviousArrow = ({ className, onClick, currentSlide }) => {
    return (
      <button
        className={`${className} custom-arrow slick-prev slick-arrow new-arrows-prev ${
          currentSlide === 0 ? "slick-disabled" : ""
        }`}
        aria-label="Previous"
        type="button"
        aria-disabled={currentSlide === 0}
        onClick={onClick}
      >
        <span className="arrow-icon">
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
    );
  };

  // Custom next arrow component
  const NextArrow = ({ className, onClick, slideCount, currentSlide }) => {
    return (
      <button
        className={`${className} custom-arrow slick-next slick-arrow new-arrows-next ${
          currentSlide === slideCount - 1 ? "slick-disabled" : ""
        }`}
        aria-label="Next"
        type="button"
        aria-disabled={currentSlide === slideCount - 1}
        onClick={onClick}
      >
        <span className="arrow-icon">
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: propertyGallery.length > 1,
    speed: 1500,
    autoplay: false, // Disable autoplay to allow manual navigation
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: propertyGallery.length > 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: propertyGallery.length > 1, // Show custom arrows on smaller screens
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: propertyGallery.length > 1, // Show custom arrows on smaller screens
        },
      },
    ],
  };

  // Conditionally render nothing if the gallery is empty
  if (!propertyGallery || propertyGallery.length === 0) {
    return null; // This hides the entire section if there are no images
  }

  return (
    <>
      <style>{sliderStyles}</style>
      <section
        className="text-change property-slider-container gallery-slider scroll-smooth sticky snap-scroll"
        data-sidebar-title={
          propertyGallery[0]?.property_name || "Property Gallery"
        }
      >
        <Slider {...settings} className="single-slider">
          {propertyGallery.map((item, index) => (
            <div key={index} className="gallery-item bgblack">
              <div className="gallery-item-top">
                <div className="image-container">
                <Image
                  src={item.image_name.src || item.image_name}
                  alt={item.image_title || "Property Image"}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                </div>
              </div>
              <div className="gallery-item-bottom">
                <div className="gallery-content-left">
                  <h3 className="title">{item.image_title}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
};

export default GallerySlider;
