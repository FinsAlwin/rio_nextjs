import Link from "next/link";

const BlogItem = ({ blog }) => {
  const blogPostId = blog.blog_post_id;
  const postURLId = blog.post_url;

  return (
    <Link href={postURLId || "/blog/"} style={{ textDecoration: "none" }}>
      <div className="blog-item">
        {/* Remove the unnecessary anchor tag (a) with href */}
        <div className="image-container">
          <img src={typeof blog.post_image_name === 'string' ? blog.post_image_name : (blog.post_image_name?.src || '/placeholder.jpg')} alt={blog.post_url} />
        </div>
        <div className="content-container">
          <h3 className="title" style={{ color: "black" }}>
            {blog.post_title}
          </h3>
          <div className="bottom-alt">
            {/* <p className="author">by {blog.author}</p> */}
            <p className="date">on {blog.display_date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
