import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + "events/";

const getEventById = async (eventId: string) => {
  try {
    const event = await client.get(baseUrl + eventId);
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
    const event = await client.post(baseUrl + eventId + "/join");
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
    const event = await client.delete(baseUrl + eventId + "/unjoin");
    if (event.status === 200) {
      return event.data;
    } else {
      throw new Error("Error unjoin event with status code: " + event.status);
    }
  } catch (err) {
    console.log(err);
  }
};

const eventDetail = {
  getEventById,
  joinEvent,
  unjoinEvent,
};

export default eventDetail;
