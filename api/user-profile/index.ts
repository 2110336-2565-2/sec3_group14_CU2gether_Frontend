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

const getJoinedEvents = async (params: getEventsRequestParams) => {
  try {
    const joinedEvents = await client.get(`${baseUrl}/joining-event`, {
      ...params,
    });

    return joinedEvents.data;
  } catch (err) {
    console.log("Error fetching joinedEvents");
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

const getMyEvents = async (params: getEventsRequestParams) => {
  try {
    const MyEvents = await client.get(`${baseUrl}/myevent`, {
      ...params,
    });
    if (MyEvents.status === 200) {
      return MyEvents.data;
    } else {
      throw new Error(
        "Error fetching joinedEvents with status code: " + MyEvents.status
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const userProfile = {
  checkStatus,
  getJoinedEvents,
  checkStatusById,
  uploadImage,
  uploadCoverImage,
  getMyEvents,
};

export default userProfile;
