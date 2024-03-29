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
export type Report = {
  id: number;
  topic: string;
  description: string;
  createdAt: string;
  eventName?: string;
  ownerName?: string;
  imageUrl?: string[];
};
export enum ReportStatus {
  INITIATED = "INITIATED",
  WORKING = "WORKING",
  CLOSED = "CLOSED",
}
export enum ROLE {
  STUDENT = "STUDENT",
  ORGANIZER = "ORGANIZER",
  ADMIN = "ADMIN",
}

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHERS = "OTHERS",
}

export enum UPLOAD_MODE {
  PROFILE = "Profile",
  COVER = "Cover",
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
  ownerName?: string;
  ownerId?: number;
  finished?: boolean;
  ticketPrice?: number;
};

export type Student = {
  studentId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  coverImageUrl: string;
  cardId: string;
  description: string;
  createTimes: number;
  cancelTimes: number;
  joinTimes: number;
  unjoinTimes: number;
  role: ROLE;
  credits: number;
};

export type Organizer = {
  email: string;
  name: string;
  coorName: string;
  phone: string;
  description: string;
  password: string;
  createTimes: number;
  cancelTimes: number;
  imageUrl: string;
  coverImageUrl: string;
  role: ROLE;
  credits: number;
};

export type Review = {
  score: number;
  comment: string;
};

export type User = Student | Organizer;

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type OrganizerRequest = {
  id: string;
  email: string;
  name: string;
  coorName: string;
  phone: string;
  description: string;
  status: RequestStatus;
};

export type Transaction = {
  id: number;
  userId: number;
  mode: TransactionMode;
  amount: number;
  isCompleted: Boolean;
  createdAt: string;
  completedAt?: string;
};

export enum TransactionMode {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}
