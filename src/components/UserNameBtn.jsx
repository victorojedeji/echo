import React from 'react'
import { Link } from 'react-router-dom'
import { AUTH } from '../lib/routes'

export default function UserNameBtn({user}) {
  return (
    <Link to={`${AUTH}/profile/${user?.id}`}>
      <button className='hover:underline'>{user.username}</button>
    </Link>
  )
}
