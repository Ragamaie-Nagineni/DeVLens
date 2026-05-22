import react from "react";
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
} from "lucide-react";
function Sidebar(){
    return(
       <div className="sidebar">
        <ul>
           <li className="active"> <Home/>Dashboard</li>
           <li><FolderGit2/>Repositories</li>
           <li><MessageSquare />AI Chat</li>
           <li><Search/>Search</li>
           <li><BookOpen></BookOpen>Blogs</li>
           <li><Settings/>Settings</li>
        </ul>
        <div className="logout">
           <LogOut/>Log Out
        </div>
       </div>
    )
}
export default Sidebar