import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loginpage from "./components/login/Loginpage";
import Signuppage from "./components/signup/Signuppage";

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

      </Routes>

    </BrowserRouter>
  );
}

export default App;