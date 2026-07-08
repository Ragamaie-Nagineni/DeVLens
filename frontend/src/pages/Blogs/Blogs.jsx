import { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlogControls from "../../components/Blogs/BlogControls";
import "./Blogs.css";

function Blogs() {
  const [collapsed, setCollapsed] = useState(false);

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

          <div className="blogs-header">

            <h1>DevLens Engineering Blog</h1>

            <p>
              Deep dives into repository analysis, AI for software engineering,
              developer productivity, and the architecture powering DevLens.
            </p>

          </div>

          <BlogControls />

          {/* Featured Blog */}

          {/* Blog Grid */}

        </div>

      </div>
    </div>
  );
}

export default Blogs;