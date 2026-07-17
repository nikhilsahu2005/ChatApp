import React from "react";
import Search from "./search";
import Users from "./users";
import Logout from "./logout";

function Left() {
  return (
    <div className="h-full border-r border-slate-700 bg-slate-900 flex flex-col">
      <Search />

      <div className="flex-1 overflow-y-auto">
        <Users />
      </div>

      <Logout />
    </div>
  );
}

export default Left;