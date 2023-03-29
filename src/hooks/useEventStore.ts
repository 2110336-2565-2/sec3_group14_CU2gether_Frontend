import { Event, EventType, MeetingType, Visibility } from "@/types";
import { create } from "zustand";
import events, { getEventsRequestParams } from "api/events";
import userProfile from "api/user-profile";

type EventStore = {
  event: Event;
  events: Event[];
  joinedEvents: Event[];
  fetchEvents: (params: getEventsRequestParams) => void;
  fetchJoinEvents: (params: getEventsRequestParams) => void;
  setEvent: (params: Event) => void;
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
}));

export default useEventStore;