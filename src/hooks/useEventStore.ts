import client from "@/utils/client";
import { Event } from "@/types";
import { create } from "zustand";
import events, { getEventsRequestParams } from "api/events";
import event from "api/event";

type EventStore = {   
  eventDetail: [];
  events: Event[];
  joinedEvents: Event[];
  getEventDetail: (id: string) => void;
  updateEventDetail: (id: string, params: any) => void;
  fetchEvents: (params: getEventsRequestParams) => void;
  fetchJoinEvents: (id: string) => void;
};

const useEventStore = create<EventStore>((set) => ({
  eventDetail: [],
  events: [],
  joinedEvents: [],
  getEventDetail: (id: string) => {
    client
    .get(`/events/${id}`)
    .then((res: any) => set({ eventDetail: res.data }));
  },
  updateEventDetail: (id: string, params: any) => {
    client
    .patch(`/events/${id}`, params)
    .then((res: any) => set({ eventDetail: res.data }));
  },
  fetchEvents: (params) => {
    events.getEvents(params)
    .then((res: any) => set({ events: res }));
  },
  fetchJoinEvents: (id: string) => {
    client
      .get(`/events/join/${id}`)
      .then((res: any) => set({ joinedEvents: res.data }));
  },
}));

export default useEventStore;
