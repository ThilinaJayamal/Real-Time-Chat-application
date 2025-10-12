import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast"
import { useGroupStore } from "./groupStore"
import { useAuthStore } from "./authStore";

export const useGroupChatStore = create((set, get) => ({
    messages: [],
    isMessageLoading: false,
    isMessageSending: false,

    getMessages: async () => {
        const id = useGroupStore.getState().selectedGroup?._id;
        set({ isMessageLoading: true })
        try {
            const { data } = await axiosInstance.get(`/group/messages/${id}`);
            console.log(data)
            set({ messages: data })
        } catch (error) {
            toast.error(error.response?.data);
            set({ messages: [] })
        } finally {
            set({ isMessageLoading: false })
        }
    },

    sendGroupMessage: async (message) => {
        const id = useGroupStore.getState().selectedGroup?._id;
        set({ isMessageSending: true })
        const { messages } = get();
        try {
            const { data } = await axiosInstance.post(`/group/messages/${id}`, message);
            set({ messages: [...messages, data] })
        } catch (error) {
            toast.error(error.response?.data);
            set({ messages: [] })
        } finally {
            set({ isMessageSending: false })
        }
    },

    subscribeToMessages: () => {
        const { selectedGroup } = useGroupStore.getState();
        if (!selectedGroup) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newGroupMessage", (message) => {
            // Only add message if it belongs to the currently selected group
            if(message.group !== selectedGroup._id) return;
            
            set({ messages: [...get().messages, message] });
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newGroupMessage");
    }
}))