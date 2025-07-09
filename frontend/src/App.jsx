import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPwd from "./pages/ForgotPwd";
import MainPage from "./pages/MainPage";
import UserProfile from "./components/UserProfile";
function App() {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");

  // fetching tickets
  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/getalltickets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setTickets(res.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgotpassword" element={<ForgotPwd />}></Route>
          <Route
            path="/mainpage"
            element={
              <MainPage
                fetchTickets={fetchTickets}
                tickets={tickets}
                setTickets={setTickets}
              />
            }
          ></Route>
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
