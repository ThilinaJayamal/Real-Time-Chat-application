import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast"

export const useGroupStore = create((set, get) => ({
    isCreating: false,
    groups: [],
    isGroupsLoading: false,
    selectedGroup: null,

    setSelectGroup: (group) => {
        set({ selectedGroup: group });
    },

    createGroup: async (formData) => {
        set({ isCreating: true });
        const {groups} = get();
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
    }
}))