import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { DASHBOARD } from '../lib/routes';






export default function Sidebar() {
  return (
    <div className='border-r-2 border-gray-10 w-[256px] h-[90vh] pl-4 pr-4 pt-8 pb-8'>
        
        <Link to={DASHBOARD}>
          <button className='flex items-center hover:bg-base mb-4 text-base hover:text-white rounded-[64px] pt-2 pb-4 ease-in duration-300'>
            <span className='ml-8 mr-4'>
              <AiOutlineHome className='text-h5' /> 
            </span>
            <p className='text-h5 font-body font-normal mr-8'>Home</p>
          </button>
        </Link>

        <Link>
          <button className='flex items-center hover:bg-base mb-4 text-base hover:text-white rounded-[64px] pt-2 pb-4 ease-in duration-300'>
            <span className='ml-8 mr-4'>
              <CgProfile className='text-h5' /> 
            </span>
            <p className='text-h5 font-body font-normal mr-8'>Profile</p>
          </button>
        </Link>

        <Link>
          <button className='flex items-center hover:bg-base mb-4 text-base hover:text-white rounded-[64px] pt-2 pb-4 ease-in duration-300'>
            <span className='ml-8 mr-4'>
              <BiMessageSquareDetail className='text-h5' /> 
            </span>
            <p className='text-h5 font-body font-normal mr-8'>Messages</p>
          </button>
        </Link>

        <Link>
          <button className='flex items-center hover:bg-base mb-4 text-base hover:text-white rounded-[64px] pt-2 pb-4 ease-in duration-300'>
            <span className='ml-8 mr-4'>
              <FiUsers className='text-h5' /> 
            </span>
            <p className='text-h5 font-body font-normal mr-8'>All Users</p>
          </button>
        </Link>
        
    </div>
  )
}
