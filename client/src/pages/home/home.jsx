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
    <div
      className="flex justify-between min-w-full
     md:min-w-[550px] md:max-w-[75%]
      px-2 h-[95%] md:h-full  
      rounded-xl shadow-2xl
       bg-gray-900 border border-gray-800"
    >
      <div
        className={`w-full py-2 md:flex ${isSidebarVisible ? "" : "hidden"}`}
      >
        <Sidebar
          onSelectUser={handelUserSelect}
          setShowProfile={setShowProfile}
        />
      </div>
      <div
        className={`divider divider-horizontal text-gray-700 px-3 md:flex
         ${isSidebarVisible ? "" : "hidden"} ${selectedUser ? "block" : "hidden"}`}
      ></div>
      <div
        className={`flex-auto ${selectedUser ? "" : "hidden md:flex"} bg-gray-200}`}
      >
        <MessageContainer onBackUser={handelShowSidebar} />
      </div>
    </div>
  );
};

export default Home;
