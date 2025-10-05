import { X } from "lucide-react";
import { useGroupStore } from "../../store/groupStore";
import { useNavigate } from "react-router-dom";

const GroupChatHeader = () => {
  const navigate = useNavigate();
  const { selectedGroup, setSelectGroup } = useGroupStore()

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3" onClick={()=>navigate(`/groups/${selectedGroup?._id}`)}>
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedGroup.profilePic || "/avatar.png"} alt={selectedGroup.name} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedGroup.name}</h3>
            <p className="text-xs">{selectedGroup?.members?.length} members</p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectGroup(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default GroupChatHeader;