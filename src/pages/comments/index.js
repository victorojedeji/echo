import React from 'react'
import Post from '../../components/Post'
import { useParams } from 'react-router-dom'
import { usePost } from '../../hooks/posts';



export default function Comments() {
  const {postId} = useParams();
  const {post, isPostLoading} = usePost(postId)



  if (isPostLoading) return 'Post Loading...'
  return (
    <div className='min-w-[55vw] p-4'>
      <Post post={post} />
    </div> 
  )
}
  