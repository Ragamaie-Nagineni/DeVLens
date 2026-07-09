import BlogCard from "./BlogCard";
import "./BlogList.css";

function BlogList({ blogs }) {
  return (
    <div className="blog-grid">
      {blogs.map((blog, index) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          index={index}
        />
      ))}
    </div>
  );
}

export default BlogList;