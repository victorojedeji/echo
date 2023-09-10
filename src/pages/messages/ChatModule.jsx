import React from "react";
import { Link } from "react-router-dom";
import { AUTH } from "../../lib/routes";
import ChatAvatar from "../../components/ChatAvatar";

export default function ChatModule({ user }) {
  return (
    <Link to={`${AUTH}/messages/${user?.id}`}>
      <div className="border-b-2 flex items-center py-4 px-2">
        <div>
          <ChatAvatar user={user} size={"36"} />
        </div>
        <div>
          <p>{user.username}</p>
        </div>
      </div>
    </Link>
  );
}
