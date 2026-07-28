import axios from "axios";
import {
    FaUserCircle,
    FaGithub,
    FaBell
} from "react-icons/fa";
import "./ProfileAccount.css";
import "../SharedSettings.css";
import { useEffect, useState } from "react";

function ProfileAccount() {
    const [user, setUser] = useState({
        username: "",
        email: ""
    });

    useEffect(() => {

        const fetchUser = async () => {

            try {
                const token = localStorage.getItem("token");
                console.log("Token:", token);

                const response = await axios.get(
                    "http://localhost:3000/api/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("User:", response.data);

                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);

    const handleSave = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.put(
                "http://localhost:3000/api/auth/me",
                {
                    username: user.username,
                    email: user.email
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(response.data.user);

            alert("Profile updated!");

        } catch (err) {

            console.error(err);

        }

    };

    return (
        <div className="profile-container">

            {/* ================= Profile ================= */}

            <div className="settings-card">

                <div className="settings-title">
                    <FaUserCircle className="settings-icon" />

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

                <div className="settings-form">
                    <label>Full Name</label>

                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                username: e.target.value
                            })
                        }
                    />
                </div>

                <div className="settings-form">
                    <label>Email Address</label>

                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                email: e.target.value
                            })
                        }
                    />
                </div>

                <button className="settings-btn" onClick={handleSave}>
                    Save Changes
                </button>

            </div>

            {/* ================= GitHub ================= */}

            <div className="settings-card">

                <div className="settings-title">
                    <FaGithub className="settings-icon" />

                    <div>
                        <h2>GitHub Integration</h2>
                        <p>Manage your connected GitHub account</p>
                    </div>
                </div>

                <div className="settings-form">

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

            <div className="settings-card">

                <div className="settings-title">

                    <FaBell className="settings-icon" />

                    <div>
                        <h2>Notifications</h2>
                        <p>Manage notification preferences</p>
                    </div>

                </div>

                <div className="settings-row">

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

                <div className="settings-row">

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

                <div className="settings-row">

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