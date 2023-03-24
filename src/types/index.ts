export enum EventType {
  RESTAURANT = "RESTAURANT",
  CAFE = "CAFE",
  BAR = "BAR",
  SPORT = "SPORT",
  VOLUNTEER = "VOLUNTEER",
  CONCERT = "CONCERT",
  PHOTO_TRIP = "PHOTO_TRIP",
  BOARDGAME = "BOARDGAME",
  SEMINAR = "SEMINAR",
  SPECIAL_DAY = "SPECIAL_DAY",
  OTHERS = "OTHERS",
}

export enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export enum MeetingType {
  ONSITE = "ONSITE",
  ONLINE = "ONLINE",
}

export type Event = {
  id: number;
  eventName: string;
  eventType: EventType;
  visibility: Visibility;
  tags: string[];
  requireParticipantsMin: number;
  requireParticipantsMax: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  meetingType: MeetingType;
  location: string;
  website: string;
  pictures: string[];
  description: string;
  ownerName: string;
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
