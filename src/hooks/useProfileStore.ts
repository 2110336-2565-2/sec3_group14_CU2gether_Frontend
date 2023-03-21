import client from "@/utils/client";
import { User } from "@/types";
import { create } from "zustand";

type ProfileStore = {
  profile: User;
};

const useProfileStore = create<ProfileStore>((set) => ({
  profile: {},
  getProfile: (id: string) => {
  }
}));

export default useProfileStore;
