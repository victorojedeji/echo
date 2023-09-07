import React from "react";
import { useDeleteComment } from "../hooks/comments";

export default function DeleteCommentModal({ setDeleteModal, comment }) {
  const { id } = comment;
  const { deleteComment, deleteLoading } = useDeleteComment(id);

  const handleDeleteModal = () => {
    setDeleteModal(false);
  };

  if (deleteLoading) return "Loading...";

  return (
    <div className="fixed top-0 left-0 min-w-[100vw] min-h-[100vh] backdrop-blur-[3px] bg-opacity-20 bg-white flex items-center justify-center">
      <div className="bg-white w-[400px] h-[200px] rounded-[8px] p-4">
        <h1 className="text-center text-h4 mb-8">
          Do you wish to delete this comment?
        </h1>
        <div className="flex justify-around items-center">
          <button
            onClick={deleteComment}
            className="bg-red-600 text-white rounded-[64px] pl-8 pr-8 pt-2 pb-2"
          >
            Yes
          </button>
          <button
            onClick={handleDeleteModal}
            className="bg-base text-white rounded-[64px] pl-8 pr-8 pt-2 pb-2"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
