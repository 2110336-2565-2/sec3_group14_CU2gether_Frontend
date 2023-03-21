import client from "@/utils/client";
import { Event } from "@/types";
import { create } from "zustand";
import events from "api/events";

type EventRequestParams = { page: number; limit: number; searchKey: string };

type EventStore = {
  events: Event[];
  joinedEvents: Event[];
  fetchEvents: ({
    page,
    limit,
    searchKey,
  }: {
    page?: number;
    limit?: number;
    searchKey?: string;
  }) => void;
  fetchJoinEvents: (id: string) => void;
};

const useEventStore = create<EventStore>((set) => ({
  events: [],
  joinedEvents: [],
  fetchEvents: ({ page = 1, limit = -1, searchKey = "" }) => {
    events
      .getEvents(page, limit, searchKey)
      .then((res: any) => set({ events: res }));
  },
  fetchJoinEvents: (id: string) => {
    client
      .get(`/events/join/${id}`)
      .then((res: any) => set({ joinedEvents: res.data }));
  },
}));

export default useEventStore;
