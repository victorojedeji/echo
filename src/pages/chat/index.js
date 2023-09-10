import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ChatModule from "../messages/ChatModule";
import { useUser } from "../../hooks/users";
import { IoMdPaperPlane } from "react-icons/io";

export default function Chat() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user, isUserLoading } = useUser(id);
  if (!user) return null;
  if (isUserLoading) return "Loading user...";
  console.log(user);

  return (
    <div className="pr-4 h-full relative">
      <ChatModule user={user} />

      <div className="absolute bottom-0 left-0 pr-4 w-full">
        <div className="flex items-center ">
          <input
            type="text"
            placeholder="Enter your message..."
            className="w-full py-2 px-4 border-2 border-base rounded-[64px]"
            autoFocus
            autoComplete="off"
            // value={filterText}
            // onChange={(e) => setFilterText(e.target.value)}
          />

          <button
            className={` py-2 px-4 ${
              loading ? "opacity-50" : "opacity-100"
            } bg-base text-white rounded-[64px] pt-2 pb-2 relative`}
            disabled={loading ? true : false}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.842 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291l3 2.647A7.963 7.963 0 0120 12h4c0-3.042-1.135-5.842-3-7.938z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <p>Send</p>
                <IoMdPaperPlane />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
