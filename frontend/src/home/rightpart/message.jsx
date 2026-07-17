import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));

  const itsMe =
    String(message.senderId) === String(authUser.user._id);

  const createdAt = new Date(message.createdAt);

  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`chat ${itsMe ? "chat-end" : "chat-start"}`}>
      <div
        className={`chat-bubble text-white ${
          itsMe ? "bg-blue-500" : "bg-gray-700"
        }`}
      >
        {message.message}
      </div>

      <div className="chat-footer text-xs opacity-70">
        {formattedTime}
      </div>
    </div>
  );
}

export default Message;