import react from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Settings.css"
import Header from "../../components/Header/Header";
import ProfileAccount from "../../components/ProfileAccount/ProfileAccount";

function Settings() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Header />

            <div className="settings">

                <Sidebar
                    collapsed={collapsed}
                    setcollapsed={setCollapsed}
                />

                <div className={collapsed ? "settings-content collapsed" : "settings-content"}>

                    <div className="settings-header">
                        <h1>Settings</h1>
                        <p>Manage your account and preferences</p>
                    </div>

                    <ProfileAccount />

                </div>

            </div>
        </>
    );
}

export default Settings;