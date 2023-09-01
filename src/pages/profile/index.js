import React from 'react'
import { BsPencilSquare } from "react-icons/bs";
import profilePic from '../../assets/profile-pic/IMG_3417.jpeg'

export default function Profile() {

  const handleEditModal = () => {

  }

  return (
    <div className='w-full p-8'>
      <div className='bg-gray-05 p-16 rounded-[8px] flex items-center'>
        <div className='flex items-center gap-4'>
          <img src={profilePic} alt="profile-pic" className='w-[192px] rounded-full' />
          <div className='w-[40%]'>
            <h1 className='text-small text-head'>Username</h1>
            <p className='text-h4 font-normal text-gray-75 mb-4'>Victor</p>
            <h1 className='text-small text-head'>Bio</h1>
            <p className='text-para text-gray-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, rem tempora, fugit ut eligendi debitis soluta</p>
          </div>
        </div>


        <div>
          <button className='flex items-center whitespace-nowrap hover:bg-base mb-4 text-base hover:text-white rounded-[64px] pt-2 pb-4 ease-in duration-300'>
            <span className='ml-8 mr-4'>
              <BsPencilSquare className='text-h5' /> 
            </span>
            <p className='text-h5 font-body font-normal mr-8'>Edit profile</p>
          </button>


          <div className='w-full h-full absolute top-0 left-0 bg-[#cccccc73] flex justify-center items-center'>
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
