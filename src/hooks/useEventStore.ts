import client from "@/utils/client";
import { Event, EventType, Visibility, MeetingType } from "@/types";
import { create } from "zustand";
import events, { getEventsRequestParams } from "api/events";
import userProfile from "api/user-profile";
import FormData from "form-data";

type EventStore = {
  event: Event;
  events: Event[];
  joinedEvents: Event[];
  myEvents: Event[];
  fetchEvents: (params: getEventsRequestParams) => void;
  fetchJoinEvents: (params: getEventsRequestParams) => void;
  fetchMyEvents: (params: getEventsRequestParams) => void;
  getEventDetail: (id: string) => void;
  setEvent: (params: Event) => void;
  updateEventDetail: (id: string, params: FormData) => void;
  updateEventDescription: (id: string, description: string) => void;
  cancelEvent: (id: string) => void;
  fetchEvent: (id: string) => void;
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
  myEvents: [],
  getEventDetail: (id: string) => {
    events.getEventByID(id).then((res: any) => set({ event: res }));
  },
  updateEventDetail: async (id: string, params: FormData) => {
    events.updateEventDetail(id, params);
  },
  updateEventDescription: (id: string, description: string) => {
    events
      .updateEventDescription(id, description)
      .then((res: any) => set({ event: res }));
  },
  cancelEvent: (id: string) => {
    events.cancelEvent(id);
  },
  fetchEvent: (id: string) => {
    client.get(`/events/${id}`).then((res: any) => set({ events: res.data }));
  },
  fetchEvents: (params) => {
    events.getEvents(params).then((res: any) => set({ events: res }));
  },
  fetchJoinEvents: (params) => {
    userProfile
      .getJoinedEvents(params)
      .then((res: any) => set({ joinedEvents: res }));
  },
  fetchMyEvents: (params) => {
    userProfile.getMyEvents(params).then((res: any) => set({ myEvents: res }));
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
