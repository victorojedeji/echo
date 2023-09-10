import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import ChatModule from "./ChatModule";
import { useUsers } from "../../hooks/users";

export default function UsersPanel() {
  const { users, isUsersLoading } = useUsers();
  const [filterText, setFilterText] = useState("");
  if (!users) return null;
  const filteredUsers =  users.filter((user) =>
          user?.username?.toLowerCase().includes(filterText.toLowerCase())
        );


  if (isUsersLoading) return "Loading...";

  return (
    <div className="p-4">
      <div className="border-b-2 pb-4">
        <div className="flex items-center border-2 border-base rounded-[64px]">
          <input
            type="text"
            placeholder="Search Users..."
            className="py-2 px-4 flex-1 border-0 outline-none rounded-[64px]"
            autoFocus
            autoComplete="off"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <div className="p-2">
            <GoSearch className="text-base text-small" />
          </div>
        </div>
      </div>

      <div className="overflow-y-auto h-[70vh]">
        {filteredUsers.map((user) => (
          <ChatModule key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
