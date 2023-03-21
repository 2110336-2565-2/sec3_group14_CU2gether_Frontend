import client from "@/utils/client";
import { Event } from "@/types";
import { create } from "zustand";
import events from "api/events";

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
    events.getEvents().then((res: any) => set({ events: res }));
  },
  fetchJoinEvents: (id: string) => {
    client
      .get(`/events/join/${id}`)
      .then((res: any) => set({ joinedEvents: res.data }));
  },
}));

export default useEventStore;
