import client from "@/utils/client";
import { Event } from "@/types";
import { create } from "zustand";
import events, { getEventsRequestParams } from "api/events";
import FormData from "form-data";

type EventStore = {
  events: Event[];
  joinedEvents: Event[];
  fetchEvents: (params: getEventsRequestParams) => void;
  fetchJoinEvents: (id: string) => void;
  createEvent: (params: FormData) => Promise<boolean>;
  fetchOwnEvents: () => void;
  fetchOwnEventsById: (id: string) => void;
};

const useEventStore = create<EventStore>((set) => ({
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
