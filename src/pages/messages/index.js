import React from 'react'
import UsersPanel from './UsersPanel'
import { Outlet } from 'react-router-dom'

export default function Messages() {
  
  return (
    <div className='p-4 min-h-full flex'>
      <div className='min-w-[40vw]'>
        <Outlet />
      </div>
      <div className='border-x-2'>
        <UsersPanel />
      </div>
    </div>
  )
}
