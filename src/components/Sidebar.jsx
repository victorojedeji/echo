import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { AUTH, DASHBOARD, MESSAGES, USERS } from "../lib/routes";
import { useAuth } from "../hooks/auth";

export default function Sidebar() {
  const { user, isDataLoading } = useAuth();

  if (isDataLoading) return "Loading...";

  return (
    <div className="border-r-2 border-gray-10 w-[256px] h-[90vh] pl-4 pr-4 pt-8 pb-8 sticky left-0 top-0">
      <Link to={DASHBOARD}>
        <button className="flex items-center hover:bg-base mb-4 text-base hover:text-white rounded-[64px] pt-2 pb-2 ease-in duration-300">
          <span className="ml-8 mr-4">
            <AiOutlineHome className="text-h5" />
          </span>
          <p className="text-h5 font-body font-normal mr-8">Home</p>
        </button>
      </Link>

      <Link to={`${AUTH}/profile/${user?.id}`}>
        <button className="flex items-center hover:bg-base mb-4 text-base hover:text-white rounded-[64px] pt-2 pb-2 ease-in duration-300">
          <span className="ml-8 mr-4">
            <CgProfile className="text-h5" />
          </span>
          <p className="text-h5 font-body font-normal mr-8">Profile</p>
        </button>
      </Link>

      <Link to={`${MESSAGES}`}>
        <button className="flex items-center hover:bg-base mb-4 text-base hover:text-white rounded-[64px] pt-2 pb-2 ease-in duration-300">
          <span className="ml-8 mr-4">
            <BiMessageSquareDetail className="text-h5" />
          </span>
          <p className="text-h5 font-body font-normal mr-8">Messages</p>
        </button>
      </Link>

      <Link to={USERS}>
        <button className="flex items-center hover:bg-base mb-4 text-base hover:text-white rounded-[64px] pt-2 pb-2 ease-in duration-300">
          <span className="ml-8 mr-4">
            <FiUsers className="text-h5" />
          </span>
          <p className="text-h5 font-body font-normal mr-8">All Users</p>
        </button>
      </Link>
    </div>
  );
}
