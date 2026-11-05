import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser({ onOpenSidebar }) {
  const { selectedConversation } = useConversation();
  const socketContext = useSocketContext();

  const onlineUsers = socketContext?.onlineUsers || [];

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-[8vh] bg-gray-800">
        <h1 className="text-xl text-white">Select User</h1>
      </div>
    );
  }

  const isOnline = onlineUsers.includes(selectedConversation._id);

  return (
    <div className="flex items-center space-x-3 h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300 px-4">
      <button
        type="button"
        className="btn btn-ghost drawer-button lg:hidden"
        aria-label="Open contacts"
        onClick={onOpenSidebar}
      >
        <CiMenuFries className="text-white text-xl" />
      </button>
      <div className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}>
        <div className="w-12 rounded-full">
          <img
            src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            alt="profile"
          />
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold text-white">
          {selectedConversation.fullname}
        </h1>

        <span className="text-sm text-gray-300">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;