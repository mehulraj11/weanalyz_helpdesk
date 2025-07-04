import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPwd from "./pages/ForgotPwd";
import MainPage from "./pages/MainPage";
import UserProfile from "./components/UserProfile";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgotpassword" element={<ForgotPwd />}></Route>
          <Route path="/mainpage" element={<MainPage />}></Route>
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
