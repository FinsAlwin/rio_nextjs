/* eslint-disable react/prop-types */
function BlogPostDetails({ blogPostData }) {
  // Pass blogPostData as a prop
  if (!blogPostData) {
    // Handle missing data gracefully
    return <p>Loading blog post...</p>;
  }

  const { post_title, post_content, post_image_name, display_date } =
    blogPostData.blog_post_details || {}; // Destructure nested data

  return (
    <section
      className="text-change sidebar-container bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Blog"
    >
      <div className="wrapper">
        <div className="inner-container">
          <div className="top-blank-section h-10"></div>
          <div className="sidebar-wrapper">
            <div className="left">
              <div className="content-container blog-meta">
                {/* <div className="blog-meta-col">
                  <p className="desc">saranya</p>
                </div> */}
                <div className="blog-meta-col">
                  <p className="desc">Posted: {display_date}</p>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="blog-single-post-container sb-custom">
                <h2>{post_title}</h2>
                <img src={post_image_name} alt="DIY Floating Shelf" />
                <div dangerouslySetInnerHTML={{ __html: post_content }} />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogPostDetails;
