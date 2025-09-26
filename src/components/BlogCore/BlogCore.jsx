"use client";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useRef, useState } from "react";
import RecommendedArticles from "../RecommendedArticles/RecommendedArticles";
import { showToastError } from "../../utils/toast";
import endpoints from "../../config/endpoints";
import { fetchDataPost } from "../../utils/fetchData";
// import { useParams } from "react-router-dom"; // Removed for Next.js
import BlogPostDetails from "../BlogPostDetails/BlogPostDetails";
import DynamicMeta from "../DynamicMeta/DynamicMeta";
import SliderBar from "../SliderBar/SliderBar";
// import createScrollSnap from "scroll-snap"; // Conditional import to prevent SSR issues
import WhatsAppPopup from "../WhatsAppPopup/WhatsAppPopup";

// Function to strip HTML tags from the content
const stripHTMLTags = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

function BlogCore({ postURLId }) {
  const [logoType, setLogoType] = useState("logo-dark");
  const [blogDetails, setBlogDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blogPostData, setBlogPostData] = useState(null);
  const [sidebarTitle, setSidebarTitle] = useState("Blog");
  const containerRef = useRef(null);
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-logo-type]");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust the threshold as needed
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
    const initializeScrollSnap = () => {
      if (containerRef.current) {
        const element = containerRef.current;
        console.log(element);

        // Initialize scroll snap on the container
        try {
            // Scroll snap disabled
            // if (element && typeof window !== "undefined") {
            //   // Dynamic import to prevent SSR issues
            //   import("scroll-snap").then(({ default: createScrollSnap }) => {
            //   const snapInstance = createScrollSnap(element, {
            //     snapDestinationX: "0%",
            //     snapDestinationY: "100%",
            //     timeout: 100,
            //     duration: 300,
            //     threshold: 0.1,
            //   });
            //   if (element.style) {
            //     element.style.scrollSnapType = "y mandatory";
            //   }
            //   snapInstance.bind();
            //
            //   // Cleanup if needed on unmount
            //   return () => {
            //     snapInstance.unbind();
            //   };
            // }).catch((error) => {
            //   console.warn("ScrollSnap import error:", error);
            // });
            // }
        } catch (error) {
          console.warn("ScrollSnap error:", error);
        }
      }
    };

    // Using setTimeout to ensure DOM is ready
    if (typeof window !== "undefined") {
      setTimeout(() => {
        initializeScrollSnap();
      }, 200); // Delay of 100ms to ensure the DOM is fully rendered
    }
  }, [containerRef]);
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
    const fetchBlogDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = { post_url: `/blog/${postURLId}/` };
        const url = `${endpoints.getBlogsDetails}`;

        const response = await fetchDataPost(url, data);
        setBlogDetails(response.response_data);
        setBlogPostData(response.response_data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setError("Error fetching blog details");
        showToastError("error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetails();
  }, [postURLId]);

  if (isLoading) {
    return <div>Loading blog details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogDetails) {
    return <div>Blog details not found.</div>;
  }

  // Strip HTML from post_content for meta description
  const description = blogDetails
    ? stripHTMLTags(blogDetails?.blog_details?.meta_description || blogDetails?.blog_details?.post_content || "").slice(
        0,
        160
      )
    : "";
  const canonicalUrl = blogDetails?.blog_details?.canonical_url || "";
  const title = blogDetails?.blog_details?.meta_title;

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <>
        {/* Pass the cleaned-up description to DynamicMeta */}
        <DynamicMeta
          title={title}
          description={description}
          canonicalUrl={canonicalUrl}
        />
        <Header logoType={logoType} />
        <section data-logo-type="logo-dark" data-sidebar-title="Blog">
          {blogPostData && <BlogPostDetails blogPostData={blogPostData} />}
        </section>
        <section data-logo-type="logo-dark-v" data-sidebar-title="Blog">
          <RecommendedArticles recommendedPosts={blogDetails?.recommended_posts} />
        </section>
        <section data-logo-type="logo-dark">
          <Footer />
        </section>
        <WhatsAppPopup />
        <SliderBar sidebarTitle={sidebarTitle} />
      </>
    </div>
  );
}

export default BlogCore;
