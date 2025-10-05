import React from 'react'
import { useGroupStore } from '../../store/groupStore'
import GroupChatContainer from "../groups/GroupChatContainer"
import NoChatSelected from "../NoChatSelected"

function GroupHome() {
  const {selectedGroup} = useGroupStore();
  return (
    <div className='flex h-full overflow-hidden'>
      {
        selectedGroup ? <GroupChatContainer/> : <NoChatSelected/>
      }
    </div>
  )
}

export default GroupHome