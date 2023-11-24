import React from "react";
import { Link } from "react-router-dom";
import { AUTH } from "../../lib/routes";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useCurrentUser } from "../../hooks/users";
import ChatAvatar from "../../components/ChatAvatar";

export default function ChatModule({ user }) {
  const { currentUser, error, username } = useCurrentUser();

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.id
        ? currentUser.uid + user.id
        : user.id + currentUser.uid;

    const timestamp = serverTimestamp();
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.id,
            username: user.username,
          },
          [combinedId + ".date"]: timestamp,
        });

        await updateDoc(doc(db, "userChats", user.id), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            username,
          },
          [combinedId + ".date"]: timestamp,
        });
      }
    } catch (err) {}

    // setFilterText("");
  };
  return (
    <Link to={`${AUTH}/messages/${user?.id}`} onClick={handleSelect}>
      <div className="border-b-2 flex items-center py-2 px-2 hover:bg-gray-200">
        <div>
          <ChatAvatar user={user} size={"30"} />
        </div>
        <div className="ml-2">
          <p className="text-small">{user.username}</p>
        </div>
      </div>
    </Link>
  );
}
