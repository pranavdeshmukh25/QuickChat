import React, { useState, useEffect, useRef } from "react";
import { IoArrowBackSharp, IoSend } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { useAuth } from "../../../context/authContext";
import useConversationStore from "../../../zustand/useConversation";
import axios from "../../../utils/axiosConfig.js";
import notify from '../../../assets/notifications.wav'
import { useSocketContext } from "../../../context/socketContext";

const MessageContainer = ({ onBackUser }) => {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendData, setSendData] = useState('');
  const {
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessage,
  } = useConversationStore();
  const { socket } = useSocketContext();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log("New message received:", newMessage);
    const sound = new Audio(notify);
    sound.play();
    setMessage([...messages, newMessage]);
    
    return () => socket?.off("newMessage");
    })
  }, [socket, setMessage, messages]);

  console.log(messages);

   useEffect(()=>{
        setTimeout(()=>{
            lastMessageRef?.current?.scrollIntoView({behavior:"smooth"})
        },100)
    },[messages])

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const get = await axios.get(
          `/api/message/${selectedConversation?._id}`,
        );
        const data = await get.data;
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
        }
        setLoading(false);
        setMessage(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessage]);

  const handleMessages = (e) => {
    setSendData(e.target.value);
  }

  const handelSubmit=async(e)=>{
        e.preventDefault();
        setSending(true);
        try {
            const res =await axios.post(`/api/message/send/${selectedConversation?._id}`,{messages:sendData});
            const data = await res.data;
            if (data.success === false) {
                setSending(false);
                console.log(data.message);
            }
            setSending(false);
            setSendData('')
            setMessage([...messages,data])
        } catch (error) {
            setSending(false);
            console.log(error);
        }
    }

  return (
    <div className="md:min-w-[500px] h-[99%] flex flex-col py-2">
      {selectedConversation === null ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-900">
          <div
            className="px-4 text-center text-2xl text-gray-100 font-semibold 
            flex flex-col items-center gap-2"
          >
            <p className="text-2xl">Welcome!!👋 {authUser.username}😉</p>
            <p className="text-lg text-gray-400">Select a chat to start messaging</p>
            <TiMessages className="text-6xl text-center text-gray-600" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between gap-1 bg-gray-800 md:px-2 rounded-lg h-10 md:h-12 border-b border-gray-700">
            <div className="flex gap-2 md:justify-between items-center w-full">
              <div className="md:hidden ml-1 self-center">
                <button
                  onClick={() => onBackUser(true)}
                  className="bg-gray-700 hover:bg-gray-600 rounded-full px-2 py-1 text-gray-300 transition self-center"
                >
                  <IoArrowBackSharp size={25} />
                </button>
              </div>
              <div className="flex justify-between mr-2 gap-2">
                <div className="self-center">
                  <img
                    className="rounded-full w-6 h-6 md:w-10 md:h-10 cursor-pointer border border-gray-700"
                    src={selectedConversation?.profilepic}
                  />
                </div>
                <span className="text-gray-100 self-center text-sm md:text-xl font-semibold">
                  {selectedConversation?.username}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-gray-900 p-4 space-y-3">
            {loading && (
              <div
                className="flex w-full h-full flex-col items-center justify-center gap-4"
              >
                <div className="loading loading-spinner text-blue-600"></div>
              </div>
            )}
            {!loading && messages?.length === 0 && (
              <p className="text-center text-gray-500 items-center h-full flex justify-center">
                Send a message to start Conversation
              </p>
            )}
            {!loading && messages?.length > 0 && messages?.map((message) => (
                <div className={`flex ${message.senderId === authUser._id ? 'justify-end' : 'justify-start'}`} key={message?._id} ref={lastMessageRef}>
                  <div className='text-gray-100'>
                    <div className={`chat-bubble text-white px-4 py-2 ${
                      message.senderId === authUser._id 
                        ? 'bg-blue-600 rounded-t-lg rounded-l-lg' 
                        : 'bg-gray-800 border border-gray-700 rounded-t-lg rounded-r-lg'
                    }`}>
                      {message?.message}
                    </div>
                    <div className={`chat-footer text-[10px] text-gray-500 mt-1 ${message.senderId === authUser._id ? 'text-right' : 'text-left'}`}>
                      {new Date(message?.createdAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
          </div>
           <form onSubmit={handelSubmit} className='rounded-full border border-gray-700 bg-gray-800'>
            <div className='w-full rounded-full flex items-center'>
              <input value={sendData} onChange={handleMessages} required id='message' type='text' 
              className='w-full bg-transparent outline-none px-4 py-2 rounded-full text-gray-100 placeholder-gray-500'/>
              <button type='submit' className='pr-2'>
                {sending ? <div className='loading loading-spinner loading-sm text-blue-600'></div>:
                <IoSend size={25}
                className='text-blue-600 cursor-pointer hover:text-blue-500 transition'/>
                }
              </button>
            </div>
            </form>
        </>
      )}
    </div>
  );
};

export default MessageContainer;
