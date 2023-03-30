import { create } from "zustand";
import userProfile from "api/user-profile";
import { ROLE } from "@/types";

type ProfileStore = {
  name?: string;
  role?: ROLE;
  email?: string;
  imageUrl?: string;
  id?: number;
  checkStatus: () => void;
};

const useProfileStore = create<ProfileStore>((set) => ({
  checkStatus: () => {
    userProfile
      .checkStatus()
      .then((data: any) => {
        if (!data) return;
        const { role, name, email, imageUrl, id } = data;
        set({ role, name, email, imageUrl, id });
      })
      .catch((err: any) => console.log(err));
  },
}));

export default useProfileStore;
