import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UsersPanel from "./UsersPanel";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useCurrentUser } from "../../hooks/users";





export default function Messages() {
  const location = useLocation();
  const [chats, setChats] = useState({});

  const { currentUser, error } = useCurrentUser();  

  const isRouteEmpty = location.pathname === "/auth/messages";

    //  ========= For Chats ==========
  
    useEffect(() => {
      if (currentUser.uid) {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            // console.log("Received chat data:", doc.data());
            setChats(doc.data());
          });
    
          return () => {
            unsub();
          };
        };
    
        getChats();
      }
    }, [currentUser.uid]);
    

  return (
    <div className="p-4 min-h-full flex">
      <div>
        {/* <div>
          <ChatList />
        </div> */}
      </div>
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
        <UsersPanel chats={chats} />
      </div>
    </div>
  );
}
