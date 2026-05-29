import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar.jsx";
import MessageContainer from "./components/messageContainer.jsx";
import Profile from "../profile/profile.jsx";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const handelUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarVisible(false);
  };
  const handelShowSidebar = () => {
    setIsSidebarVisible(true);
    setSelectedUser(null);
  };
  
  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  if (showProfile) {
    return <Profile onClose={handleCloseProfile} />;
  }

  return (
     <div className="w-screen h-screen bg-gray-950 flex overflow-hidden">
 
      {/* ── Sidebar — always 30% on desktop, full-width slide on mobile ───── */}
      <aside
        className={`
          h-full bg-gray-900 border-r border-gray-800 flex flex-col
          transition-all duration-300 ease-in-out shrink-0
          /* mobile: full width, toggled via translate */
          absolute inset-y-0 left-0 z-20 w-full
          /* md+: static 30% column */
          md:relative md:w-[30%] md:translate-x-0
          ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
          md:flex
        `}
      >
        {/* Replace with your <Sidebar /> component */}
        <Sidebar
          onSelectUser={handelUserSelect}
          setShowProfile={setShowProfile}
        />
      </aside>
 
      {/* ── Thin divider — desktop only ──────────────────────────────────── */}
      <div className="hidden md:block w-px bg-gray-800 shrink-0" />
 
      {/* ── Message area — fills remaining 70% ───────────────────────────── */}
      <main
        className={`
          flex-1 h-full flex flex-col overflow-hidden
          bg-gray-900
          /* mobile: visible only when a user is selected */
          ${selectedUser ? "flex" : "hidden md:flex"}
        `}
      >
        {selectedUser ? (
          /* Replace with your <MessageContainer /> component */
          <MessageContainer onBackUser={handelShowSidebar} />
        ) : (
          /* Empty state shown on desktop when no chat is selected */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 select-none">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-gray-400 font-semibold text-lg">Your Messages</p>
              <p className="text-gray-600 text-sm mt-1">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </main>
 
    </div>
  );
};

export default Home;
