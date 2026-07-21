import react from "react";
import { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
   Home,
   FolderGit2,
   MessageSquare,
   Search,
   TrendingUp,
   BookOpen,
   Settings,
   LogOut,
   PanelLeftClose,
   PanelLeftOpen,
   Menu
} from "lucide-react";

function Sidebar({ collapsed, setcollapsed }) {

   const navigate = useNavigate();
   const location = useLocation();

   function handleCollapse() {
      setcollapsed(!collapsed);
   }

   async function handleLogOut() {
      const confirmlogout = window.confirm("Are you Sure you want to logout?");
      if (!confirmlogout) { return; }
      try {
         await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST"
         });
         localStorage.removeItem("token");
         navigate("/login");
      } catch (err) {
         console.error(err);
         alert("Logout Failed!");
      }
   }

   return (
      <div >
         <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
            <div className="close-btn" onClick={handleCollapse}><Menu /></div>
            <ul>
               <li
                  className={location.pathname === "/dashboard" ? "active" : ""}
                  onClick={() => navigate("/dashboard")}
               > <Home />{!collapsed && <span>Dashboard</span>}</li>
               <li
                  className={location.pathname === "/repository" ? "active" : ""}
                  onClick={() => navigate("/repository")}
               ><FolderGit2 />{!collapsed && <span>Repositories</span>}</li>
               <li><MessageSquare />{!collapsed && <span>AI Chat</span>}</li>
               <li><Search />{!collapsed && <span>Search</span>}</li>
               <li
                  className={location.pathname === "/blogs" ? "active" : ""}
                  onClick={() => navigate("/blogs")}
               ><BookOpen />{!collapsed && <span>Blogs</span>}</li>
               <li
                  className={location.pathname === "/settings" ? "active" : ""}
                  onClick={() => navigate("/settings")}
               ><Settings />{!collapsed && <span>Settings</span>}</li>
            </ul>
            <div className="logout" onClick={handleLogOut}>
               <LogOut />
               {!collapsed && <span>Log Out</span>}
            </div>
         </div>

      </div>

   )
}
export default Sidebar