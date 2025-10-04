import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast"

export const useGroupStore = create((set, get) => ({
    isCreating:false,

    createGroup:async (formData) =>{
        set({isCreating:true})
        try {
            const {data} = await axiosInstance.post("/groups",formData);
            toast.success("Group created successfully!")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data);
        }
        finally{
            set({isCreating:false})
        }
    }
}))