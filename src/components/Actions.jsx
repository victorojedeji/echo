import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots, FaRegComment } from "react-icons/fa";
import { useAuth } from "../hooks/auth";
import { useToggleLike } from "../hooks/posts";
import { Link } from "react-router-dom";
import { AUTH } from "../lib/routes";
import { useComments } from "../hooks/comments";

export default function Actions({ post }) {
  const { likes, id } = post;
  const { user, isDataLoading } = useAuth();

  const isLiked = likes.includes(user?.id);

  const { toggleLike, likeLoading } = useToggleLike({
    id,
    isLiked,
    uid: user?.id,
  });
  const { comments, isCommentsLoading} = useComments(id);

  return (
    <div className="border-t-2 mt-8 p-2 flex items-center justify-around bg-white rounded-[8px]">
      {!isDataLoading || !likeLoading ? (
        <div className="flex gap-1 items-center">
          <div
            className="hover:bg-red-100 p-2 rounded-[50%] ease-in duration-100"
            onClick={toggleLike}
          >
            {isLiked ? (
              <AiFillHeart className="text-red-600" />
            ) : (
              <AiOutlineHeart className="text-red-600" />
            )}
          </div>
          <span className="text-small">{likes.length}</span>
        </div>
      ) : (
        <div>
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
        </div>
      )}

      <Link to={`${AUTH}/comments/${id}`}>
        {!isDataLoading || !isCommentsLoading ? (
          <div className="flex gap-1 items-center">
            <div
              className="hover:bg-blue-100 p-2 rounded-[50%] ease-in duration-100"
            >
              {comments?.length === 0 ? (
                <FaRegComment className="text-base" />
              ) : (
                <FaRegCommentDots className="text-base" />
              )}
            </div>
            <span className="text-small">{comments?.length}</span>
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </Link>
    </div>
  );
}
