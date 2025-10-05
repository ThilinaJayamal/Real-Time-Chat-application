import React, { useEffect, useState } from 'react'
import { Camera, X } from 'lucide-react'
import { useChatStore } from '../../store/chatStore';
import { useNavigate } from 'react-router-dom';
import { useGroupStore } from '../../store/groupStore';
import { useAuthStore } from '../../store/authStore';

function CreateGroup() {
  const { getUsers, users, } = useChatStore();
  const { createGroup, isCreating } = useGroupStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const [memberSearch, setMemberSearch] = useState("");
  const [name, setName] = useState("");
  const [description, setDiscription] = useState("");

  const [members, setMembers] = useState([]);

  const filteredUsers = memberSearch ?
    users.filter((user) => {
      const isEmailMatch = user.email?.toLowerCase().includes(memberSearch.toLowerCase());
      const isNameMatch = user.fullName?.toLowerCase().includes(memberSearch.toLowerCase());
      const isNotInMemberList = members.includes(user);

      if ((isEmailMatch || isNameMatch) && !isNotInMemberList) {
        return true;
      }
      return false;
    }) : []

  useEffect(() => {
    getUsers();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const groupMembers = members?.map((user) => user._id);

    await createGroup({
      name,
      description,
      admins: [authUser?._id],
      members: [...groupMembers, authUser?._id]
    });

    setName("");
    setDiscription("");
    setMembers([]);
    setMemberSearch("");
  }

  function addMember(user) {
    setMembers((prev) => [...prev, user]);
  }

  function removeMember(userId) {
    const updatedMembers = members ? members.filter((member) => member._id !== userId) : [];
    setMembers(updatedMembers);
  }

  return (
    <div className='px-4 py-6 relative'>

      <div className='absolute cursor-pointer right-4 top-4'
        onClick={() => navigate("/groups")}>
        <X size={26} />
      </div>

      <div className="flex flex-col items-start gap-4 mb-6">
        <div className="relative">
          <img
            src={"/avatar.jpg"}
            alt="Profile"
            className="size-32 rounded-full object-cover border-4 "
          />
          <label
            htmlFor="avatar-upload"
            className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${false ? "animate-pulse pointer-events-none" : ""}
                `}
          >
            <Camera className="w-5 h-5 text-base-200" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <p className="text-sm text-zinc-400">
          {false ? "Uploading..." : "Click the camera icon to update your photo"}
        </p>
      </div>

      <div className='space-y-4'>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Group name</legend>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Type here" />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Group description</legend>
          <input type="text" value={description} onChange={(e) => setDiscription(e.target.value)} className="input" placeholder="Type here" />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Search members (Email / Name)</legend>
          <input type="text" className="input" placeholder="Search members..."
            value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)} />
        </fieldset>

        <div className='max-w-md space-y-2'>
          {
            filteredUsers.map((user) => (
              <div className='border-2 px-4 py-2 flex items-center gap-4 rounded-md' key={user?._id}>
                <img src={user?.profilePic} alt="" className='size-12 rounded-full' />

                <div className='w-full h-full flex items-center justify-between gap-2'>
                  <div>
                    <p className='text-md font-semibold'>{user?.fullName}</p>
                    <p className='text-sm'>{user?.email}</p>
                  </div>

                  <button className='btn btn-outline btn-primary' onClick={() => addMember(user)}>
                    Add
                  </button>
                </div>

              </div>
            ))
          }
          {(filteredUsers?.length == 0 && memberSearch) && <p className='text-sm'>No users found.</p>}
        </div>

        <div className='mt-8 mb-2'>
          <p className='mb-2 text-sm'>
            {
              members?.length == 0 ? "No members added yet." : "Members you added to the group"
            }
          </p>
          <div className='max-w-md space-y-2'>
            {
              members.map((user) => (
                <div className='border-2 px-4 py-2 flex items-center gap-4 rounded-md' key={user?._id}>
                  <img src={user?.profilePic} alt="" className='size-12 rounded-full' />

                  <div className='w-full h-full flex items-center justify-between gap-2'>
                    <div>
                      <p className='text-md font-semibold'>{user?.fullName}</p>
                      <p className='text-sm'>{user?.email}</p>
                    </div>

                    <button className='btn btn-outline btn-accent' onClick={() => removeMember(user?._id)}>
                      remove
                    </button>
                  </div>

                </div>
              ))
            }
          </div>

        </div>

        <button onClick={handleSubmit} className='btn btn-md mt-6'
          disabled={isCreating}>
          {isCreating ? "Group is creating..." : "Create Group"}
        </button>
      </div>

    </div>
  )
}

export default CreateGroup