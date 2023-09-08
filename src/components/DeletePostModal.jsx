import React from "react";
import { useDeletePost } from "../hooks/posts";
import { useNavigate } from "react-router-dom";

export default function DeletePostModal({ setDeleteModal, post, postId=null }) {
  const { id } = post;
  const { deletePost, deletePostLoading } = useDeletePost(id);
  const navigate = useNavigate();
  const handleDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleDeletePost = () => {
    deletePost();
    if(postId) {
      navigate(-1);
    }
  };

  if (deletePostLoading) return "Loading...";

  return (
    <div className="fixed top-0 left-0 min-w-[100vw] min-h-[100vh] backdrop-blur-[3px] bg-opacity-20 bg-white flex items-center justify-center">
      <div className="bg-white w-[400px] h-[200px] rounded-[8px] p-4">
        <h1 className="text-center text-h4 mb-8">
          Do you wish to delete this post?
        </h1>
        <div className="flex justify-around items-center">
          <button
            onClick={handleDeletePost}
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
