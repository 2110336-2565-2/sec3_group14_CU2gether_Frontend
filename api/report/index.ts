import axios, { AxiosError } from "axios";
import { CU_API } from "@/config";
import { Dayjs } from "dayjs";
import client from "@/utils/client";
import { EventType, MeetingType, Visibility } from "@/types";

const eventUrl = CU_API + "events/";

export const getEventByID = async (id: String) => {
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

export const updateEventDetail = async (
  id: string,
  eventName: string,
  eventType: EventType,
  visibility: Visibility,
  tags: string[],
  requireParticipantsMin: number,
  requireParticipantsMax: number,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  meetingType: MeetingType,
  location: string,
  website: string
) => {
  try {
    await client.patch(`${eventUrl}${id}`, {
      eventName,
      eventType,
      visibility,
      tags,
      requireParticipantsMin,
      requireParticipantsMax,
      startDate,
      endDate,
      startTime,
      endTime,
      meetingType,
      location,
      website,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateEventDescription = async (
  id: String,
  description: String
) => {
  try {
    await client.patch(`${eventUrl}${id}`, {
      description,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateEventImage = async (id: String, pictures: String[]) => {
  try {
    await client.patch(`${eventUrl}${id}`, {
      pictures,
    });
  } catch (err) {
    console.log(err);
  }
};

export const cancelEvent = async (id: String) => {
  try {
    await client.delete(`${eventUrl}${id}`);
  } catch (err) {
    console.log(err);
  }
};

const report = {
  getEventByID,
  updateEventDetail,
  updateEventDescription,
  cancelEvent,
};

export default report;
