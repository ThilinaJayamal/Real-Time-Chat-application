import { useEffect, useState } from "react";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, MessageSquareText, SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GroupChatSidebar = () => {
    const navigate = useNavigate();
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">

            <div className="flex items-center justify-between p-5 border-b border-base-300">
                <div className="hidden lg:block text-xl font-semibold">
                    Chats
                </div>
                <div className="btn btn-sm" onClick={() => navigate("/")}>
                    <Users size={22}/>
                    <span className="hidden lg:block"> Private Chats</span>
                </div>
            </div>

            <div className="flex items-center p-5 border-b border-base-300">
                <div className="btn btn-sm" onClick={() => navigate("/groups/create")}>
                    <SquarePlus size={22} />
                    <span className="hidden lg:block"> Create Group</span>
                </div>
            </div>


        </aside>
    );
};
export default GroupChatSidebar;