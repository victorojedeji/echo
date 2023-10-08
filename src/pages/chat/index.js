import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ChatModule from "../messages/ChatModule";
import { useCurrentUser, useUser } from "../../hooks/users";
import { IoMdPaperPlane } from "react-icons/io";
import { BiSolidImageAdd } from "react-icons/bi";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { storage, db } from "../../lib/firebase";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import ChatMessages from "./ChatMessages";

export default function Chat() {
  const { id } = useParams();
  const { user, isUserLoading } = useUser(id);
  const { currentUser, error } = useCurrentUser();

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const combinedId =
    currentUser.uid > user?.id
      ? currentUser.uid + user?.id
      : user?.id + currentUser.uid;

  if (!user) return null;
  if (isUserLoading) return "Loading user...";

  const handleSend = async () => {
    setLoading(true);
    const cId = uuidv4();

    if (img) {
      const storageRef = ref(storage, cId);

      try {
        await uploadBytesResumable(storageRef, img);

        const downloadURL = await getDownloadURL(storageRef);

        await updateDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion({
            id: cId,
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      await updateDoc(doc(db, "chats", combinedId), {
        messages: arrayUnion({
          id: cId,
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [combinedId + ".lastMessage"]: {
        text,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", user?.id), {
      [combinedId + ".lastMessage"]: {
        text,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    setLoading(false)
  };



  return (
    <div className="pr-4 h-full relative">
      <ChatModule user={user} />

      <div className="border-b-2 mb-4 h-[60vh] overflow-y-auto">
        <ChatMessages combinedId={combinedId} />
      </div>

      <div className="absolute bottom-0 left-0 pr-4 w-full pt-4 h-18">
        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Enter your message..."
            className="w-full py-2 pl-8 pr-4 border-2 border-base rounded-[64px]"
            autoFocus
            autoComplete="off"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />

          <div className="absolute w-[30px]">
            <label htmlFor="img-file">
              <BiSolidImageAdd className="text-h5 pl-2 text-base font-bold w-full" />
            </label>
            <input
              type="file"
              style={{ display: "none" }}
              id="img-file"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>

          <button
            className={` py-2 px-4 ${
              loading ? "opacity-50" : "opacity-100"
            } bg-base text-white rounded-[64px] pt-2 pb-2 relative`}
            disabled={loading ? true : false}
            onClick={handleSend}
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
