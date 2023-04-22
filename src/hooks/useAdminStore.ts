import { OrganizerRequest, RequestStatus } from "@/types";
import admin from "api/admin";
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
    } catch (error: any) {
      throw new Error(error);
    }
  },
  removeOrganizerRequest: async (idx: string) => {
    const { organizerRequests } = get();
    set({ organizerRequests: organizerRequests });
  },
}));

export default useAdminStore;
