import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast"
import { useAuthStore } from "./authStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSending: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const { data } = await axiosInstance.get("/messages/users");
            set({ users: data })
        } catch (error) {
            toast.error(error.response.data.message);
            set({ users: [] })
        }
        finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const { data } = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: data });
        }
        catch (error) {
            toast.error(error.response.data.message);
            set({ messages: [] });
        }
        finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (message) => {
        const { selectedUser, messages } = get();
        set({ isSending: true });
        try {
            if (!selectedUser) {
                return;
            }
            const { data } = await axiosInstance.post(`/messages/send/${selectedUser._id}`, message);
            set({ messages: [...messages, data] })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
        finally {
            set({ isSending: false });
        }
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser: selectedUser });
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.off("newMessage"); //prevent duplication
        socket.on("newMessage", (message) => {
            if(message.senderId !== selectedUser._id) return;
            
            set({ messages: [...get().messages, message] });
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }
}))