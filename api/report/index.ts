import { CU_API } from "@/config";
import client from "@/utils/client";
import FormData from "form-data";
const eventUrl = CU_API + "events/";
const eventReportUrl = CU_API + "reports/events/";
const webReportUrl = CU_API + "reports/webs/";
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
const createEventReport = async (params: FormData) => {
  try {
    const eventReport = await client.post(eventReportUrl, params, {
      "Content-Type": "multipart/form-data",
    });
    if (eventReport.status === 201) {
      return true;
    } else {
      throw new Error(
        "Error on creating event with status code: " + eventReport.status
      );
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
const createWebReport = async (params: FormData) => {
  try {
    const webReport = await client.post(webReportUrl, params, {
      "Content-Type": "multipart/form-data",
    });
    if (webReport.status === 201) {
      return true;
    } else {
      throw new Error(
        "Error on creating event with status code: " + webReport.status
      );
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
const getMyEventReports = async () => {
  try {
    const eventReports = await client.get(eventReportUrl);
    if (eventReports.status === 200) {
      return eventReports.data;
    } else {
      throw new Error(
        "Error on creating event with status code: " + eventReports.status
      );
    }
  } catch (err) {
    console.log(err);
  }
};
const getMyWebReports = async () => {
  try {
    const webReports = await client.get(webReportUrl);
    if (webReports.status === 200) {
      return webReports.data;
    } else {
      throw new Error(
        "Error on creating event with status code: " + webReports.status
      );
    }
  } catch (err) {
    console.log(err);
  }
};
const report = {
  getEventByID,
  createEventReport,
  createWebReport,
  getMyEventReports,
  getMyWebReports,
};

export default report;
