import React from "react";
import Post from "../../components/Post";
import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../../hooks/posts";
import { BiArrowBack } from "react-icons/bi";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function Comments() {
  const { postId } = useParams();
  const { post, isPostLoading } = usePost(postId);
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate(-1);
  };

  if (isPostLoading) return "Post Loading...";
  return (
    <div className="min-w-[55vw] p-4">
      <div className="flex justify-between mb-8">
        <h1 className="text-h5 text-gray-600 font-head font-medium">
          Comments
        </h1>
        <button
          className="text-para flex gap-2 items-center"
          onClick={handleBackBtn}
        >
          <BiArrowBack />
          Back
        </button>
      </div>

      <Post post={post} postId={postId} />
      <CommentForm post={post} />
      <CommentList post={post} />
    </div>
  );
}
