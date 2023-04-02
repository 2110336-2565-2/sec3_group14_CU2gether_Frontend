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
    if (events.status === 200) {
      return true;
    } else {
      throw new Error(
        "Error on updating event with status code: " + events.status
      );
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateEventDescription = async (id: String, description: String) => {
  try {
    await client.patch(`${baseUrl}/${id}`, {
      description,
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

const createEvent = async (params: FormData) => {
  try {
    const events = await client.post(baseUrl, params, {
      "Content-Type": "multipart/form-data",
    });
    if (events.status === 201) {
      return true;
    } else {
      throw new Error(
        "Error on creating event with status code: " + events.status
      );
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const events = {
  getEvents,
  getEventByID,
  updateEventDetail,
  updateEventDescription,
  cancelEvent,
  createEvent,
};

export default events;
