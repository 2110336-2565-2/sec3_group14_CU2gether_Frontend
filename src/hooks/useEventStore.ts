import client from "@/utils/client";
import { Event } from "@/types";
import { create } from "zustand";

type EventStore = {
  events: Event[];
  joinedEvents: Event[];
  fetchEvents: () => void;
  fetchJoinEvents: (id: string) => void;
};

const useEventStore = create<EventStore>((set) => ({
  events: [],
  joinedEvents: [],
  fetchEvents: () => {
    client.get("/events").then((res: any) => set({ events: res.data }));
  },
  fetchJoinEvents: (id: string) => {
    client
      .get(`/events/join/${id}`)
      .then((res: any) => set({ joinedEvents: res.data }));
  },
}));

export default useEventStore;
