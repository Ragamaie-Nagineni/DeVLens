import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "highlight.js/styles/github-dark.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";

import "./BlogDetails.css";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/blogs/${id}`
      );

      setBlog(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="blog-loading">
        Loading article...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-loading">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="blog-details">

      <div className="blog-hero">

        <img
          src={blog.cover_image_url}
          alt={blog.title}
        />

        <div className="blog-overlay">

          <button
            className="back-btn"
            onClick={() => navigate("/blogs")}
          >
            <FaArrowLeft />
            Back to Blogs
          </button>

        </div>

      </div>

      <div className="blog-container">

        <span className="blog-category">
          {blog.category}
        </span>

        <h1>{blog.title}</h1>

        <div className="blog-meta">

          <div>

            <strong>{blog.author_name}</strong>

          </div>

          <span>
            <FaCalendarAlt />
            {new Date(blog.published_at).toLocaleDateString()}
          </span>

          <span>
            <FaEye />
            {blog.views}
          </span>

          <span>
            <FaHeart />
            {blog.likes_count}
          </span>

        </div>

        <div className="blog-tags">

          {blog.tags?.map(tag => (
            <span key={tag}>
              #{tag}
            </span>
          ))}

        </div>

        <div className="blog-actions">

          <button>

            <FaBookmark />

            Bookmark

          </button>

        </div>

        <article className="markdown-body">

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {blog.content}
          </ReactMarkdown>

        </article>

      </div>

    </div>
  );
}

export default BlogDetails;