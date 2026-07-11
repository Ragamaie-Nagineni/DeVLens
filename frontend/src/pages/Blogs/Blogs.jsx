import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlogControls from "../../components/Blogs/BlogControls";
import "./Blogs.css";
import FeaturedBlog from "../../components/blogs/FeaturedBlog";
import axios from "axios";
import BlogList from "../../components/blogs/BlogList";
import { CalendarDays } from "lucide-react";
function Blogs() {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState({
  label: "Latest",
  icon: CalendarDays,
});
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/blogs"
      );

      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" ||
      blog.category === selectedCategory;

    const search = searchQuery.toLowerCase();

    const matchesSearch =
      blog.title.toLowerCase().includes(search) ||
      blog.content.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  const sortedBlogs = [...filteredBlogs];

  switch (selectedSort.label) {
    case "Latest":
      sortedBlogs.sort(
        (a, b) =>
          new Date(b.published_at) - new Date(a.published_at)
        // or use created_at if that's what you prefer
      );
      break;

    case "Most Liked":
      sortedBlogs.sort(
        (a, b) => b.likes_count - a.likes_count
      );
      break;

    case "Most Viewed":
      sortedBlogs.sort(
        (a, b) => b.views - a.views
      );
      break;

    default:
      break;
  }

  return (
    <div>
      <Header />

      <div className="blogs">

        <Sidebar
          collapsed={collapsed}
          setcollapsed={setCollapsed}
        />

        <div
          className={
            collapsed
              ? "blogs-content collapsed"
              : "blogs-content"
          }
        >

          {/* <div className="blogs-header">

            <h1>DevLens Engineering Blog</h1>
            <p>
              Deep dives into repository analysis, AI for software engineering,developer productivity, and the architecture powering DevLens.
            </p>

          </div> */}

          <BlogControls
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
          <FeaturedBlog blog={sortedBlogs[0]} />

          <BlogList
            blogs={sortedBlogs.slice(1)}
          />
        </div>

      </div>
    </div>
  );
}

export default Blogs;