import { CU_API } from "@/config";
import { EventType, MeetingType } from "@/types";
import client from "@/utils/client";
import FormData from "form-data";

import { Event } from "@/types"

const baseUrl = CU_API + "events";

export type getEventsRequestParams = {
  page?: number;
  limit?: number;
  searchKey?: string;
  location?: string;
  eventType?: EventType;
  meetingType?: MeetingType;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
};

const getEvents = async (params: getEventsRequestParams) => {
  try {
    const events = await client.get(baseUrl, { ...params });
    return events.data;
  } catch (err) {
    throw new Error("Error fetching events");
  }
};

const getOwnEvents = async () => {
  try {
    const events = await client.get(CU_API+'userProfile/myevent');
    return events.data;
  } catch (error) {
    throw new Error("Error fetching event");
  }
}

const createEvent = async (params: FormData) => {
  try {
    const events = await client.post(baseUrl, params, {"Content-Type": "multipart/form-data"});
    if (events.status === 201) {
        return true;
    } else {
        throw new Error("Error on creating event with status code: " + events.status);
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

const events = {
    getEvents,
    getOwnEvents,
    createEvent
}

export default events;
