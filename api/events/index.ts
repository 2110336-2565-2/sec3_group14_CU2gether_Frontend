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

const getOwnEvents = async () => {
    try {
      const events = await client.get(CU_API+'userProfile/myevent');
      if(events.status === 200) {
        return events.data;
      } else {
        throw new Error("Error fetching own event with status code: " + events.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

const events = {
    getEvents,
    getOwnEvents
}

export default events;
