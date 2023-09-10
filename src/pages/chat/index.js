import React from 'react'
import { useParams } from 'react-router-dom'
import ChatModule from '../messages/ChatModule';
import { useUser } from '../../hooks/users'



export default function Chat() {
  const {id} = useParams();
  const {user, isUserLoading} = useUser(id)
  if (!user) return null;
  if (isUserLoading) return "Loading user..."
  console.log(user)

  return (
    <div>
      <ChatModule user={user} />
    </div>
  )
}
