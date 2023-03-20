import { Dayjs } from "dayjs";

export type Event = {
  id: number;
  srcImg: string;
  altImg: string;
  date: Dayjs;
  name: string;
  join: boolean;
  location: string;
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
