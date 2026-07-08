import { useState } from "react";
import { CalendarDays, SlidersHorizontal } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  return (
    <div className="blog-controls">

      <div className="blog-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-chip ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="sort-wrapper">

        <button
          className="sort-btn"
          onClick={() => setOpen(!open)}
        >
          <SlidersHorizontal size={16} />
          <CalendarDays size={16} />
          <span>{selectedSort}</span>
        </button>

        {open && (
          <div className="sort-menu">

            {sortOptions.map((option) => (
              <button
                key={option}
                className={`sort-item ${
                  selectedSort === option ? "selected" : ""
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
  );
}

export default BlogControls;