import react from "react";
import { useState,useEffect } from "react";
import "./Sidebar.css";
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
function Sidebar(){
   const [collapsed,setcollapsed]=useState("");
   
   function handleCollapse(){
      setcollapsed(!collapsed);
   }
    return(
       <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
         <div className="close-btn" onClick={handleCollapse}><Menu/></div>
        <ul>
           <li className="active"> <Home/>{!collapsed && <span>Dashboard</span>}</li>
           <li><FolderGit2/>{!collapsed && <span>Repositories</span>}</li>
           <li><MessageSquare />{!collapsed &&<span>AI Chat</span>}</li>
           <li><Search/>{!collapsed &&<span>Search</span>}</li>
           <li><BookOpen/>{!collapsed &&<span>Blogs</span>}</li>
           <li><Settings/>{!collapsed &&<span>Settings</span>}</li>
        </ul>
        <div className="logout">
         <LogOut/>
           {!collapsed && <span>Log Out</span>}
        </div>
       </div>
    )
}
export default Sidebar