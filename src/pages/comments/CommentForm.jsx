import React, { useEffect, useState } from "react";
import RenderAvatar from "../../components/Avatar";
import { useAddComment } from "../../hooks/comments";
import { useUser } from "../../hooks/users";

export default function CommentForm({ post }) {
  const { uid, id: postId } = post;
  const {user , isLoading} = useUser(uid);
  const [newComment, setNewComment] = useState("");
  const { addComment, isNewCommentLoading } = useAddComment({
    postId,
    uid: user?.id,
  });

  // useEffect(() => {
  //   if ( isNewCommentLoading || !user?.id ) {
  //       return null;
  //     }

  // }, [])
  
  const handleComment = async (e) => {
    e.preventDefault();
    await addComment(newComment);

    setNewComment("");
  };

  return (
    <div>
      <form onSubmit={handleComment} className="flex gap-4 items-end w-full mt-4 p-4">
        <RenderAvatar user={user} size={36} />
        <input
          type="text"
          placeholder="Comment..."
          className="flex-1 outline-none border-b-2 p-2"
          autoFocus
          autoComplete="off"
          required
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="bg-base pl-4 pr-4 pt-2 pb-2 rounded-[64px] text-white text-center">
          {isNewCommentLoading || isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.294A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4.006zM20 12h4a8 8 0 01-8 8v-4.294A7.962 7.962 0 0120 12z"
              ></path>
            </svg>
          ) : (
            "Reply"
          )}
        </button>
      </form>
    </div>
  );
}
