import axios, { AxiosError } from "axios";
import { CU_API } from "@/config";
import { Dayjs } from "dayjs";
import client from "@/utils/client";
import FormData from "form-data";
const eventUrl = CU_API + "events/";
const reportUrl = CU_API + "reports";
const userProfileUrl = CU_API + "userProfile/";
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
const createReport = async (params: FormData) => {
  try {
    const events = await client.post(reportUrl, params, {
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

const report = {
  getEventByID,
  createReport,
};

export default report;
