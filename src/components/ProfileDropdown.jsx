import React, { useContext, useRef } from "react";
import { UseOutsideAlerter } from "./useOutsideAlerter";
import { ContextApi } from "../helper/ContextApi";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ isOpen, onClose, setActiveTab, Logout }) => {
  const { user } = useContext(ContextApi);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  UseOutsideAlerter(dropdownRef, () => {
    if (isOpen) onClose();
  });

  if (!isOpen) return null;

  // Calculate level and progress based on Robux
  const robux = user?.robuxBalance || 0;
  const currentLevel = Math.floor(robux / 10) + 1;
  const xpInCurrentLevel = robux % 10;
  const xpToNextLevel = 10 - xpInCurrentLevel;
  const progressPercentage = xpInCurrentLevel * 10;

  const handleSettings = () => {
    onClose();
    setActiveTab('settings');
  };

  return (
    <div ref={dropdownRef} className="fixed bg-black/50 right-0 top-0 w-full h-full flex justify-center z-50 items-center">
      <div className="w-[90%] lg:w-[40%] bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-2xl p-6 text-white transform transition-all duration-300 hover:scale-105">
        <div className="relative">
          {/* Decorative background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          {/* Content container */}
          <div className="relative flex items-start justify-between">
            {/* Level and Progress Section */}
            <div className="flex-1 mr-4">
              <div className="flex items-center mb-4">
                <svg
                  className="w-6 h-6 mr-2 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h2 className="text-xl font-bold">
                  Level{" "}
                  <span className="text-2xl text-yellow-400">{currentLevel}</span>
                </h2>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1.5 font-medium opacity-90">
                  {xpToNextLevel} XP to next level
                </p>
              </div>
            </div>

            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-white/30 blur-lg rounded-lg animate-pulse"></div>
                <img
                  src={user?.avatar}
                  alt="Profile avatar"
                  className="rounded-lg border-2 border-white/30 shadow-xl transform transition-transform duration-300 hover:scale-105"
                  width={80}
                  height={80}
                />
              </div>
              <span className="mt-3 font-bold text-lg bg-white/10 px-3 py-1 rounded-md backdrop-blur-sm">
                @{user?.username}
              </span>
            </div>
          </div>
          {/* Decorative bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-full"></div>
        </div>

        {/* User Info Section */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Email:</span>
            <span className="text-white">{user?.email || 'Not set'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Phone:</span>
            <span className="text-white">{user?.phone || 'Not set'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-white/20 flex justify-between">
          <button
            className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
            onClick={handleSettings}
          >
            <svg
              className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="font-medium text-sm">Settings</span>
          </button>

          <button
            className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="font-medium text-sm">Close</span>
          </button>

          <button
            className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
            onClick={Logout}
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
      </div>
    </div>
  );
};

export default ProfileDropdown;