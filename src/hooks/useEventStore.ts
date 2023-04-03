import { Event, EventType, MeetingType, Visibility } from "@/types";
import { create } from "zustand";
import events, { getEventsRequestParams } from "api/events";
import userProfile from "api/user-profile";
import FormData from "form-data";

type EventStore = {
  event: Event;
  events: Event[];
  joinedEvents: Event[];
  getEventDetail: (id: string) => void;
  fetchEvents: (params: getEventsRequestParams) => void;
  fetchJoinEvents: (params: getEventsRequestParams) => void;
  setEvent: (params: Event) => void;
  createEvent: (params: FormData) => Promise<boolean>;
  fetchOwnEvents: () => void;
  fetchOwnEventsById: (id: string) => void;
};

const useEventStore = create<EventStore>((set) => ({
  event: {
    id: 0,
    eventName: "",
    eventType: EventType.CONCERT,
    visibility: Visibility.PUBLIC,
    tags: [],
    requireParticipantsMin: 1,
    requireParticipantsMax: 10,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    meetingType: MeetingType.ONSITE,
    location: "",
    website: "",
    description: "",
    pictures: [""],
    ownerName: "",
  },
  events: [],
  joinedEvents: [],
  getEventDetail: (id: string) => {
    events.getEventById(id).then((res: any) => set({ event: res }));
  },
  fetchEvents: (params) => {
    events.getEvents(params).then((res: any) => set({ events: res }));
  },
  fetchJoinEvents: (params) => {
    userProfile
      .getJoinedEvents(params)
      .then((res: any) => set({ joinedEvents: res }));
  },
  setEvent: (params) => {
    set({ event: params });
  },
  createEvent: async (params: FormData) => {
    const res = await events.createEvent(params);
    return res;
  },
  fetchOwnEvents: () => {
    events.getOwnEvents().then((res: any) => set({ events: res }));
  },
  fetchOwnEventsById: (id: string) => {
    events.getOwnEventsById(id).then((res: any) => set({ events: res }));
  },
}));

export default useEventStore;
