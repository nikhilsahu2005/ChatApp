/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();
  const userId = authUser?.user?._id;
  const socket = useMemo(() => userId ? io("http://localhost:4005", {
    query: { userId },
    autoConnect: false,
  }) : null, [userId]);

  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (users) => setOnlineUsers(users);
    socket.on("getOnlineUsers", handleOnlineUsers);
    socket.connect();

    return () => {
      socket.off("getOnlineUsers", handleOnlineUsers);
      socket.disconnect();
    };
  }, [socket]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers: socket ? onlineUsers : [] }}>
      {children}
    </socketContext.Provider>
  );
};

export default socketContext;
