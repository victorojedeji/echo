import React from "react";
import RenderAvatar from "../../components/Avatar";
import { AUTH } from "../../lib/routes";
import { Link } from "react-router-dom";

export default function User({ user }) {
  return (
    <div
      className="w-[200px] h-[200px] rounded-[8px] border-2 p-2"
      key={user.id}
    >
      <div className="w-full flex items-center justify-center">
        <RenderAvatar user={user} size={96} />
      </div>
      <h1 className="text-para text-center text-black">@{user.username}</h1>

      <div className="w-full flex items-center justify-center mt-4">
        <Link to={`${AUTH}/profile/${user.id}`}>
          <button className="rounded-[64px] underline underline-offset-2 hover:bg-base text-black hover:text-white py-2 px-4 whitespace-nowrap">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
}
