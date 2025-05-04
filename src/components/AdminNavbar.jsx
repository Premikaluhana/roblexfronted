import { useState, useRef, useContext } from "react";
import { UseOutsideAlerter } from "./useOutsideAlerter";
import { ContextApi } from "../helper/ContextApi";
import { IoPerson } from "react-icons/io5";

const AdminNavbar = ({ setActiveAdminTab, activeAdminTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const { Logout, user } = useContext(ContextApi);

  UseOutsideAlerter(profileMenuRef, () => setProfileMenuOpen(false));

  const adminMenuItems = [
    { key: "users", icon: "fas fa-users", label: "Users" },
    { key: "promocode", icon: "fas fa-ticket-alt", label: "Promocode Create" },
    { key: "withdrawals", icon: "fas fa-wallet", label: "Withdrawals" },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-full relative bg-[#121215]">
        <div className="flex items-center space-x-4">
          <button
            aria-label="Toggle Sidebar"
            className="hidden lg:flex items-center cursor-pointer justify-center"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-10 h-10 text-gray-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="text-gray-200 font-extrabold text-2xl select-none cursor-pointer">
            Admin Panel
          </h1>
        </div>
        <div className="flex items-center space-x-4 relative">
          <div ref={profileMenuRef} className="relative">
            <div
              aria-haspopup="true"
              aria-expanded={profileMenuOpen}
              className="rounded-md border border-[#5B6DF6] p-2 flex items-center justify-center cursor-pointer"
              tabIndex="0"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setProfileMenuOpen(false);
              }}
            >
              <span className="text-amber-50 text-2xl"><IoPerson/></span>
            </div>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-2xl p-6 text-white z-50 transform transition-all duration-300 hover:scale-105 flex flex-col items-center">
                <img
                  src={user?.avatar}
                  alt="Profile avatar"
                  className="rounded-lg border-2 border-white/30 shadow-xl mb-4"
                  width={100}
                  height={100}
                />
                <h2 className="text-xl font-bold mb-1">@{user?.username}</h2>
                <p className="mb-1">Email: {user?.email || "N/A"}</p>
                <p className="mb-4">Number: {user?.number || "N/A"}</p>
                <button
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  onClick={() => Logout()}
                >
                  <svg
                    className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-medium text-sm">Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Desktop layout */}
      <div className="hidden lg:flex flex-1 min-h-0 bg-[#191a1f]">
        {/* Sidebar with links, hidden by default */}
        {sidebarOpen && (
          <aside className="w-72 p-6 overflow-y-auto font-sans text-gray-200 lg:flex lg:flex-col fixed left-0 z-50">
            <div>
              {adminMenuItems.map(({ key, icon, label }) => (
                <button
                  key={key}
                  className={`w-full text-left flex items-center space-x-3 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 focus:outline-none ${
                    activeAdminTab === key
                      ? "bg-[#242425] text-gray-200"
                      : "hover:bg-[#242425] hover:text-gray-200 text-gray-400"
                  }`}
                  onClick={() => setActiveAdminTab(key)}
                >
                  <i className={`${icon} text-lg`}></i>
                  <span className="text-base font-normal select-none">{label}</span>
                </button>
              ))}
            </div>
          </aside>
        )}
      </div>
    </>
  );
};

export default AdminNavbar;
