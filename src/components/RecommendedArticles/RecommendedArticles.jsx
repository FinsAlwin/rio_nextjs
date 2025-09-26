"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import endpoints from "../../config/endpoints";
import { fetchDataPost } from "../../utils/fetchData";

const RecommendedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendedArticles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${endpoints.getRecommendArticles}`;
      const response = await fetchDataPost(url);

      if (response.status === "success") {
        setArticles(response.response_data.blog_posts);
      } else {
        setError("Error fetching recommended articles");
      }
    } catch (error) {
      console.error("Error fetching recommended articles:", error);
      setError("Error fetching recommended articles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedArticles();
  }, []);

  return (
    <section
      className="text-change blog-section bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Blog"
    >
      <div className="wrapper">
        <div className="inner-container">
          <div className="top-blank-section h-10 center">
            <div className="title-container">
              <h2 className="text-black">Recommended Articles</h2>
            </div>
          </div>

          {isLoading ? (
            <div>Loading recommended articles...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="blogs-container sb-custom">
              <div className="blogs-wrapper">
                {articles.map((article) => (
                  <div className="blog-item" key={article.blog_post_id}>
                    <Link
                      href={article.post_url || "/blog/"} // Ensure URL includes correct post ID
                      style={{ textDecoration: "none" }}
                    >
                      <div className="image-container">
                        <img
                          src={typeof article.post_image_name === 'string' ? article.post_image_name : (article.post_image_name?.src || '/placeholder.jpg')}
                          alt={article.post_title}
                        />
                      </div>

                      <div className="content-container">
                        <h3 className="title" style={{ color: "black" }}>
                          {article.post_title}
                        </h3>
                        <div className="bottom-alt">
                          {article.author && (
                            <p className="author">by {article.author}</p>
                          )}
                          <p className="date">on {article.display_date}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecommendedArticles;
