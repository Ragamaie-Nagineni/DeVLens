import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loginpage from "./pages/login/Loginpage";
import Signuppage from "./pages/signup/Signuppage";
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
          element={<Signuppage />}
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