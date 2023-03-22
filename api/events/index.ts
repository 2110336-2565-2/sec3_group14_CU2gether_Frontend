import { CU_API } from "@/config";
import { EventType, MeetingType } from "@/types";
import client from "@/utils/client";

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
    if (events.status === 200) {
      return events.data;
    } else {
      throw new Error(
        "Error fetching events with status code: " + events.status
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const createEvent = async (params: Event) => {
    try {
        const events = await client.post(baseUrl, params, {"Content-Type": "multipart/form-data"});
        if (events.status === 201) {
            console.log("Create Success");
        } else {
            throw new Error("Error on creating event with status code: " + events.status);
        }
    } catch (err) {
        console.log(err);
    }
}

const events = {
    getEvents,
    createEvent
}

export default events;
