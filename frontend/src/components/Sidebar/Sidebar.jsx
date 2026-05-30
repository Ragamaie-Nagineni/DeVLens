import react from "react";
import { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
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

function Sidebar() {
   const [collapsed, setcollapsed] = useState("");
   const navigate = useNavigate();

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
               <li className="active"> <Home />{!collapsed && <span>Dashboard</span>}</li>
               <li><FolderGit2 />{!collapsed && <span>Repositories</span>}</li>
               <li><MessageSquare />{!collapsed && <span>AI Chat</span>}</li>
               <li><Search />{!collapsed && <span>Search</span>}</li>
               <li><BookOpen />{!collapsed && <span>Blogs</span>}</li>
               <li><Settings />{!collapsed && <span>Settings</span>}</li>
            </ul>
            <div className="logout" onClick={handleLogOut}>
               <LogOut />
               {!collapsed && <span>Log Out</span>}
            </div>
         </div>
         <div className={collapsed ? "container collapsed" : "container"}>
           
         </div>
      </div>

   )
}
export default Sidebar