import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";

function Search({ allUsers, onSelect }) {
  const [search, setSearch] = useState("");

  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    const conversation = allUsers.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
      onSelect?.();
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="h-[10vh] border-b border-slate-700">
      <div className="px-4 py-3">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-circle bg-sky-500 border-none hover:bg-sky-600"
          >
            <FaSearch className="text-white text-lg" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;