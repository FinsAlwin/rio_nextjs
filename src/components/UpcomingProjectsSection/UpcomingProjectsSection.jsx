"use client";
import { useEffect, useRef, useState } from "react";
// import DubaiVideo from "../../assets/dubai_and_phuket_video/Dubai.mp4";
// import PhuketVideo from "../../assets/dubai_and_phuket_video/Thailand.mp4";
import DubaiThumbnail from "../../assets/dubai_and_phuket_video/dubai_image.webp";
import PhuketThumbnail from "../../assets/dubai_and_phuket_video/phuket_image.webp";

const UpcomingProjectsSection = () => {
  const dubaiVideoRef = useRef(null);
  const phuketVideoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [isDubaiInView, setIsDubaiInView] = useState(false);
  const [isPhuketInView, setIsPhuketInView] = useState(false);
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
  useEffect(() => {
    // Intersection Observer to detect when videos are in the viewport
    const observerOptions = {
      root: null, // observe the viewport
      rootMargin: "0px",
      threshold: 0.25, // Start loading the video when 25% of the video is in view
    };

    const dubaiObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsDubaiInView(true); // Load and play the Dubai video
      }
    }, observerOptions);

    const phuketObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsPhuketInView(true); // Load and play the Phuket video
      }
    }, observerOptions);

    if (dubaiVideoRef.current) {
      dubaiObserver.observe(dubaiVideoRef.current);
    }

    if (phuketVideoRef.current) {
      phuketObserver.observe(phuketVideoRef.current);
    }

    // Cleanup observers when component unmounts
    return () => {
      dubaiObserver.disconnect();
      phuketObserver.disconnect();
    };
  }, []);

  // Function to play video once it's loaded
  const handleVideoPlay = (videoRef) => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const imageRef = useRef(null);
  const imageRef2 = useRef(null);
  useEffect(() => {
    // Create an intersection observer to detect when the image is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-image-active"); // Add active class when in view
        } else {
          entry.target.classList.remove("reveal-image-active"); // Remove active class when out of view
        }
      },
      { threshold: 0.25 } // Trigger when 50% of the image is in view
    );

    if (imageRef.current) {
      observer.observe(imageRef.current); // Start observing the image
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current); // Stop observing the image when component unmounts
      }
    };
  }, []);
  useEffect(() => {
    // Create an intersection observer to detect when the image is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-image-active"); // Add active class when in view
        } else {
          entry.target.classList.remove("reveal-image-active"); // Remove active class when out of view
        }
      },
      { threshold: 0.25 } // Trigger when 50% of the image is in view
    );

    if (imageRef2.current) {
      observer.observe(imageRef2.current); // Start observing the image
    }

    return () => {
      if (imageRef2.current) {
        observer.unobserve(imageRef2.current); // Stop observing the image when component unmounts
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`text-change default-height upcoming bgblack scroll-smooth sticky snap-scroll `}
      data-sidebar-title="Overseas"
    >
      <div className="wrapper">
        <div className="inner-container">
          <div className="upcoming-container">
            <div className="header">
              <div className="title-container">
                <h3 className="title">SUMMON WHAT YOU SEEK</h3>
              </div>
              <div className="line"></div>
            </div>
            <div className="upcoming-projects-container">
              <a href="https://www.riophuket.com/" target="_blank">
                <div
                  ref={imageRef}
                  className={`image-container scaleup image reveal-image reveal-image-active `}
                >
                  {/* Lazy load Dubai video */}
                  <img
                    // ref={dubaiVideoRef}
                    // src={isDubaiInView ? DubaiVideo : undefined}
                    // alt="Dubai Project Video"
                    // autoPlay={isDubaiInView} // Autoplay when in view
                    className="phuket-video-section"
                    // loop
                    // muted
                    // playsInline
                    // preload="auto"
                    style={{
                      backgroundImage: `url(${PhuketThumbnail.src || PhuketThumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    // onLoadedData={() => handleVideoPlay(dubaiVideoRef)} // Play once video is loaded
                  />
                  {/* <div className="header flip">
                  <div className="title-container">
                    <h3 className="title">DUBAI</h3>
                  </div>
                  <div className="line"></div>
                </div> */}
                </div>
              </a>
              <a href="https://www.riodubai.co/ " target="_blank">
                <div
                  ref={imageRef2}
                  className={`image-container scaleup image reveal-image reveal-image-active `}
                >
                  {/* Lazy load Phuket video */}
                  <img
                    // ref={phuketVideoRef}
                    // src={isPhuketInView ? PhuketVideo : undefined}
                    // alt="Phuket Project Video"
                    // autoPlay={isPhuketInView} // Autoplay when in view
                    className="dubai-video-section"
                    // loop
                    // muted
                    // playsInline
                    // preload="auto"
                    style={{
                      backgroundImage: `url(${DubaiThumbnail.src || DubaiThumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    // onLoadedData={() => handleVideoPlay(phuketVideoRef)} // Play once video is loaded
                  />
                </div>
              </a>
            </div>
            <div className="header flip">
              <div className="title-container">
                <h3 className="title">Now in PHUKET & DUBAI</h3>
              </div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingProjectsSection;
