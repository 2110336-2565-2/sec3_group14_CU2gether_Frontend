import { CU_API } from "@/config";
import { EventType, MeetingType } from "@/types";
import client from "@/utils/client";

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

const getJoinedEvents = async (params: getEventsRequestParams) => {
  try {
    const joinedEvents = await client.get(`${baseUrl}/joining-event`, {
      ...params,
    });
    if (joinedEvents.status === 200) {
      return joinedEvents.data;
    } else {
      throw new Error(
        "Error fetching joinedEvents with status code: " + joinedEvents.status
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const userProfile = {
  checkStatus,
  getJoinedEvents,
};

export default userProfile;