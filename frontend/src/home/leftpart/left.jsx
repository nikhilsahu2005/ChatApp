import Search from "./search";
import Users from "./users";
import Logout from "./logout";
import useGetAllUsers from "../../context/useGetAllUsers";

function Left({ onSelectUser }) {
  const [allUsers, loading] = useGetAllUsers();

  return (
    <div className="h-full border-r border-slate-700 bg-slate-900 flex flex-col">
      <Search allUsers={allUsers} onSelect={onSelectUser} />

      <div className="flex-1 overflow-y-auto">
        <Users
          allUsers={allUsers}
          loading={loading}
          onSelectUser={onSelectUser}
        />
      </div>

      <Logout />
    </div>
  );
}

export default Left;