"use client";
import { useState, useEffect, useRef } from "react";
import BlogItem from "../BlogItem/BlogItem";
import "./BlogSection.css";
import endpoints from "../../config/endpoints";
import { fetchDataPost } from "../../utils/fetchData";
import { showToastError } from "../../utils/toast";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const limit = 10;

  const blogRefs = useRef({}); // Ref for individual blog items
  const scrollToBlogIdRef = useRef(null); // To store newly loaded blog ID

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      setFetchError(null);

      try {
        const offset = (currentPage - 1) * limit;
        const data = { offset, limit };

        console.log("Fetching blogs with data:", data);
        const response = await fetchDataPost(endpoints.getBlogs, data);
        console.log("Blog API response:", response);

        if (!response || response.status.toLowerCase() !== "success") {
          throw new Error("API request failed");
        }

        const { response_data } = response;

        if (response_data && response_data.blog_posts) {
          console.log("Blog posts found:", response_data.blog_posts.length);
          if (currentPage === 1) {
            setBlogs(response_data.blog_posts);
          } else {
            setBlogs((prevBlogs) => [
              ...prevBlogs,
              ...response_data.blog_posts,
            ]);
          }

          // Store ID of first newly loaded blog
          scrollToBlogIdRef.current = response_data.blog_posts[0]?.blog_post_id;

          // Check if more blogs can be loaded
          const hasMore = response_data.load_more === "y";
          setShowLoadMore(hasMore);
        } else {
          console.log("No blog posts in response data");
          // Temporary fallback for testing
          const fallbackBlogs = [
            {
              blog_post_id: 1,
              post_title: "Test Blog Post 1",
              post_content: "This is a test blog post",
              post_image_name: "/blogs_images/blog_image_footer.webp",
              post_url: "/blog/test-1",
              display_date: "January 15, 2024",
              author: "RIO Team"
            },
            {
              blog_post_id: 2,
              post_title: "Test Blog Post 2", 
              post_content: "This is another test blog post",
              post_image_name: "/properties_image/blog1.webp",
              post_url: "/blog/test-2",
              display_date: "January 10, 2024",
              author: "RIO Team"
            }
          ];
          console.log("Using fallback blogs:", fallbackBlogs);
          setBlogs(fallbackBlogs);
          setShowLoadMore(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setFetchError(error.message);
        showToastError("Error fetching blogs: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  // Scroll to the newly loaded blog
  useEffect(() => {
    const scrollToBlogId = scrollToBlogIdRef.current;

    if (scrollToBlogId && blogRefs.current[scrollToBlogId]) {
      const blogElement = blogRefs.current[scrollToBlogId];
      const container = document
        .querySelector("[data-sidebar-title='Blog']")
        .closest("div[style]");

      if (container && blogElement) {
        const containerTop = container.getBoundingClientRect().top;
        const blogTop = blogElement.getBoundingClientRect().top;
        const scrollOffset = blogTop - containerTop + container.scrollTop;

        container.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });
      }

      scrollToBlogIdRef.current = null;
    }
  }, [blogs]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <section
      id="top"
      className="text-change blog-section bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Blog"
    >
      <div className="wrapper">
        <div className="inner-container">
          <div className="top-blank-section h-10 center">
            <div className="title-container">
              <h2 className="text-black">Blog</h2>
            </div>
          </div>

          <div className="blogs-container sb-custom">
            <div className="blogs-wrapper">
              {isLoading && blogs.length === 0 ? (
                <p>Loading blogs...</p>
              ) : fetchError ? (
                <p>Error fetching blogs: {fetchError}</p>
              ) : blogs.length === 0 ? (
                <p>No blogs found. Debug: blogs.length = {blogs.length}, isLoading = {isLoading.toString()}, fetchError = {fetchError || 'null'}</p>
              ) : (
                blogs.map((blog) => (
                  <div
                    key={blog.blog_post_id}
                    ref={(el) => {
                      blogRefs.current[blog.blog_post_id] = el;
                    }}
                  >
                    <BlogItem blog={blog} />
                  </div>
                ))
              )}
            </div>

            {showLoadMore && (
              <div className="btn-load-more">
                <button
                  className="load-more"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
