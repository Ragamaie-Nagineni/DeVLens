import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loginpage from "./pages/login/Loginpage";
import Signuppage from "./pages/signup/Signuppage";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Repository from "./pages/Repository/Repository";
import Blogs from "./pages/Blogs/Blogs";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Loginpage />}
        />

        <Route
          path="/signup"
          element={<Signuppage />}
        />

        <Route
          path="/"
          element={<Signuppage/>}
        /> 
        <Route
          path="/dashboard"
          element={<Dashboard/>}
        /> 
        <Route
          path="/repository"
          element={<Repository/>}
        /> 
        <Route
          path="/blogs"
          element={<Blogs/>}
        /> 

      </Routes>

    </BrowserRouter>
  );
}

export default App;