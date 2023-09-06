import React from "react";
import { useComments } from "../../hooks/comments";
import CommentSection from "./CommentSection";
// import { useUser } from "../../hooks/users";


export default function CommentList({ post }) {
  const { id } = post;
  // const {user} = useUser(uid);
  const { comments, isCommentsLoading } = useComments(id);

  if (isCommentsLoading) return "Loading...";

  return (
    <div className="mt-8">
      {comments.length === 0 ? (
        <div className="text-center italic text-small">No comments yet</div>
      ) : (
        comments.map((comment) => (
          <CommentSection key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );

}
 