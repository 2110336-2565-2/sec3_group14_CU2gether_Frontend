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
  studentId: String;
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  image: String;
  cardId: String;
};

export type Organizer = {
  email: String;
  name: String;
  coorName: String;
  phone: String;
  description: String;
  password: String;
};

export type User = Student | Organizer;
