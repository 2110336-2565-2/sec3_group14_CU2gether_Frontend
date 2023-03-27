import axios, { AxiosError } from "axios";
import { CU_API } from "@/config";
import { Dayjs } from "dayjs";
import client from "@/utils/client";
import { EventType, MeetingType, Visibility } from "@/types";
import { Event } from "@/types";

const eventUrl = CU_API + "events/";

const getEventByID = async (id: String) => {
  try {
    const event = await client.get(`${eventUrl}${id}`);
    if (event.status === 200) {
      return event.data;
    } else {
      throw new Error(
        "Error fetching events with status code: " + event.status
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const updateEventDetail = async (id: string, params: Event) => {
  try {
    await client.patch(`${eventUrl}${id}`, { ...params });
  } catch (err) {
    console.log(err);
  }
};

const updateEventDescription = async (id: String, description: String) => {
  try {
    await client.patch(`${eventUrl}${id}`, {
      description,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateEventImage = async (id: String, pictures: String[]) => {
  try {
    await client.patch(`${eventUrl}${id}`, {
      pictures,
    });
  } catch (err) {
    console.log(err);
  }
};

const cancelEvent = async (id: String) => {
  try {
    await client.delete(`${eventUrl}${id}`);
  } catch (err) {
    console.log(err);
  }
};

const event = {
  getEventByID,
  updateEventDetail,
  updateEventDescription,
  cancelEvent,
};

export default event;
