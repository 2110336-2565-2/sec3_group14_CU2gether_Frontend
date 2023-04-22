import { OrganizerRequest, RequestStatus } from "@/types";
import admin from "@/pages/api/admin";
import { create } from "zustand";

type AdminStore = {
  organizerRequests: OrganizerRequest[];
  fetchOrganizerRequests: () => void;
};

const useAdminStore = create<AdminStore>((set, get) => ({
  organizerRequests: [],
  fetchOrganizerRequests: async () => {
    try {
      const _organizerRequests = await admin.getOrganizerRequests();
      set({
        organizerRequests: _organizerRequests,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  removeOrganizerRequest: async (idx: string) => {
    set({ organizerRequests: _organizer });
  },
}));

export default useAdminStore;
