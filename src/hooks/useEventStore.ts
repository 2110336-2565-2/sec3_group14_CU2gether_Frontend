import client from "@/utils/client";
import { Event } from "@/types";
import { create } from "zustand";
import events, { getEventsRequestParams } from "api/events";

type EventStore = {
  events: Event[];
  joinedEvents: Event[];
  fetchEvents: (params: getEventsRequestParams) => void;
  fetchJoinEvents: () => void;
};

const useEventStore = create<EventStore>((set) => ({
  events: [],
  joinedEvents: [],
  fetchEvents: (params) => {
    events.getEvents(params).then((res: any) => set({ events: res }));
  },
  fetchJoinEvents: () => {
    client
      .get("http://localhost:3001/userProfile/joining-event")
      .then((res: any) => set({ joinedEvents: res.data }));
  },
}));

export default useEventStore;
