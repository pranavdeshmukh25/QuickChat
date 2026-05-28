import React, { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';
import io from 'socket.io-client'
import { useAuth } from './authContext';


const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {
        if (authUser) {
            const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
                query: { userId: authUser._id },
            });
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
            setSocket(socket);
            return () => {
                socket.close();
            };
        } else {
            if(socket){
                socket.close();
            }
            setSocket(null);
        }
    }, [authUser]);
return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
    </SocketContext.Provider>
)
}