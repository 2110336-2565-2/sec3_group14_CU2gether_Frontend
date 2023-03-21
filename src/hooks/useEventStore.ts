import client from "@/utils/client";
import { Event } from "@/types";
import { create } from "zustand";
import events from "api/events";
import event from "api/event";

type EventStore = {
  event: [];
  events: Event[];
  joinedEvents: Event[];
  fetchEvent: (id: String) => void;
  fetchEvents: () => void;
  fetchJoinEvents: (id: string) => void;
};

const useEventStore = create<EventStore>((set) => ({
  event: [],
  events: [],
  joinedEvents: [],  
  fetchEvent: (id: String) => {
    event.getEventByID(id).then((res: any) => set({ event: res }));
  },
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
