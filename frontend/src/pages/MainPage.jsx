import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Database from "../components/Database";
import MyTicket from "../components/MyTicket";
import Navabar from "../components/Navabar"; 
import NewTicket from "../components/NewTicket";
// import Performance from "../components/Performance";
import Setting from "../components/Setting";
import TicketApproval from "../components/TicketApproval";
import UserLogHistory from "../components/UserLogHistory";
import UserProfile from "../components/UserProfile";
import UserProfileSetting from "../components/UserProfileSetting";

function MainPage({ tickets, setTickets }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selected, setSelected] = useState("dashboard");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
        <p className="text-white text-xl font-semibold bg-red-600 p-6 rounded-lg shadow-xl text-center">
          Please login to continue.
        </p>
      </div>
    );
  }

  const { role } = user;

  const componentsMap = {
    dashboard: <Dashboard />,
    newticket: <NewTicket />,
    myticket: <MyTicket tickets={tickets} setTickets={setTickets} />,
    ticketapproval: (
      <TicketApproval tickets={tickets} setTickets={setTickets} />
    ),
    // performance: <Performance />,
    setting: <Setting />,
    database: <Database />,
    userlog: <UserLogHistory />,
    userprofile: <UserProfile setSelected={setSelected} />,
    userprofilesetting: <UserProfileSetting />,
  };

  const roleOptions = {
    user: [
      "dashboard",
      "newticket",
      "myticket",
      "userprofile",
      "userprofilesetting",
    ],
    operation: [
      "dashboard",
      "ticketapproval",
      "myticket",
      // "performance",
      "userprofile",
      "userprofilesetting",
    ],
    technical: [
      "dashboard",
      "myticket",
      // "performance",
      "userprofile",
      "userprofilesetting",
    ],
    admin: [
      "dashboard",
      "setting",
      "userlog",
      "database",
      "userprofile",
      "userprofilesetting",
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <Navabar onSelect={setSelected} />

      <div className="flex flex-1 flex-col md:flex-row p-4 md:p-6 lg:p-8 gap-4 md:gap-6">
        <div
          className="w-full md:w-64 lg:w-72 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 space-y-2
                        flex flex-row md:flex-col overflow-x-auto md:overflow-x-hidden
                        flex-shrink-0"
        >
          {" "}
          {roleOptions[role]?.map((key) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`w-full py-2 px-4 rounded-lg text-left font-medium
                         transition duration-200 ease-in-out
                         ${
                           selected === key
                             ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                             : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                         }
                         focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              {key
                .split(/(?=[A-Z])/)
                .join(" ")
                .toUpperCase()}
            </button>
          ))}
        </div>

        <div
          className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 lg:p-8
                        flex flex-col overflow-hidden"
        >
          {" "}
          <div className="flex-1 overflow-y-auto">
            {" "}
            {componentsMap[selected]}
          </div>
          <footer className="mt-auto pt-4 text-center text-gray-700 text-sm border-t border-gray-200">
            <a
              href="https://portfolio-mhvats.onrender.com"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 transition duration-200 hover:underline"
            >
              Developed by Mehul raj
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
