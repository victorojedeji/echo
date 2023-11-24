import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import ChatModule from "./ChatModule";
import { useCurrentUser, useUsers } from "../../hooks/users";

export default function UsersPanel({ chats }) {
  const navigate = useNavigate();
  const { currentUser, error } = useCurrentUser();
  const { users, isUsersLoading } = useUsers();
  const [filterText, setFilterText] = useState("");

  if (!users) return null;

  console.log("chats:", chats);

  const filteredUsers = users.filter((user) =>
    user?.username?.toLowerCase().includes(filterText.toLowerCase())
  );

  const isInputEmpty = filterText.trim() === "";

  const handleChatSelect = (changeUser) => {
    if (changeUser && changeUser.uid) {
      navigate(`/auth/messages/${changeUser.uid}`);
    } else {
      console.log("Invalid user data:", changeUser);
    }
  };

  if (isUsersLoading) return "Loading...";

  return (
    <div className="py-2.5 px-4">
      <div className="border-b-2 pb-4 relative">
        <div className="flex items-center border-2 border-base rounded-[64px]">
          <input
            type="text"
            placeholder="Username..."
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

        <div className="overflow-y-auto absolute top-12 left-0 w-full bg-white">
          {isInputEmpty ? (
            <div className="text-gray-500 text-center text-small p-4 h-fit">
              Search user...
            </div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers
              .filter((user) => currentUser.uid !== user.id)
              .map((user) => (
                <ChatModule
                  key={user.id}
                  user={user}
                  setFilterText={setFilterText}
                />
              ))
          ) : (
            <div className="text-red-500 text-center text-small p-4">
              No User found
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h1 className="mb-2 text-h5">Chats</h1>
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) =>
            chat[1].lastMessage && chat[1].lastMessage.text ? (
              <div
                className="cursor-pointer"
                key={chat[0]}
                onClick={() => handleChatSelect(chat[1].userInfo)}
              >
                <div className="userChatInfo mb-2 bg-slate-50 px-2 py-1">
                  <h1 className="bg-slate-100">{chat[1].userInfo?.username}</h1>
                  <p className="text-small">{chat[1].lastMessage.text}</p>
                </div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}
