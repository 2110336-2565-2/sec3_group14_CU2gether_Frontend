import { CU_API } from "@/config";
import { Event, EventType, MeetingType } from "@/types";
import client from "@/utils/client";
import FormData from "form-data";

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
    throw new Error("Error fetching events")
  }
};

const getEventByID = async (id: String) => {
  try {
    const event = await client.get(`${baseUrl}/${id}`);
    return event.data;
  } catch (err) {
    throw new Error("Error fetching event detail")
  }
};

const updateEventDetail = async (id: string, params: FormData) => {
  try {
    const events = await client.patch(`${baseUrl}/${id}`, params, {
      "Content-Type": "multipart/form-data",
    });
    return true;
  } catch (err) {
    throw new Error("Error updating event's detail");
  }
};

const updateEventDescription = async (id: String, description: String) => {
  try {
    await client.patch(`${baseUrl}/${id}`, {
      description,
    });
    return true;
  } catch (err) {
    throw new Error("Error updating event's description");
  }
};

const updateEventImage = async (id: String, pictures: String[]) => {
  try {
    await client.patch(`${baseUrl}/${id}`, {
      pictures,
    });
  } catch (err) {
    console.log(err);
  }
};

const cancelEvent = async (id: String) => {
  try {
    await client.delete(`${baseUrl}/${id}`);
  } catch (err) {
    throw new Error("Error cancel event");
  } 
};

const getOwnEvents = async () => {
  try {
    const events = await client.get(CU_API + "userProfile/myevent");
    return events.data;
  } catch (error) {
    throw new Error("Error fetching event");
  }
};

const getOwnEventsById = async (id: string) => {
  try {
    const events = await client.get(baseUrl + "/" + id);
    return events.data;
  } catch (error) {
    throw new Error("Error fetching event");
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
    getEventByID,
    updateEventDetail,
    updateEventDescription,
    cancelEvent,
    joinEvent,
    unjoinEvent,
    getOwnEvents,
    getOwnEventsById,
    createEvent
}

export default events;
