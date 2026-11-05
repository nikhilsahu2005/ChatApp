import { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const {
    setMessage,
    selectedConversation,
  } = useConversation();

  const sendMessages = async (message) => {
    const conversationId = selectedConversation?._id;
    if (!message.trim() || !conversationId || loading) return false;

    setLoading(true);

    try {
      const res = await axios.post(
        `/api/message/send/${conversationId}`,
        { message },
        {
          withCredentials: true,
        }
      );

      if (
        useConversation.getState().selectedConversation?._id === conversationId
      ) {
        setMessage((prev) =>
          prev.some((existingMessage) => existingMessage._id === res.data._id)
            ? prev
            : [...prev, res.data]
        );
      }
      return true;
    } catch (error) {
      console.error("Error in send messages:", error);
      toast.error(error.response?.data?.error || "Message could not be sent");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendMessages,
  };
};

export default useSendMessage;