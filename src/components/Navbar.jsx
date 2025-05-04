import { useState, useRef, useContext } from "react";
import { UseOutsideAlerter } from "./useOutsideAlerter";
import { ContextApi } from "../helper/ContextApi";
import ProfileDropdown from "./ProfileDropdown";
// import { use } from './useoutsideraltered'; // Custom hook for outside click detection

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [desktopLangOpen, setDesktopLangOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const { setActiveTab,Logout ,user} = useContext(ContextApi);
  // const desktopLangRef = useRef(null);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // UseOutsideAlerter(desktopLangRef, () => setDesktopLangOpen(false));
  UseOutsideAlerter(profileMenuRef, () => setProfileMenuOpen(false));
  UseOutsideAlerter(mobileMenuRef, () => setMobileMenuOpen(false));

  const languages = [
    "English",
    "Español",
    "Português",
    "Deutsch",
    "Nederlands",
    "Français",
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="flex items-center text-black/25 bg-[#1E2237] justify-between px-6 py-4 max-w-full relative">
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
          <h1
            className="text-gray-200 font-extrabold text-2xl select-none  cursor-pointer"
            onClick={() => setActiveTab("offerWall")}
          >
            BLX<span className="text-[#5B6DF6]">.GG</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4 relative">
          {/* Robux Balance Display */}
          <div className="hidden md:flex items-center bg-[#1E2237] rounded-lg px-3 py-1.5 border border-[#21395e]">
            <span className="text-[#12fca6] font-bold mr-1">{user?.robuxBalance || 0}</span>
            <i className="fas fa-cube text-[#12fca6]" style={{ textShadow: "0 0 2px #0f6b4a" }}></i>
          </div>
          
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
              <img
                alt="User Avatar"
                className="rounded-md"
                height="40"
                src={user?.avatar}
                width="40"
              />
            </div>
            <ProfileDropdown
              isOpen={profileMenuOpen}
              onClose={() => setProfileMenuOpen(false)}
              setActiveTab={setActiveTab}
              Logout={Logout}
            />
          </div>
        </div>
      </header>

      {/* Desktop layout */}
      <div className="hidden lg:flex flex-1 min-h-0">
        {/* Sidebar with links, hidden by default */}
        {sidebarOpen && (
          <aside className="w-72 bg-[#1E2237]  p-6 overflow-y-auto font-sans text-gray-200 lg:flex lg:flex-col fixed left-0 z-50">
            <div>
              <button
                className="w-full text-left flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-[#242425] cursor-pointer hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                onClick={() => setActiveTab("offerWall")}
              >
                <i className="fas fa-money-bill-wave text-lg"></i>
                <span className="text-base font-normal select-none">
                  Earn Robux
                </span>
              </button>
              <button
                className="w-full text-left flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-[#242425] cursor-pointer hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                onClick={() => setActiveTab("create")}
              >
                <i className="fas fa-university text-lg"></i>
                <span className="text-base font-normal select-none">
                  Withdraw
                </span>
              </button>
              <button
                className="w-full text-left flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-[#242425] cursor-pointer hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                onClick={() => setActiveTab("reward")}
              >
                <i className="fas fa-gift text-lg"></i>
                <span className="text-base font-normal leading-snug select-none">
                  Rewards &amp; <br /> Promocodes
                </span>
              </button>
              <button
                className="w-full text-left flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-[#242425] cursor-pointer hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                onClick={() => setActiveTab("leaderboard")}
              >
                <i className="fas fa-users text-lg"></i>
                <span className="text-base font-normal select-none">
                  Leaderboard
                </span>
              </button>
              <button
                className="w-full text-left flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-[#242425] cursor-pointer hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                onClick={() => setActiveTab("event")}
              >
                <i className="far fa-star text-lg"></i>
                <span className="text-base font-normal select-none">Event</span>
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center  space-x-2 mb-3 text-green-600 font-semibold text-sm select-none">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12a4 4 0 018 0m-8 0v1a4 4 0 008 0v-1m-8 0a4 4 0 018 0"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8-9h1M3 12H2m15.364-6.364l.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M6.343 6.343l-.707-.707"
                  ></path>
                </svg>
                <span>Recent Earnings:</span>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 mb-4 text-gray-200 ">
                <p className="font-bold mb-2 select-text ">lio****o4</p>
                <p className="font-semibold mb-1">
                  Earned: <span className="font-normal">0.70</span>
                  <i className="fas fa-coins text-green-600 ml-1"></i>
                </p>
                <p className="font-semibold leading-snug">
                  From: bitlabs surveys
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 text-gray-200 ">
                <p className="font-bold mb-2 select-text ">Nik******013</p>
                <p className="font-semibold mb-1 ">
                  Earned: <span className="font-normal">26.00</span>
                  <i className="fas fa-coins text-green-600 ml-1"></i>
                </p>
                <p className="font-semibold leading-snug ">
                  From: bitlabs surveys
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Mobile bottom nav */}
      <nav
        aria-label="Bottom menu"
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#0c1218] rounded-xl px-6 py-4 flex z-50 items-center space-x-6 max-w-md w-full lg:hidden border border-gray-500"
        role="navigation"
      >
        <button
          className="flex flex-col items-center text-gray-300 text-xs font-semibold space-y-1"
          type="button"
          onClick={() => setActiveTab("offerWall")}
        >
          <i className="fas fa-money-bill-wave text-lg"></i>
          <span>EARN ROBUX</span>
        </button>
        <button
          className="flex flex-col items-center text-gray-300 text-xs font-semibold space-y-1"
          type="button"
          onClick={() => setActiveTab("create")}
        >
          <i className="fas fa-wallet text-lg"></i>
          <span>WITHDRAW</span>
        </button>
        <button
          className="flex flex-col items-center text-gray-300 text-xs font-semibold space-y-1"
          type="button"
          onClick={() => setActiveTab("event")}
        >
          <i className="fas fa-star text-lg"></i>
          <span>EVENT</span>
        </button>
        <button
          id="mobile-menu-button"
          aria-label="Menu"
          className="ml-auto flex items-center space-x-2 text-gray-200 font-bold text-sm uppercase tracking-wide"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span>MENU</span>
        </button>
      </nav>

      {/* Mobile menu dropdown (hidden by default) */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-dropdown"
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-xl px-6 py-4 max-w-md w-full shadow-lg border border-gray-300 space-y-4 text-white font-sans text-base font-normal z-40"
        >
          <div
            className="flex items-center space-x-3 cursor-pointer hover:text-[#5B6DF6]"
            onClick={() => setActiveTab("reward")}
          >
            <i className="fas fa-gift text-lg"></i>
            <span>Rewards &amp; Promocodes</span>
          </div>
          <div
            className="flex items-center space-x-3 cursor-pointer hover:text-[#5B6DF6]"
            onClick={() => setActiveTab("leaderboard")}
          >
            <i className="fas fa-users text-lg"></i>
            <span>Leaderboard</span>
          </div>
          <div className="flex justify-between items-center w-full">
            <select
              id="mobile-lang-select"
              className="border border-gray-300 rounded-md text-gray-200 text-sm px-2 py-1 focus:outline-none bg-black"
              aria-label="Select Language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
