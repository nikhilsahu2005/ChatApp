import User from "./user";

function Users({ allUsers, loading, onSelectUser }) {
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>

      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {loading ? (
          <p className="px-8 py-4 text-gray-400">Loading contacts...</p>
        ) : (
          allUsers.map((user) => (
            <User key={user._id} user={user} onSelect={onSelectUser} />
          ))
        )}
      </div>
    </div>
  );
}

export default Users;