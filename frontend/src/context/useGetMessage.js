import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);

  const {
    messages,
    setMessage,
    selectedConversation,
  } = useConversation();
  const conversationId = selectedConversation?._id;

  useEffect(() => {
    let isCurrentRequest = true;

    const getMessages = async () => {
      if (!conversationId) {
        setLoading(false);
        setMessage([]);
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get(
          `/api/message/get/${conversationId}`,
          { withCredentials: true }
        );

        if (isCurrentRequest) {
          setMessage((currentMessages) => {
            const messagesById = new Map(
              (res.data || []).map((message) => [message._id, message])
            );
            currentMessages.forEach((message) => {
              messagesById.set(message._id, message);
            });
            return [...messagesById.values()];
          });
        }
      } catch (error) {
        if (isCurrentRequest) {
          console.error("Error in useGetMessage:", error);
          setMessage([]);
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    getMessages();

    return () => {
      isCurrentRequest = false;
    };
  }, [conversationId, setMessage]);

  return { loading, messages };
};

export default useGetMessage;