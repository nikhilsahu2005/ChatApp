import { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (!selectedConversation?._id) return;

      const isRelevant =
        String(newMessage.senderId) === String(selectedConversation._id) ||
        String(newMessage.receiverId) === String(selectedConversation._id);

      if (!isRelevant) return;

      setMessage((prev) =>
        prev.some((message) => message._id === newMessage._id)
          ? prev
          : [...prev, newMessage]
      );
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation, setMessage]);
};

export default useGetSocketMessage;