import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import UsersPanel from "./UsersPanel";

export default function Messages() {
  const location = useLocation();

  const isRouteEmpty = location.pathname === "/auth/messages";

  return (
    <div className="p-4 min-h-full flex">
      <div className="w-[55vw]">
        {isRouteEmpty ? (
          <div className="w-full h-full flex justify-center">
            <p className=" text-h5 text-base">Search for a username...</p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <div className="border-l-2 w-[20vw]">
        <UsersPanel />
      </div>
    </div>
  );
}
