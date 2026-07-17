import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";

function Logout() {
  const [loading, setLoading] = useState(false);

const handleLogout = async () => {
  setLoading(true);

  try {
    const res = await axios.post("/api/user/logout");

    localStorage.removeItem("ChatApp");
    Cookies.remove("jwt");

    setLoading(false);
    alert("Logged out successfully");
    window.location.reload(); 
  } catch (error) {
    console.log("Error in Logout", error);
    setLoading(false);
  }
};
  return (
    <div className="h-[10vh]">
      <div className="px-6 py-4">
        <BiLogOutCircle className="text-5xl text-white hover:bg-slate-700 duration-300 rounded-full p-2 cursor-pointer" 
        onClick={handleLogout}
          />
      </div>
    </div>
  );
}

export default Logout;