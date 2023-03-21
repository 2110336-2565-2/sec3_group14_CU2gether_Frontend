import { Dayjs } from "dayjs";

export enum EventType {
  "RESTAURANT",
  "CAFE",
  "BAR",
  "SPORT",
  "VOLUNTEER",
  "CONCERT",
  "PHOTO_TRIP",
  "BOARDGAME",
  "SEMINAR",
  "SPECIAL_DAY",
  "OTHERS",
}

export enum Visibility {
  "PUBLIC",
  "PRIVATE",
}

export enum MeetingType {
  "ONSITE",
  "ONLINE"
}

export type Event = {
  eventName: string;
  eventType: EventType;
  visibility: Visibility;
  tags: string[];
  requireParticipantsMin: number;
  requireParticipantsMax: number;
  startDate: Dayjs;
  endDate: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
  meetingType: string;
  location: string;
  website: string;
  pictures: string[];
};

export type Student = {
  studentId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  cardId: string;
};

export type Organizer = {
  email: string;
  name: string;
  coorName: string;
  phone: string;
  description: string;
  password: string;
};

export type User = Student | Organizer;
