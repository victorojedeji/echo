import React from 'react'
import PostHeader from './PostHeader'
import Actions from './Actions';



export default function Post({post}) {
  return (
    <div className='bg-gray-05 p-4 mt-4 rounded-[8px]'>
      <PostHeader post={post} />
      <p className='text-para pt-8'>
        {post.text}
      </p>

      <Actions post={post}/>
    </div>
  )
}
