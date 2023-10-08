import React from 'react'
import UsersPanel from './UsersPanel'
import { Outlet } from 'react-router-dom'

export default function Messages() {
  
  return (
    <div className='p-4 min-h-full flex'>
      <div className='w-[55vw]'>
        <Outlet />
      </div>
      <div className='border-l-2 w-[20vw]'>
        <UsersPanel />
      </div>
    </div>
  )
}
