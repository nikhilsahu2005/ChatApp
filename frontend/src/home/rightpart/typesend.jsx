  import { useState } from "react";
  import { IoSend } from "react-icons/io5";
  import useSendMessage from "../../context/useSendMessage.js";

  function Typesend() {
    const [message, setMessage] = useState("");
    const { loading, sendMessages } = useSendMessage();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const sent = await sendMessages(message);
      if (sent) {
        setMessage("");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-1 h-[8vh] bg-gray-800">
          <div className="w-[70%] mx-4">
            <input
              type="text"
              placeholder="Type here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              className="border border-gray-700 rounded-xl outline-none mt-1 px-4 py-3 w-full"
            />
          </div>

          <button type="submit" disabled={loading || !message.trim()}>
            <IoSend className="text-3xl" />
          </button>
        </div>
      </form>
    );
  }

  export default Typesend;