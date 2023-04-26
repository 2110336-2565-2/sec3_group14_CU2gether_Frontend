import { CU_API } from "@/config";
import { EventType, MeetingType } from "@/types";
import client from "@/utils/client";
import FormData from "form-data";

const baseUrl = CU_API + "userProfile";

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

const checkStatus = async () => {
  try {
    const res = await client.get(`${baseUrl}`);
    if (res.status === 200) {
      return res.data;
    } else if (res.status === 401) {
      return undefined;
    } else {
      throw new Error("Error occurs with status code: " + res.status);
    }
  } catch (err) {
    console.log(err);
  }
};

const checkStatusById = async (id: string) => {
  try {
    const res = await client.get(baseUrl + "/" + id);
    return res.data;
  } catch (error) {
    throw new Error(`Error to get check user: ${id} status`);
  }
};

const uploadImage = async (params: FormData) => {
  try {
    await client.post(baseUrl + "/uploadImage", params, {
      "Content-Type": "multipart/form-data",
    });
  } catch (error) {
    throw new Error(`Error to upload image`);
  }
};

const uploadCoverImage = async (params: FormData) => {
  try {
    await client.post(baseUrl + "/uploadCoverImage", params, {
      "Content-Type": "multipart/form-data",
    });
  } catch (error) {
    throw new Error(`Error to upload image`);
  }
};

const getJoinedEvents = async () => {
  try {
    const joinedEvents = await client.get(`${baseUrl}/joining-event`);
    return joinedEvents.data;
  } catch (err) {
    console.log("Error fetching joinedEvents");
  }
};

const getJoinedEventsFinished = async () => {
  try {
    const joinedEventsFinished = await client.get(
      `${baseUrl}/joining-event/finished`
    );
    return joinedEventsFinished.data;
  } catch (err) {
    console.log("Error fetching joinedEventsFinished");
  }
};

const getMyEvents = async () => {
  try {
    const MyEvents = await client.get(`${baseUrl}/myevent`);
    return MyEvents.data;
  } catch (err) {
    throw new Error("Error getting my events");
  }
};

const getMyEventsFinished = async () => {
  try {
    const MyEventsFinished = await client.get(`${baseUrl}/myevent/finished`);
    return MyEventsFinished.data;
  } catch (err) {
    console.log("Error fetching MyEventsFinished");
  }
};

const getEventsByOwner = async (userId: String) => {
  try {
    const events = await client.get(`${baseUrl}/events/${userId}`);
    return events.data;
  } catch (err) {
    throw new Error("Error fetching event detail");
  }
};

const getEventsFinishedByOwner = async (userId: String) => {
  try {
    const events = await client.get(`${baseUrl}/events/finished/${userId}`);
    return events.data;
  } catch (err) {
    throw new Error("Error fetching event detail");
  }
};

const userProfile = {
  checkStatus,
  getJoinedEvents,
  checkStatusById,
  uploadImage,
  uploadCoverImage,
  getMyEvents,
  getJoinedEventsFinished,
  getMyEventsFinished,
  getEventsByOwner,
  getEventsFinishedByOwner,
};

export default userProfile;
