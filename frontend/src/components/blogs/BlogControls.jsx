import { useState } from "react";
import { CalendarDays, SlidersHorizontal, Search } from "lucide-react";
import "./BlogControls.css";

const categories = [
  "All",
  "Engineering",
  "AI & ML",
  "Best Practices",
  "Technology",
  "DevOps",
  "Team Management",
];

const sortOptions = [
  "Latest",
  "Most Liked",
  "Most Viewed",
];

function BlogControls() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="blog-controls">
      <div className="upper-part">
        <div className="blog-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

        </div>

        <div className="sort-wrapper">

          <button
            className="sort-btn"
            onClick={() => setOpen(!open)}
          >
            <SlidersHorizontal size={14} />
            <CalendarDays size={14} />
            <span>{selectedSort}</span>
          </button>

          {open && (
            <div className="sort-menu">

              {sortOptions.map((option) => (
                <button
                  key={option}
                  className={`sort-item ${selectedSort === option ? "selected" : ""
                    }`}
                  onClick={() => {
                    setSelectedSort(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}

            </div>
          )}

        </div>
      </div>
      <div className="blog-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-chip ${selectedCategory === category ? "active" : ""
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

    </div>
  );
}

export default BlogControls;