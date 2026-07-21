import "./ProfileAccount.css";
import { FaUserCircle, FaGithub } from "react-icons/fa";

function ProfileAccount() {

    return (

        <div className="profile-card">

            <div className="card-title">

                <FaUserCircle className="title-icon"/>

                <div>
                    <h2>Profile & Account</h2>
                    <p>Update your personal information</p>
                </div>

            </div>

            <div className="avatar-section">

                <div className="avatar">

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

                <label>Email</label>

                <input
                    type="email"
                    placeholder="alex@example.com"
                />

            </div>

            <div className="form-group">

                <label>GitHub Username</label>

                <div className="github-input">

                    <FaGithub/>

                    <input
                        type="text"
                        placeholder="alexjohnson"
                    />

                </div>

            </div>

            <button className="save-btn">

                Save Changes

            </button>

        </div>

    );
}

export default ProfileAccount;