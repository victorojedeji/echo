import React from "react";
import Post from "./Post";

export default function PostsList({ posts }) {
  return (
    <div>
      {posts?.length === 0 ? (
        <div className="w-full bg-gray-05 p-4 rounded-[8px] mt-4 text-center italic text-small">
          No posts from you yet!
        </div>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}
