import client from "@/utils/client";
import { User } from "@/types";
import { create } from "zustand";
import userProfile from "api/user-profile";
import { ROLE } from "@/utils/Enum";

type ProfileStore = {
  name?: string;
  role?: ROLE;
  email?: string;
  imageUrl?: string;
  checkStatus: () => void;
};

const useProfileStore = create<ProfileStore>((set) => ({
  checkStatus: () => {
    userProfile
      .checkStatus()
      .then((data: any) => {
        if (!data) return;
        const { role, name, email, imageUrl } = data;
        set({ role, name, email, imageUrl });
      })
      .catch((err: any) => console.log(err));
  },
}));

export default useProfileStore;
