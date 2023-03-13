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
