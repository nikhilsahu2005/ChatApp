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

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return;

      try {
        setLoading(true);

        const res = await axios.get(
          `/api/message/get/${selectedConversation._id}`
        );

        setMessage(res.data || []);
      } catch (error) {
        console.log(error);
        setMessage([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation]);

  return { loading, messages };
};

export default useGetMessage;