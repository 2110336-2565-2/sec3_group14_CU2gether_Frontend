import client from "@/utils/client";
import { Event } from "@/types";
import { create } from "zustand";
import events, { getEventsRequestParams } from "api/events";

type EventStore = {
  event: [];
  events: Event[];
  joinedEvents: Event[];
  fetchEvents: (params: getEventsRequestParams) => void;
  fetchJoinEvents: (id: string) => void;
};

const useEventStore = create<EventStore>((set) => ({
  event: [],
  events: [],
  joinedEvents: [],
  fetchEvents: (params) => {
    events.getEvents(params).then((res: any) => set({ events: res }));
  },
  fetchJoinEvents: (id: string) => {
    client
      .get(`/events/join/${id}`)
      .then((res: any) => set({ joinedEvents: res.data }));
  },
}));

export default useEventStore;
