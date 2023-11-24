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

  
    useEffect(() => {
      if (currentUser.uid) {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
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
      </div>
      <div className="w-[55vw]">
        {isRouteEmpty ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className=" text-h5 text-base font-medium">Select a message.</p>
            <p className=" text-small text-base">Choose from your existing conversations or search for a new username.</p>
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
