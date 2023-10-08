import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import Message from "./Message";

const ChatMessages = ({combinedId}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [combinedId]);


  return (
    <div className="">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default ChatMessages;
