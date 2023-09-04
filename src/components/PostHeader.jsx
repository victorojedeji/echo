import React from 'react'
import RenderAvatar from './Avatar'
import { useUser } from '../hooks/users';
import {formatDistanceToNow} from 'date-fns'
import UserNameBtn from './UserNameBtn';




export default function PostHeader({uid, date}) {

  const {user, isLoading} = useUser(uid);

  if (isLoading) return 'Loading...';

  return (
    <div>
      <div className='flex items-center gap-4 mb-4 border-b-2 pb-2  '>
        <RenderAvatar user={user} size={'36'}/>
        <div className=''>
          <UserNameBtn user={user}/>
          <p className='text-small text-gray-50'>{formatDistanceToNow(date)} ago</p>
        </div>
      </div>
    </div>
  )
}
