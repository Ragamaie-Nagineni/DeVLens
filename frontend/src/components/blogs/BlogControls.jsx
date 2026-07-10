import { useState } from "react";
import "./BlogControls.css";
import {
  CalendarDays,
  Heart,
  Eye,
  SlidersHorizontal,
  Search,
} from "lucide-react";

const categories = [
  "All",
  "Software Architecture",
  "Repository Analysis",
  "Dependency Graphs",
  "AST Parsing",
  "AI for Software Engineering",
];

const sortOptions = [
  {
    label: "Latest",
    icon: CalendarDays,
  },
  {
    label: "Most Liked",
    icon: Heart,
  },
  {
    label: "Most Viewed",
    icon: Eye,
  },
];

function BlogControls({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort
}) {

  const [open, setOpen] = useState(false);
  const SelectedIcon = selectedSort.icon;
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
            <SelectedIcon size={14} />
            <span>{selectedSort.label}</span>
          </button>

          {open && (
            <div className="sort-menu">

              {sortOptions.map((option) => {
  const Icon = option.icon;

  return (
    <button
      key={option.label}
      className={`sort-item ${
        selectedSort.label === option.label ? "selected" : ""
      }`}
      onClick={() => {
        setSelectedSort(option);
        setOpen(false);
      }}
    >
      <Icon size={16} />
      <span>{option.label}</span>
    </button>
  );
})}
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