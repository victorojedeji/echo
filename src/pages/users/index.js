import React from "react";
import { useUsers } from "../../hooks/users";
import User from "./User";

export default function Users() {
  const {users, isUsersLoading} = useUsers();



  if (isUsersLoading) return 'Users Loading...'

  return <div className="w-full p-4 flex flex-col items-center justify-center">
    <h1 className="text-h5 text-gray-600 font-head font-medium mb-8 text-left w-[100%]">
        All Users
      </h1>
    <div className="h-full w-full flex flex-wrap justify-between">
      {
        users.map((user) => (
          <User user={user} key={user.id} />
        ))
      }
    </div>
  </div>;
}
