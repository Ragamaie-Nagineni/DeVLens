
import {
  FaUserCircle,
  FaGithub,
  FaBell
} from "react-icons/fa";
import "./ProfileAccount.css"

function ProfileAccount() {
  return (
    <div className="profile-container">

      {/* ================= Profile ================= */}

      <div className="profile-card">

        <div className="card-title">
          <FaUserCircle className="title-icon" />

          <div>
            <h2>Profile Information</h2>
            <p>Update your personal information</p>
          </div>
        </div>

        <div className="avatar-section">

          <div className="avatar-user">
            AJ
          </div>

          <button className="change-avatar">
            Change Avatar
          </button>

        </div>

        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Alex Johnson"
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="alex@example.com"
          />
        </div>

        <button className="save-btn">
          Save Changes
        </button>

      </div>

      {/* ================= GitHub ================= */}

      <div className="profile-card">

        <div className="card-title">
          <FaGithub className="title-icon" />

          <div>
            <h2>GitHub Integration</h2>
            <p>Manage your connected GitHub account</p>
          </div>
        </div>

        <div className="form-group">

          <label>GitHub Username</label>

          <div className="github-input">

            <FaGithub />

            <input
              type="text"
              value="alexjohnson"
              readOnly
            />

          </div>

        </div>

        <div className="github-info">

          <div>

            <h4>@alexjohnson</h4>

            <span className="connected">
              ● Connected
            </span>

          </div>

          <button className="disconnect-btn">
            Disconnect
          </button>

        </div>

        <p className="scope-text">
          Access scopes: repo, read:org, read:user
        </p>

      </div>

      {/* ================= Notifications ================= */}

      <div className="profile-card">

        <div className="card-title">

          <FaBell className="title-icon" />

          <div>
            <h2>Notifications</h2>
            <p>Manage notification preferences</p>
          </div>

        </div>

        <div className="notification-row">

          <div>

            <h4>Analysis Complete</h4>

            <p>
              Notify when repository analysis finishes.
            </p>

          </div>

          <label className="switch">

            <input type="checkbox" defaultChecked />

            <span className="slider"></span>

          </label>

        </div>

        <div className="notification-row">

          <div>

            <h4>Weekly Digest</h4>

            <p>
              Receive a weekly summary of your repositories.
            </p>

          </div>

          <label className="switch">

            <input type="checkbox" defaultChecked />

            <span className="slider"></span>

          </label>

        </div>

        <div className="notification-row">

          <div>

            <h4>Product Updates</h4>

            <p>
              Receive DevLens feature announcements.
            </p>

          </div>

          <label className="switch">

            <input type="checkbox" />

            <span className="slider"></span>

          </label>

        </div>

      </div>

    </div>
  );
}

export default ProfileAccount;