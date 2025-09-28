import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
    theme:localStorage.getItem("theme") || "luxury",
    setTheme: (value)=>{
        localStorage.setItem("theme",value);
        set({theme:value});
    }
}))