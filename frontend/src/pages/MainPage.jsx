import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Database from "../components/Database";
import MyTicket from "../components/MyTicket";
import Navabar from "../components/Navabar";
import NewTicket from "../components/NewTicket";
import TicketApproval from "../components/TicketApproval";
import UserLogHistory from "../components/UserLogHistory";
import UserProfile from "../components/UserProfile";
import UserProfileSetting from "../components/UserProfileSetting";

function MainPage({ tickets, setTickets }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selected, setSelected] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow p-6 max-w-sm text-center">
          <div className="text-red-500 text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">Please log in to continue.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">
            Go to Login
          </button>
        </div>
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
    database: <Database />,
    userlog: <UserLogHistory />,
    userprofile: <UserProfile setSelected={setSelected} />,
    userprofilesetting: <UserProfileSetting />,
  };

  const navigationItems = {
    dashboard: { label: "Dashboard" },
    newticket: { label: "New Ticket" },
    myticket: { label: "My Tickets" },
    ticketapproval: { label: "Approvals" },
    database: { label: "Database" },
    userlog: { label: "User Logs" },
    userprofile: { label: "Profile" },
    userprofilesetting: { label: "Settings" },
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
      "userprofile",
      "userprofilesetting",
    ],
    technical: ["dashboard", "myticket", "userprofile", "userprofilesetting"],
    admin: [
      "dashboard",
      "userlog",
      "database",
      "userprofile",
      "userprofilesetting",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navabar onSelect={setSelected} />
      <div className="flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0  z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-30
          transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0
          transition-transform duration-200 ease-in-out
          w-64 bg-white border-r border-gray-200 flex flex-col
        `}
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2"></div>
              <button
                className="lg:hidden p-1"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {roleOptions[role]?.map((key) => {
              const item = navigationItems[key];
              const isActive = selected === key;

              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelected(key);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium
                    transition-colors duration-150
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <span>{item?.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 lg:ml-0">
          <div className="lg:hidden bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                ☰
              </button>
              <h1 className="font-semibold text-gray-900">
                {navigationItems[selected]?.label}
              </h1>
              <div></div>
            </div>
          </div>
          <div className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                {navigationItems[selected]?.icon}
              </span>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {navigationItems[selected]?.label}
                </h1>
                <p className="text-sm text-gray-600">
                  Manage your {navigationItems[selected]?.label.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 lg:p-6">
            <div className="bg-white rounded-lg border border-gray-200 min-h-[calc(100vh-200px)]">
              {componentsMap[selected]}
            </div>
          </div>
          <footer className="bg-white border-t border-gray-200 px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <a
                href="https://portfolio-mhvats.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Developed by Mehul Raj
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default MainPage;
