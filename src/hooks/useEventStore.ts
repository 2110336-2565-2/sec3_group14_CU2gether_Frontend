import client from "@/utils/client";
import { Event } from "@/types";
import { create } from "zustand";
import events, { getEventsRequestParams } from "api/events";

type EventStore = {   
  event?: Event;
  events: Event[];
  joinedEvents: Event[];
  getEventDetail: (id: string) => void;
  updateEventDetail: (id: string, params: Event) => void;
  updateEventDescription: (id: string, description: string) => void;
  cancelEvent: (id: string) => void;
  fetchEvent: (id: string) => void
  fetchEvents: (params: getEventsRequestParams) => void;
  fetchJoinEvents: (id: string) => void;
};

const useEventStore = create<EventStore>((set) => ({
  events: [],
  joinedEvents: [],
  getEventDetail: (id: string) => {
    events.getEventByID(id)
    .then((res: any) => set({event: res}));
  },
  updateEventDetail: (id: string, params: Event) => {
    events.updateEventDetail(id, params)
    .then((res: any) => set({event: res}));
  },
  updateEventDescription: (id: string, description: string) => {
    events.updateEventDescription(id, description)
    .then((res: any) => set({event: res}));
  },
  cancelEvent: (id: string) => {
    events.cancelEvent(id)
  },
  fetchEvent: (id: string) => {
    client
    .get(`/events/${id}`)
    .then((res: any) => set({ events: res.data }));
  },
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
