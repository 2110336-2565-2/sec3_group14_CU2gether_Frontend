import { OrganizerRequest, RequestStatus } from "@/types";
import admin from "api/admin";
import { create } from "zustand";

type EventStore = {
  organizerRequests: OrganizerRequest[];
  fetchOrganizerRequests: () => void;
};

const useAdminStore = create<EventStore>((set,get) => ({
  organizerRequests: [],
  fetchOrganizerRequests: async () => {
    try {
      const _organizerRequests = await admin.getOrganizerRequests();
      set({
        organizerRequests: _organizerRequests,
      });
    } catch (error) {
      console.log(error);
    }
  },
  removeOrganizerRequest: async (idx: string) => {
    set({organizerRequests:_organizer})
  }
}));

export default useAdminStore;
