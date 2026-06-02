import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Loginpage from "./components/login/Loginpage";
import Signuppage from "./components/signup/Signuppage";
import Sidebar from "./components/Sidebar/Sidebar";


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
          path="/sidebar"
          element={<Sidebar />}
        /> 

      </Routes>

    </BrowserRouter>
  );
}

export default App;