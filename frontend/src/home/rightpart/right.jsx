import { useEffect } from "react";
import Chatuser from "./chatuser";
import Messages from "./messages";
import Typesend from "./typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right({ onOpenSidebar }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return (
    <div className="w-full bg-slate-900 text-gray-300">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser onOpenSidebar={onOpenSidebar} />
          <div
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: "calc(92vh - 8vh)" }}
          >
            <Messages />
          </div>
          <Typesend />
        </>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  const fullname = authUser?.user?.fullname || "User";

  return (
    <div className="relative">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>

      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center">
          Welcome{" "}
          <span className="font-semibold text-xl">{fullname}</span>
          <br />
          No chat selected, please start conversation by selecting anyone from
          your contacts.
        </h1>
      </div>
    </div>
  );
};
