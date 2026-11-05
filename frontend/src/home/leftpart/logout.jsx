import { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";

function Logout() {
  const [loading, setLoading] = useState(false);

const handleLogout = async () => {
  setLoading(true);

  try {
    await axios.post("/api/user/logout", {}, { withCredentials: true });

    localStorage.removeItem("ChatApp");
    setLoading(false);
    window.location.reload();
  } catch (error) {
    console.log("Error in Logout", error);
    setLoading(false);
  }
};
  return (
    <div className="h-[10vh]">
      <div className="px-6 py-4">
        <BiLogOutCircle aria-label="Log out" aria-busy={loading} className="text-5xl text-white hover:bg-slate-700 duration-300 rounded-full p-2 cursor-pointer"
        onClick={handleLogout}
          />
      </div>
    </div>
  );
}

export default Logout;
