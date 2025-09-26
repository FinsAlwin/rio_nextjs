"use client";
import { useEffect, useRef, useState } from "react";
import "./PropertiesIntroSection.css";
import thumbnailImage from "../../assets/homepage_images/Website.webp";
import thumbnailImageMobile from "../../assets/homepage_images/Website.webp";

// import desktopView from "../../assets/properties_video/RIO_Properties_LR.mov"; // Moved to public directory
// import mobileView from "../../assets/properties_video/mobile_view_video.mp4";
import logoWhite from "../../assets/homepage_images/logo-white-2.webp";
import logoDark from "../../assets/homepage_images/logo-dark.webp";
import { RxDoubleArrowDown } from "react-icons/rx";
import { Rings } from "react-loader-spinner";

const PropertiesIntroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 768);
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleVideoLoaded = () => {
      setIsLoading(false);
    };

    const handleVideoError = () => {
      console.warn("Video failed to load, showing thumbnail");
      setIsLoading(false);
    };

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const videoElement = document.getElementById(
        isMobile ? "videoPlayerMobile" : "videoPlayerDesktop"
      );

      if (videoElement) {
        videoElement.addEventListener("loadeddata", handleVideoLoaded);
        videoElement.addEventListener("error", handleVideoError);
        
        // Force reload the video
        videoElement.load();
        
        // Fallback timeout in case video doesn't load
        const fallbackTimer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        
        return () => {
          videoElement.removeEventListener("loadeddata", handleVideoLoaded);
          videoElement.removeEventListener("error", handleVideoError);
          clearTimeout(fallbackTimer);
        };
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isMobile]);
  return (
    <section
      id="top"
      className="text-change intro-image intro-image-new bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Properties"
    >
      <div className="intro-image-container image-vertical-mobile-properties intro-video-properties">
        <div className="image-container hero-zoom">
          {isLoading && (
            <img
              src={isMobile ? (thumbnailImageMobile.src || thumbnailImageMobile) : (thumbnailImage.src || thumbnailImage)}
              alt="Loading Thumbnail"
              className="thumbnail-poster"
            />
          )}
          {isMobile ? (
            <video
              key="mobile-video"
              className="video-item mobile"
              id="videoPlayerMobile"
              loop
              muted
              autoPlay
              playsInline
              poster={thumbnailImageMobile.src || thumbnailImageMobile}
            >
                <source src="/RIO_Properties_LR.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <video
              key="desktop-video"
              className="video-item desktop video-of-desktop video-desktop-property"
              id="videoPlayerDesktop"
              loop
              muted
              autoPlay
              playsInline
              poster={thumbnailImage.src || thumbnailImage}
              ref={videoRef}
            >
                <source src="/RIO_Properties_LR.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="scroll-down-wrapper scroll-down-properties-intro">
          <div className="scroll-down-container">
            <div className="scroll-down-icon">
              <RxDoubleArrowDown className="animated-arrow" />
            </div>
          </div>
        </div>
      </div>

      <div className="intro-image-footer bgblack">
        <div className="wrapper">
          <div className="inner-container">
            <div className="left zoomout" data-sr-id="55">
              <div className="logo ">
                <img
                  src={logoWhite.src || logoWhite}
                  alt=""
                  className="logo-white logo-white-properties"
                />
                <img src={logoDark.src || logoDark} alt="" className="logo-dark" />
              </div>
            </div>
            <div className="center zoomout" data-sr-id="56"></div>
            <p className="title-homepage">
              <span className="comment">//</span>{" "}
              <span className="text">SINGULAR SELECT</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesIntroSection;
