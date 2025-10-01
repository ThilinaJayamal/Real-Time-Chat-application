import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function GroupChat() {
  return (
    <div className='bg-base-200 min-h-screen'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <Link to={"/groups/chat"}>Chat</Link> <br />
          <Link to={"/groups/create"}>Create</Link><br />
          <Link to={"/groups"}>Group home</Link>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default GroupChat