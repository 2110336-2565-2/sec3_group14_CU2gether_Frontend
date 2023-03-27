import { CU_API } from "@/config";
import { Event, EventType, MeetingType } from "@/types";
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

const getEventByID = async (id: String) => {
  try {
      const event = await client.get(`${baseUrl}/${id}`);
      if (event.status === 200) {
          return event.data;
      } else {
          throw new Error("Error fetching events with status code: " + event.status);
      }
  } catch(err) {
      console.log(err)
  }
}

const updateEventDetail = async (
  id: string,
  params: Event,
) => {
  try {
      await client.patch(
          `${baseUrl}/${id}`,
          params,
      );
  } catch(err) {
      console.log(err)
  }
}

const updateEventDescription = async (
  id: String,
  description: String,
) => {
  try {
      await client.patch(
          `${baseUrl}/${id}`, {
              description,
          }
      );
  } catch(err) {
      console.log(err);
  }
}

const updateEventImage = async (
  id: String,
  pictures: String[],
) => {
  try {
      await client.patch(
          `${baseUrl}/${id}`, {
              pictures,
          }
      );
  } catch(err) {
      console.log(err);
  }
}

const cancelEvent = async (
  id: String,
) => {
  try {
      await client.delete(
          `${baseUrl}/${id}`
      );
  } catch(err) {
      console.log(err);
  }
}

const events = {
  getEvents,
  getEventByID,
  updateEventDetail,
  updateEventDescription,
  cancelEvent,
};

export default events;
