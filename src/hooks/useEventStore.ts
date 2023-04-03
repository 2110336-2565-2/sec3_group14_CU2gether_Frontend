import client from "@/utils/client";
import { Event, EventType, Visibility, MeetingType } from "@/types";
import { create } from "zustand";
import events, { getEventsRequestParams } from "api/events";
import FormData from "form-data";

type EventStore = {   
  event?: Event;
  events: Event[];
  joinedEvents: Event[];
  getEventDetail: (id: string) => void;
  updateEventDetail: (id: string, params: FormData) => void;
  updateEventDescription: (id: string, description: string) => void;
  cancelEvent: (id: string) => void;
  fetchEvent: (id: string) => void
  fetchEvents: (params: getEventsRequestParams) => void;
  fetchJoinEvents: (id: string) => void;
  createEvent: (params: FormData) => Promise<boolean>;
  fetchOwnEvents: () => void;
  fetchOwnEventsById: (id: string) => void;
};

const useEventStore = create<EventStore>((set) => ({
  events: [],
  joinedEvents: [],
  getEventDetail: (id: string) => {
    events.getEventByID(id)
    .then((res: any) => set({event: res}));
  },
  updateEventDetail: async (id: string, params: FormData) => {
    events.updateEventDetail(id, params);
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
  createEvent: async (params: FormData) => {
    const res = await events.createEvent(params);
    return res;
  },
  fetchOwnEvents: () => {
    events.getOwnEvents().then((res: any) => set({events: res}));
  },
  fetchOwnEventsById: (id: string) => {
    events.getOwnEventsById(id).then((res: any) => set({events: res}));
  }
}));

export default useEventStore;
