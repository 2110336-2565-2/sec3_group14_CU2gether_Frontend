import client from "@/utils/client";
import { Event } from "@/types";
import { create } from "zustand";
import events, { getEventsRequestParams } from "api/events";

type EventStore = {
  events: Event[];
  joinedEvents: Event[];
  isCreateEventSuccess: boolean;
  fetchEvents: (params: getEventsRequestParams) => void;
  fetchJoinEvents: (id: string) => void;
  createEvent: (params: Event) => void;
};

const useEventStore = create<EventStore>((set) => ({
  events: [],
  joinedEvents: [],
  isCreateEventSuccess: false,
  fetchEvents: (params) => {
    events.getEvents(params).then((res: any) => set({ events: res }));
  },
  fetchJoinEvents: (id: string) => {
    client
      .get(`/events/join/${id}`)
      .then((res: any) => set({ joinedEvents: res.data }));
  },
  createEvent: (params: Event) => {
    events.createEvent(params).then((isSuccess: boolean) => set({isCreateEventSuccess: isSuccess}));
  }
}));

export default useEventStore;
