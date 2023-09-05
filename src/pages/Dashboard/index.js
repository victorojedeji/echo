import React, { useState } from 'react'
import RenderAvatar from '../../components/Avatar';
import TextareaAutosize from 'react-textarea-autosize';
import { BsPen } from "react-icons/bs";
import { useAddPost, usePosts } from '../../hooks/posts';
import { useAuth } from '../../hooks/auth'
import PostsList from './PostsList';


export default function Dashboard() {
  const [text, setText] = useState('');
  const {addPost, IsPostLoading} = useAddPost();
  const {user, isDataLoading} = useAuth();
  const {posts, postsLoading} = usePosts();


  if (postsLoading) return 'Posts Loading...'
  
  function handlePublicPost(e) {
    e.preventDefault();
    addPost({
      uid: user.id,
      text: text,   
    })
    console.log(text)
  }

  return (
    <div className='min-w-[55vw] p-4'>
      <h1 className='text-h5 text-gray-600 font-head font-medium mb-8'>Home</h1>

      <div className='bg-gray-05 p-4 rounded-[8px]'>
        <h1 className='text-h5 text-medium mb-4 '>New Post</h1>

       <div className='flex gap-4 w-full'>
          <RenderAvatar user={user} size={56}/>
        <form className='w-full flex flex-col' onSubmit={handlePublicPost}>
          <TextareaAutosize
            placeholder="What is happening?!"
            className="resize-none p-4 w-[100%] min-h-24 border-0 text-lg font-normal text-gray-600 focus:outline-none"
            required
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button 
              className={`${IsPostLoading ||isDataLoading ? 'opacity-50' : 'opacity-100'} bg-base text-white rounded-[64px] pt-2 pb-2 pr-4 pl-4 mb-8 relative w-[100px] mt-4`}
              disabled={IsPostLoading ||isDataLoading  ? true : false}
              >

            {IsPostLoading ||isDataLoading  ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.842 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291l3 2.647A7.963 7.963 0 0120 12h4c0-3.042-1.135-5.842-3-7.938z"></path>
                </svg>
                Processing...
              </div>
                ) : (
                  <div className='flex items-center justify-center gap-2'>
                  <BsPen /> <span>Post</span>
                  </div>
                )}
                
          </button>
        </form>
       </div>
      </div>


      <PostsList posts={posts} />
    </div>
  )
}
