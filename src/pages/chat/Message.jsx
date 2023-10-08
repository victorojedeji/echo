import React, { useContext, useEffect, useRef, useState } from "react";
import { useCurrentUser } from "../../hooks/users";






const Message = ({ message }) => {
   const [prevMessageDate, setPrevMessageDate] = useState(null);
  const { currentUser, error } = useCurrentUser();
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  const isDifferentDay = (currentDate, previousDate) => {
    if (!previousDate) return true; 
    return (
      currentDate.getFullYear() !== previousDate.getFullYear() ||
      currentDate.getMonth() !== previousDate.getMonth() ||
      currentDate.getDate() !== previousDate.getDate()
    );
  };

  const shouldDisplayDate = isDifferentDay(
    message.date.toDate(),
    prevMessageDate
  );

  useEffect(() => {
    setPrevMessageDate(message.date.toDate());
  }, [message.date]);

  return (
    <div ref={ref}>
      <div className="">
        {message.senderId === currentUser.uid ? (
          <div className="w-full flex justify-end">
            <div className="bg-blue-100 my-2 p-2 w-fit max-w-[85%]">
              <div>

              </div>
              <p className="text-para tracking-wide text-black capitalize break-words">
                {message.text}
              </p>
              <div className="my-1">{message.img && <img src={message.img} alt="" />}</div>
              {shouldDisplayDate && (
                <div className="ml-auto text-[10px] text-slate-700 grid place-content-end">
                  {formatTimestamp(message.date)}
                </div>
              )}
              {!shouldDisplayDate && (
                <div className="ml-auto text-[10px] text-slate-700 grid place-content-end">
                  {message.date.toDate().toLocaleTimeString()} 
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="bg-green-100 my-2 p-2 w-fit max-w-[85%]">
              <p className="text-para tracking-wide text-black capitalize break-words">
                {message.text}
              </p>
              <p>{message.img && <img src={message.img} alt="" />}</p>
              {shouldDisplayDate && (
                <div className="ml-auto text-[10px] text-slate-700 grid place-content-end">
                  {formatTimestamp(message.date)} 
                </div>
              )}
              {!shouldDisplayDate && (
                <div className="ml-auto text-[10px] text-slate-700 grid place-content-end">
                  {message.date.toDate().toLocaleTimeString()} 
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
