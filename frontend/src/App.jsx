import react from "react";
import reactDom from "react-dom"
import Signuppage from "./components/signup/Signuppage";
import Test from "./components/test"
import Loginpage from "./components/login/Loginpage";
function App(){
  return (<div>
  <Test/>
  <Loginpage/>
  <Signuppage/>
  
  </div>);
}
export default App;