"use client";
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import Link from "next/link";
import "./PropertyBlogSlider.css";
import { fetchDataPost } from "../../utils/fetchData";
import endpoints from "../../config/endpoints";

const PreviousArrow = ({ className, onClick, currentSlide }) => (
  <button
    className={`${className} custom-arrow property-arrow-prev-blog  ${
      currentSlide === 0 ? "slick-disabled" : ""
    }`}
    aria-label="Previous"
    type="button"
    aria-disabled={currentSlide === 0}
    onClick={onClick}
  >
    <span className="arrow-icon">
      <GrPrevious style={{ color: "#fff", fontSize: "45px" }} />
    </span>
  </button>
);

const NextArrow = ({ className, onClick, slideCount, currentSlide }) => (
  <button
    className={`${className} custom-arrow property-arrow-next-blog  ${
      currentSlide === slideCount - 1 ? "slick-disabled" : ""
    }`}
    aria-label="Next"
    type="button"
    aria-disabled={currentSlide === slideCount - 1}
    onClick={onClick}
  >
    <span className="arrow-icon">
      <GrNext style={{ color: "#fff", fontSize: "45px" }} />
    </span>
  </button>
);

const PropertyBlogSlider = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bgImageStyle, setBgImageStyle] = useState({});

  const fetchBlogPosts = async () => {
    try {
      const url = `${endpoints.getProperties}`;
      const response = await fetchDataPost(url);

      if (response && response.response_data && response.response_data.blog_posts) {
        setBlogPosts(
          Array.isArray(response.response_data.blog_posts)
            ? response.response_data.blog_posts
            : []
        );
      } else {
        console.warn("Blog posts data not found or API endpoint not available");
        setBlogPosts([]);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setBlogPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBackgroundStyle = () => {
    const width = window.innerWidth;
    const backgroundSize = width < 780 ? "cover" : "66%";
    const backgroundPosition = width < 780 ? "center" : "left center";

    setBgImageStyle({
      backgroundSize,
      backgroundPosition,
      height: "100%",
      width: "100%",
      backgroundRepeat: "no-repeat",
    });
  };

  useEffect(() => {
    fetchBlogPosts();
    updateBackgroundStyle();
    window.addEventListener("resize", updateBackgroundStyle);

    return () => {
      window.removeEventListener("resize", updateBackgroundStyle);
    };
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    draggable: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true,
          pauseOnFocus: true,
          pauseOnDotsHover: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true,
          pauseOnFocus: true,
          pauseOnDotsHover: true,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true,
          pauseOnFocus: true,
          pauseOnDotsHover: true,
        },
      },
    ],
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="text-change property-slider-container  bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Blog"
    >
      <Slider {...settings}>
        {blogPosts.map((post) => (
          <div key={post.blog_post_id} className="projects-dual bgblack">
            <div className="projects-container">
              <div className="left">
                <div className="content-container property-blog-slider">
                  <div className="content align-left">
                    <h2 className="title uppercase">{post.post_title}</h2>
                    <div className="image-property-blog-slider">
                      <Link
                        href={post.post_url || "/blog/"}
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="image"
                          style={{
                            ...bgImageStyle,
                            backgroundImage: `url(${typeof post.post_image_name === 'string' ? post.post_image_name : (post.post_image_name?.src || '/placeholder.jpg')})`,
                          }}
                        />
                      </Link>
                    </div>
                    <p className="desc">{post.post_content}</p>
                    <div className="btn-container center">
                      <Link href={post.post_url || "/blog/"} className="btn white">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Link href={post.post_url || "/blog/"} style={{ cursor: "pointer" }}>
                  <div
                    className="image"
                    style={{
                      ...bgImageStyle,
                      backgroundImage: `url(${typeof post.post_image_name === 'string' ? post.post_image_name : (post.post_image_name?.src || '/placeholder.jpg')})`,
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PropertyBlogSlider;
