import React from 'react'
import PostHeader from './PostHeader'



export default function Post({post}) {
  const {uid, text, date} = post;
  return (
    <div className='bg-gray-05 p-4 mt-4 rounded-[8px]'>
      <PostHeader uid={uid} date={date}/>
      <div>
        {text}
      </div>
    </div>
  )
}
