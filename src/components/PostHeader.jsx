import React, { useState } from "react";
import RenderAvatar from "./Avatar";
import { useUser } from "../hooks/users";
import { formatDistanceToNow } from "date-fns";
import { BsThreeDots } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { useDeletePost } from "../hooks/posts";
import UserNameBtn from "./UserNameBtn";
import DeletePostModal from "./DeletePostModal";
import { useAuth } from "../hooks/auth";

export default function PostHeader({ post, postId }) {
  const { id, uid, date } = post;
  const [toggleOptions, setToggleOptions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);


  const { user: authUser, isLoading: authLoading } = useAuth();
  const { deletePostLoading } = useDeletePost(id);
  const { user, isLoading } = useUser(uid);

  if (isLoading) return "Loading...";

  const handleOption = () => {
    setToggleOptions(!toggleOptions);
  };

  const toggleDeleteModal = () => {
    setDeleteModal(true)
  };

  return (
    <div className="border-b-2 flex justify-between items-center relative">
      <div className="flex items-center gap-4 pb-2 ">
        <RenderAvatar user={user} size={"36"} />
        <div className="">
          <UserNameBtn user={user}/>
          <p className="text-small text-gray-50">
            {formatDistanceToNow(date)} ago
          </p>
        </div>
      </div>

      <button
        className="text-para w-[64px] flex justify-end items-center"
        onClick={handleOption}
      >
        <BsThreeDots />
      </button>

      {toggleOptions && (!authLoading && authUser.id) === uid && (
        <div className="absolute right-0 top-10 bg-white p-4 rounded-[8px]">
          {!deletePostLoading ? (
            <>
              <button
                className="flex gap-2 items-center pt-2 mb-2"
                onClick={toggleDeleteModal}
              >
                <FiDelete className="text-red-600 text-small" />
                <span className="text-small text-red-600">Delete</span>
              </button>

              {deleteModal && (
                <DeletePostModal setDeleteModal={setDeleteModal} post={post} postId={postId} />
              )}
              </>
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
        </div>
      )}
    </div>
  );
}
