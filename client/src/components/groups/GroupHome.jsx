import React from 'react'
import { useGroupStore } from '../../store/groupStore'
import GroupChatContainer from "../groups/GroupChatContainer"
import NoChatSelected from "../NoChatSelected"

function GroupHome() {
  const {selectedGroup} = useGroupStore();
  console.log(selectedGroup)
  return (
    <div className='w-full h-full flex items-center justify-center'>
      {
        selectedGroup ? <GroupChatContainer/> : <NoChatSelected/>
      }
    </div>
  )
}

export default GroupHome