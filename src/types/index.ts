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
export enum ProblemType {
  SCAMMING = "SCAMMING",
  DRUGS = "DRUGS",
  UNAUTHORIZED_PUBLIC_RACING = "UNAUTHORIZED_PUBLIC_RACING",
  PUBLIC_LEWD = "PUBLIC_LEWD",
  GAMBLING = "GAMBLING",
  VIOLENCE = "VIOLENCE",
  DANGER = "DANGER",
  FOOD_POISIONING = "FOOD_POISIONING",
  OTHERS = "OTHERS",
}
export type EventReport = {
  topic: string;
  description: string;
  createdAt: string;
  eventName: string;
  ownerName: string;
  imageUrl: string[];
};
export type WebReport = {
  topic: string;
  description: string;
  createdAt: string;
  imageUrl: string[];
};
export type Event = {
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
  ownerName?: string;
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
