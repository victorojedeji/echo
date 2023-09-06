import React from "react";
import CommentHeader from "./CommentHeader";

export default function comment({ comment }) {
  return (
    <div className="bg-gray-05 p-4 rounded-[8px] mt-2">
      <CommentHeader comment={comment} />
      <div className="pl-14 pt-4 pr-14 text-para">{comment.text}</div>
    </div>
  );
}
