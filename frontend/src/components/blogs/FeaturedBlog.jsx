import { FaEye, FaHeart, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./FeaturedBlog.css";

function FeaturedBlog({ blog }) {
  const navigate = useNavigate();

  if (!blog) return null;

  return (
    <div
      className="featured-blog"
      onClick={() => navigate(`/blogs/${blog.id}`)}
    >
      <div className="featured-image-container">
        <img
          src={blog.cover_image_url}
          alt={blog.title}
          className="featured-image"
        />

        <span className="featured-badge">
          Featured
        </span>
      </div>

      <div className="featured-content">

        <span className="featured-category">
          {blog.category}
        </span>

        <h2>{blog.title}</h2>

        <p>
          {blog.content.slice(0, 170)}...
        </p>

        <div className="featured-meta">

          <div>
            <FaHeart />
            <span>{blog.likes_count}</span>
          </div>

          <div>
            <FaEye />
            <span>{blog.views}</span>
          </div>

          <span>
            {new Date(blog.published_at).toLocaleDateString()}
          </span>

        </div>

        <div className="featured-read">
          Read Article
          <FaArrowRight />
        </div>

      </div>
    </div>
  );
}

export default FeaturedBlog;