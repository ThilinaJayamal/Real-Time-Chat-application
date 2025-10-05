import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import GroupChatSidebar from '../components/groups/GroupChatSidebar'

function GroupChat() {
  return (
    <div className='bg-base-200 min-h-screen'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className="flex h-full rounded-lg overflow-hidden">
            <GroupChatSidebar />
            <div className='flex-1 overflow-y-auto overflow-x-hidden'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupChat