import { MessageSquareText, User, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarSkeleton = () => {

  const skeletonContacts = Array(8).fill(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-base-300">
        <div className="hidden lg:block text-xl font-semibold">
          Chats
        </div>

        {
          (pathname === "/") && (
            <div className="btn btn-sm" onClick={() => navigate("/groups")}>
              <MessageSquareText size={22} />
              <span className="hidden lg:block"> Group Chats</span>
            </div>
          )
        }

        {
          (pathname === "/groups") && (
            <div className="btn btn-sm" onClick={() => navigate("/")}>
              <Users size={22} />
              <span className="hidden lg:block"> Private Chats</span>
            </div>
          )
        }

      </div>

      <div className="border-b border-base-300 w-full p-5">
        {
          (pathname === "/") && (
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <span className="font-medium hidden lg:block">Contacts</span>
            </div>
          )
        }

        {
          (pathname === "/groups") && (
            <div className="flex items-center gap-2">
              <MessageSquareText className="w-6 h-6" />
              <span className="font-medium hidden lg:block">Groups</span>
            </div>
          )
        }


      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;