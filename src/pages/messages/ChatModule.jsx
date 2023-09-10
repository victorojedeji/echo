import React from "react";
import RenderAvatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { AUTH } from "../../lib/routes";

export default function ChatModule({ user }) {
  return (
    <Link to={`${AUTH}/messages/${user?.id}`}>
      <div className="border-b-2 flex items-center py-4 px-2">
        <div>
          {/* <RenderAvatar user={user} size={"36"} /> */}

          
        </div>
        <div>
          <p>{user.username}</p>
        </div>
      </div>
    </Link>
  );
}
