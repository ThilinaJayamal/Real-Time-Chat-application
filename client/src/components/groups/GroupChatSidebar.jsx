import { useEffect, useState } from "react";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { Users, SquarePlus, MessageSquareText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGroupStore } from "../../store/groupStore";

const GroupChatSidebar = () => {
    const navigate = useNavigate();
    const { getGroups, groups, isGroupsLoading, setSelectGroup, selectedGroup } = useGroupStore();

    useEffect(() => {
        getGroups();
    }, []);

    if (isGroupsLoading) {
        return <SidebarSkeleton />
    }

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="flex items-center justify-between p-5 border-b border-base-300">
                <div className="hidden lg:block text-xl font-semibold">
                    Chats
                </div>
                <div className="btn btn-sm" onClick={() => navigate("/")}>
                    <Users size={22} />
                    <span className="hidden lg:block"> Private Chats</span>
                </div>
            </div>

            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <MessageSquareText className="w-6 h-6" />
                    <span className="font-medium hidden lg:block">Groups</span>
                </div>
            </div>

            <div className="flex items-center p-5 border-b border-base-300">
                <div className="btn btn-sm" onClick={() => navigate("/groups/create")}>
                    <SquarePlus size={22} />
                    <span className="hidden lg:block"> Create Group</span>
                </div>
            </div>

            <div className="overflow-y-auto overflow-x-hidden">
                {groups.map((group) => (
                    <button
                        key={group._id}
                        onClick={() => setSelectGroup(group)}
                        className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedGroup?._id === group?._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
                    >
                        <div className="mx-auto lg:mx-0">
                            <img
                                src={group.profilePic || "/avatar.png"}
                                alt={group.name}
                                className="size-12 object-cover rounded-full"
                            />
                        </div>

                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">{group.name}</div>
                        </div>
                    </button>
                ))}
            </div>

        </aside>
    );
};
export default GroupChatSidebar;