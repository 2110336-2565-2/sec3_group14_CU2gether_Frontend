import { CU_API } from "@/config";
import { EventType, MeetingType } from "@/types";
import client from "@/utils/client";
import FormData from "form-data";

import { Event } from "@/types";

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
    const events = await client.get(`${CU_API}userProfile/myevent`);
    return events.data;
  } catch (error) {
    throw new Error("Error fetching event");
  }
};

const getOwnEventsById = async (id: string) => {
  try {
    const events = await client.get(`${baseUrl}/${id}`);
    return events.data;
  } catch (error) {
    throw new Error("Error fetching event");
  }
};

const getEventById = async (eventId: string) => {
  try {
    const event = await client.get(`${baseUrl}/${eventId}`);
    return event.data;
  } catch (err) {
    console.log("Error fetching event by eventId");
  }
};

const joinEvent = async (eventId: string) => {
  try {
    const event = await client.post(`${baseUrl}/${eventId}/join`);
    return event.data;
  } catch (err) {
    console.log("Error fetching join event");
  }
};

const unjoinEvent = async (eventId: string) => {
  try {
    const event = await client.delete(`${baseUrl}/${eventId}/unjoin`);
    return event.data;
  } catch (err) {
    console.log("Error fetching unjoin event");
  }
};

const createEvent = async (params: FormData) => {
  try {
    const events = await client.post(baseUrl, params, {
      "Content-Type": "multipart/form-data",
    });
    return true;
  } catch (err) {
    console.log("Error on creating event");
    return false;
  }
};

const events = {
  getEvents,
  getEventById,
  joinEvent,
  unjoinEvent,
  createEvent,
  getOwnEvents,
  getOwnEventsById,
};

export default events;
