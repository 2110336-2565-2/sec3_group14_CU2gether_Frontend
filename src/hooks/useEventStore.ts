import client from "@/utils/client";
import { Event } from "@/types";
import { create } from "zustand";
import events, { getEventsRequestParams } from "api/events";
import FormData from "form-data";

type EventStore = {
  event?: Event;
  events: Event[];
  joinedEvents: Event[];
  getEventDetail: (id: string) => void;
  fetchEvents: (params: getEventsRequestParams) => void;
  fetchJoinEvents: (id: string) => void;
  createEvent: (params: FormData) => Promise<boolean>;
};

const useEventStore = create<EventStore>((set) => ({
  events: [],
  joinedEvents: [],
  getEventDetail: (id: string) => {
    events.getEventById(id).then((res: any) => set({ event: res }));
  },
  fetchEvents: (params) => {
    events.getEvents(params).then((res: any) => set({ events: res }));
  },
  fetchJoinEvents: (id: string) => {
    client
      .get(`/events/join/${id}`)
      .then((res: any) => set({ joinedEvents: res.data }));
  },
  createEvent: async (params: FormData) => {
    const res = await events.createEvent(params);
    return res;
  },
}));

export default useEventStore;
