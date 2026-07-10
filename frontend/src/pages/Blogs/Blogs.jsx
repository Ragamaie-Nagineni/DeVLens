import { useState , useEffect} from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlogControls from "../../components/Blogs/BlogControls";
import "./Blogs.css";
import FeaturedBlog from "../../components/blogs/FeaturedBlog";
import axios from "axios";
import BlogList from "../../components/blogs/BlogList";

function Blogs() {
  const [collapsed, setCollapsed] = useState(false);
  const [blogs, setBlogs] = useState([]);
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

          <BlogControls />
          <FeaturedBlog blog={blogs[0]} />
          <BlogList blogs={blogs.slice(1)} />

        </div>

      </div>
    </div>
  );
}

export default Blogs;