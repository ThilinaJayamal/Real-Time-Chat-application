import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast"
import { useAuthStore } from "./authStore";

export const useGroupStore = create((set, get) => ({
    isCreating: false,
    groups: [],
    group: null,
    isGroupsLoading: false,
    isGroupLoading: false,
    selectedGroup: null,
    isAdmin: false,

    setSelectGroup: (group) => {
        set({ selectedGroup: group });
    },

    createGroup: async (formData) => {
        set({ isCreating: true });
        const { groups } = get();
        try {
            const { data } = await axiosInstance.post("/groups", formData);
            toast.success("Group created successfully!");
            set({ groups: [...groups, data] })
        } catch (error) {
            toast.error(error.response.data);
        }
        finally {
            set({ isCreating: false })
        }
    },

    updateGroup: async (formData) => {
        set({ isCreating: true });
        const { group, getGroups } = get();
        try {
            const { data } = await axiosInstance.put(`/groups/${group?._id}`, formData);
            await getGroups();
            toast.success("Group updated successfully!");
        } catch (error) {
            console.log(error)
            toast.error(error.response.data);
        }
        finally {
            set({ isCreating: false })
        }
    },

    getGroups: async () => {
        set({ isGroupsLoading: true });
        try {
            const { data } = await axiosInstance.get("/groups");
            set({ groups: data });
        } catch (error) {
            set({ groups: [] });
            toast.error(error.response.data);
        } finally {
            set({ isGroupsLoading: false })
        }
    },

    getGroup: async (groupId) => {
        const authUser = useAuthStore.getState().authUser;

        set({ isGroupLoading: true });
        try {
            const { data } = await axiosInstance.get(`/groups/${groupId}`);
            set({ group: data });
            const isAdmin = data.admins?.includes(authUser?._id);
            set({ isAdmin: isAdmin });
        } catch (error) {
            set({ group: null });
            toast.error(error.response.data);
        } finally {
            set({ isGroupLoading: false })
        }
    }
}))