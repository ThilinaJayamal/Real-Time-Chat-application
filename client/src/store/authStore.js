import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set, get) => (
    {
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isCheckingAuth: true,
        onlineUsers: [],
        socket: null,

        checkAuth: async () => {
            try {
                const { data } = await axiosInstance.get("/auth/check");
                set({ authUser: data });
                get().connectSocket();
            } catch (error) {
                set({ authUser: null });
            } finally {
                set({ isCheckingAuth: false });
            }
        },

        signup: async (formdata) => {
            try {
                const { data } = await axiosInstance.post("/auth/signup", formdata);
                set({ authUser: data });
                get().connectSocket();
                toast.success("Account created successfully!")
            } catch (error) {
                toast.error(error.response.data.message);
                set({ authUser: null });
            } finally {
                set({ isSigningUp: false });
            }
        },

        login: async (formdata) => {
            try {
                const { data } = await axiosInstance.post("/auth/login", formdata);
                set({ authUser: data });
                //get().connectSocket();
                toast.success("Logged in successfully!")
            } catch (error) {
                toast.error(error.response.data.message);
                set({ authUser: null });
            } finally {
                set({ isSigningUp: false });
            }
        },

        logout: async () => {
            try {
                const { data } = await axiosInstance.post("/auth/logout");
                set({ authUser: null });
                get().disconnectSocket();
                toast.success("Logged out successfully!");
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ authUser: null });
            }
        },

        updateProfile: async (image) => {
            try {
                const { data } = await axiosInstance.post("/auth/update-profile", image);
                toast.success(data.message)
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message);
            }
        },

        connectSocket: () => {
            try {
                const { authUser } = get();
                if (!authUser || get().socket?.connected) {
                    return;
                }
                const socket = io(BASE_URL,
                    {
                        query:{
                            userId:authUser._id
                        }
                    }
                );
                socket.connect();
                set({socket:socket});

                socket.on("getOnlineUsers",(userIds)=>{
                    set({onlineUsers:userIds});
                })
            } catch (error) {
                console.log(error)
            }
        },

        disconnectSocket: () => {
            if(get().socket?.connected){
                get().socket?.disconnect();
            }
        }
    }
))
