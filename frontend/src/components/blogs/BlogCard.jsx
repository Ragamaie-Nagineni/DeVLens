import { FaEye, FaHeart, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./BlogCard.css";

function BlogCard({ blog, index }) {

    const navigate = useNavigate();

    return (

        <div
            className="blog-card"
            style={{ animationDelay: `${index * 0.08}s` }}
            onClick={() => navigate(`/blogs/${blog.id}`)}
        >

            <div className="blog-image-wrapper">

                <img
                    src={blog.cover_image_url}
                    alt={blog.title}
                    className="blog-image"
                />

                <span className="blog-category">
                    {blog.category}
                </span>

            </div>

            <div className="blog-body">

                <h3>{blog.title}</h3>

                <div className="blog-tags">

                    {blog.tags?.map((tag) => (
                        <span key={tag}>
                            #{tag}
                        </span>
                    ))}

                </div>

                <div className="blog-footer">

                    <div className="blog-stats">

                        <span>
                            <FaHeart />
                            {blog.likes_count}
                        </span>

                        <span>
                            <FaEye />
                            {blog.views}
                        </span>

                    </div>

                    <span className="blog-date">

                        {new Date(blog.published_at).toLocaleDateString()}

                    </span>

                </div>

                <div className="blog-read">

                    Read Article

                    <FaArrowRight />

                </div>

            </div>

        </div>

    );

}

export default BlogCard;