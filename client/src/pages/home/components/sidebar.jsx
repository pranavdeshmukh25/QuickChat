import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axiosInstance from "../../../utils/axiosConfig.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { IoArrowBackSharp } from 'react-icons/io5';
import { BiLogOut } from "react-icons/bi";
import useConversationStore from "../../../zustand/useConversation";
import { useSocketContext } from "../../../context/socketContext";

const Sidebar = ({onSelectUser, setShowProfile}) => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [searchUser, setSearchuser] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageUsers, setNewMessageUsers] = useState([]);
  const { selectedConversation, setSelectedConversation, messages, setMessages } = useConversationStore();
    const { onlineUsers , socket} = useSocketContext();

    const nowOnline = chatUser.map((user)=>(user._id));
      //chats function
    const isOnline = nowOnline.map(userId => onlineUsers?.includes(userId));

  useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            setNewMessageUsers(newMessage)
        })
        return ()=> socket?.off("newMessage");
    },[socket,messages])

  useEffect(() => {
    const chatUserHandler = async () => {
      setLoading(true);
      try {
        const chatUser = await axiosInstance.get("/api/user/currentchatters");
        const data = chatUser.data;
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
        }
        setLoading(false);
        setChatUser(data);
      } catch (error) {
        setLoading(false);
        console.error("Error occurred while fetching chat users:", error);
      }
    };
    chatUserHandler();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const search = await axiosInstance.get(`/api/user/search?search=${searchInput}`);
      const data = search.data;
      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
      }
      setLoading(false);
      if (data.length === 0) {
        toast.info("User Not Found");
      } else {
        setSearchuser(data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error occurred while searching:", error);
    }
  };

  const handleUserClick = (user) => {
     onSelectUser(user);
    setSelectedUserId(user._id);
    setSelectedConversation(user);
    setNewMessageUsers('');
  };

      const handleSearchback = () => {
        setSearchuser([]);
        setSearchInput('')
    }

     const handleLogOut = async () => {

        const confirmlogout = window.prompt("type 'UserName' To LOGOUT");
        if (confirmlogout === authUser.username) {
            setLoading(true)
            try {
                const logout = await axiosInstance.post('/api/auth/logout')
                const data = logout.data;
                if (data?.success === false) {
                    setLoading(false)
                    console.log(data?.message);
                }
                toast.info(data?.message)
                localStorage.removeItem('chatapp')
                setAuthUser(null)
                setLoading(false)
                navigate('/login')
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        } else {
            toast.info("LogOut Cancelled")
        }

    }

  return (
    <div className="w-full w-auto px-1 h-full flex flex-col">
      <div className="flex justify-between gap-2 pb-3">
        <form
          onSubmit={handleSearchSubmit}
          className="w-auto flex items-center justify-between bg-gray-800 rounded-full border border-gray-700 hover:border-gray-600 transition"
        >
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="px-4 w-auto bg-transparent outline-none rounded-full text-gray-100 placeholder-gray-500"
            placeholder="search user"
          />
          <button className="btn btn-circle bg-blue-600 hover:bg-blue-700 border-none text-white">
            <FaSearch />
          </button>
        </form>
        <img
          onClick={() => setShowProfile(true)}
          src={authUser?.profilepic}
          className="self-center h-12 w-12 hover:scale-110 cursor-pointer rounded-full border border-gray-700 transition"
        />
      </div>
        <div className='divider divider-neutral px-3 my-0'></div>
      {searchUser.length > 0 ? (
        <>
        <div className="flex flex-col h-full">
          <div className="min-h-[70%] max-h-[80%] overflow-y-auto scrollbar flex-1 py-2">
            <div className="w-auto">
              {searchUser.map((user, index) => (
                <div
                  key={user._id}
                  onClick={() => handleUserClick(user)}
                  className="flex gap-3 items-center rounded-lg p-3 py-2 cursor-pointer hover:bg-gray-800 transition duration-200"
                >
                  <div className="relative">
                    <div className="w-12 rounded-full border border-gray-700">
                      <img src={user.profilepic} alt="user.img" />
                    </div>
                    {isOnline[index] && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <p className="font-semibold text-gray-100">{user.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-auto px-1 py-2 flex border-t border-gray-800 pt-3'>
                        <button onClick={handleSearchback} className='bg-gray-800 hover:bg-gray-700 rounded-full px-2 py-1 self-center text-gray-300 transition'>
                            <IoArrowBackSharp size={25} />
                        </button>
                    </div>
        </div>
        <div className='mt-auto px-1 py-2 flex gap-2 border-t border-gray-800 pt-3'>
                        <button onClick={handleLogOut} className='hover:bg-red-600 w-10 cursor-pointer hover:text-white rounded-lg bg-gray-800 text-gray-300 transition py-1'>
                            <BiLogOut size={25} />
                        </button>
                        <p className='text-sm py-1 text-gray-400'>Logout</p>
                    </div>
                    </>
      ) : (
        <>
        <div className="flex flex-col h-full">
          <div className="min-h-[70%] max-h-[80%] overflow-y-auto scrollbar flex-1 py-2">
            <div className="w-auto">
              {chatUser.length === 0 ? (
                <>
                  <div className="font-bold items-center flex flex-col text-xl text-gray-500 py-8">
                    <h1 className="text-2xl mb-2">Why are you Alone!!🤔</h1>
                    <h1 className="text-base">Search username to chat</h1>
                  </div>
                </>
              ) : (
                <>
                  {chatUser.map((user, index) => (
                    <div key={user._id}>
                      <div
                        onClick={() => handleUserClick(user)}
                        className={`flex gap-3 items-center rounded-lg p-3 py-2 cursor-pointer transition duration-200 ${
                          selectedUserId === user?._id
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-800 text-gray-100"
                        }`}
                      >
                        {/*Socket is Online*/}
                        <div className="relative">
                          <div className="w-12 rounded-full border border-gray-700">
                            <img src={user.profilepic} alt="user.img" />
                          </div>
                          {isOnline[index] && (
                            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1">
                          <p className="font-semibold">
                            {user.username}
                          </p>
                        </div>
                        <div>
                          {newMessageUsers.reciverId === authUser._id &&
                          newMessageUsers.senderId === user._id ? (
                            <div className="rounded-full bg-green-700 text-sm text-white px-[4px]">
                              +1
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className='mt-auto px-1 py-2 flex gap-2 border-t border-gray-800 pt-3'>
            <button onClick={handleLogOut} className='hover:bg-red-600 w-10 cursor-pointer hover:text-white rounded-lg bg-gray-800 text-gray-300 transition py-1'>
              <BiLogOut size={25} />
            </button>
            <p className='text-sm py-1 text-gray-400'>Logout</p>
          </div>
        </div>
          </>
      )}
    </div>
  );
};

export default Sidebar;
