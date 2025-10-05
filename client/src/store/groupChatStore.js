import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast"

const useGroupChatStore = create((set, get) => ({
    messages: [],
    isMessageLoading: true,
    isMessageSending: true,

    getMessages: async (id) => {
        set({ isMessageLoading: true })
        try {
            const { data } = await axiosInstance.get(`/group/messages/${id}`);
            set({ messages: data })
        } catch (error) {
            toast.error(error.response?.data);
            set({ messages: [] })
        } finally {
            set({ isMessageLoading: false })
        }
    },

    sendMessage: async (id) => {
        set({ isMessageSending: true })
        try {
            const { data } = await axiosInstance.post(`/group/messages/${id}`);
        } catch (error) {
            toast.error(error.response?.data);
            set({ messages: [] })
        } finally {
            set({ isMessageSending: false })
        }
    }
}))