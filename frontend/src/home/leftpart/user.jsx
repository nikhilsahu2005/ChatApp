import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext";

function User({ user, onSelect }) {
  const { selectedConversation, setSelectedConversation } =
    useConversation();

  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers?.includes(user._id);

  return (
    <div
      onClick={() => {
        setSelectedConversation(user);
        onSelect?.();
      }}
      className={`cursor-pointer hover:bg-slate-700 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
              alt="profile"
            />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <h1 className="font-semibold text-white truncate">
            {user.fullname}
          </h1>
          <p className="text-sm text-gray-400 truncate">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default User;