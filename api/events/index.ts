import { CU_API } from "@/config";
import { EventType, MeetingType } from "@/types";
import client from "@/utils/client";

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

const getEventById = async (eventId: string) => {
  try {
    const event = await client.get(`${baseUrl}/${eventId}`);
    if (event.status === 200) {
      return event.data;
    } else {
      throw new Error(
        "Error fetching event by eventId with status code: " + event.status
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const joinEvent = async (eventId: string) => {
  try {
    const event = await client.post(`${baseUrl}/${eventId}/join`);
    if (event.status === 200) {
      return event.data;
    } else {
      throw new Error("Error join event with status code: " + event.status);
    }
  } catch (err) {
    console.log(err);
  }
};

const unjoinEvent = async (eventId: string) => {
  try {
    const event = await client.delete(`${baseUrl}/${eventId}/unjoin`);
    if (event.status === 200) {
      return event.data;
    } else {
      throw new Error("Error unjoin event with status code: " + event.status);
    }
  } catch (err) {
    console.log(err);
  }
};

const events = {
  getEvents,
  getEventById,
  joinEvent,
  unjoinEvent,
};

export default events;
