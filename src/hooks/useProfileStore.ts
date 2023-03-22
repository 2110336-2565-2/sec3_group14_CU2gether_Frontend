import client from "@/utils/client";
import { User } from "@/types";
import { create } from "zustand";
import userProfile from "api/user-profile";

type ProfileStore = {
  isLogin: boolean;
  checkStatus: () => void;
};

const useProfileStore = create<ProfileStore>((set) => ({
  isLogin: false,
  checkStatus: () =>{
    userProfile.checkStatus().then((res: any) => set({ isLogin: res }));
  }
}));

export default useProfileStore;
