"use client";
import thumbnailImage from "../../assets/homepage_images/Website.webp";
import thumbnailImageMobile from "../../assets/homepage_images/new_image_phone.webp";

// import { Rings } from "react-loader-spinner";
// import desktopVideo from "../../assets/videos/RIO_Landing_video.mov"; // Moved to public directory

import { RxDoubleArrowDown } from "react-icons/rx";
import "./Hero.css";
import { useEffect, useState } from "react";

function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    // Initialize mobile view state
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        isMobileView ? "videoPlayerMobile" : "videoPlayerDesktop"
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
  }, [isMobileView]);

  return (
    <section
      id="top"
      className="text-change intro-video bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Goa"
    >
      <div className="video-container">
        {isLoading && (
          <img
            src={isMobileView ? (thumbnailImageMobile.src || thumbnailImageMobile) : (thumbnailImage.src || thumbnailImage)}
            alt="Loading Thumbnail"
            className="thumbnail-poster"
          />
        )}
        <div
          className={`video-item-wrapper hero-zoom ${
            isLoading ? "hidden" : ""
          }`}
        >
          {isMobileView ? (
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
              <source src="/RIO_Landing_video.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <video
              key="desktop-video"
              className="video-item desktop"
              id="videoPlayerDesktop"
              loop
              muted
              autoPlay
              playsInline
              poster={thumbnailImage.src || thumbnailImage}
            >
              <source src="/RIO_Landing_video.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      <div className="scroll-down-wrapper">
        <div className="scroll-down-container">
          <div className="scroll-down-icon">
            <RxDoubleArrowDown className="animated-arrow" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
