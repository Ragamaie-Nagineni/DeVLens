import react from "react";
import Logo from "../../assets/Logo.png";
import "./Header.css"
import { FiSearch, FiBell } from "react-icons/fi";

function Header() {
  return (
    <div className="header">
      <div className="logo-section">
        <img src={Logo} className="logo" alt="DevLens Logo" />
        <h2>
          De<span className="accent">V</span>Lens
        </h2>
      </div>

      <div className="header-right">
        <div className="welcome-section">
          <p>Welcome back, John!</p>
        </div>

        <div className="search-bar">
          <FiSearch />
          <input type="text" placeholder="Search..." />
        </div>

        <div className="streak">
          <span className="fire">🔥</span>
          <span>0 Day Streak</span>
        </div>

        <div className="notification">
          <FiBell size={18} />
          <span className="badge">3</span>
        </div>

        <div className="profile">
          <div className="avatar">JD</div>
        </div>
      </div>
    </div>
  )
}

export default Header;