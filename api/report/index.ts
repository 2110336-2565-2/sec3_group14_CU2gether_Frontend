import { CU_API } from "@/config";
import client from "@/utils/client";
import FormData from "form-data";
const eventReportUrl = CU_API + "event-report";
const webReportUrl = CU_API + "web-report";

const createEventReport = async (params: FormData, id: string) => {
  try {
    const eventReport = await client.post(`${eventReportUrl}/${id}`, params, {
      "Content-Type": "multipart/form-data",
    });
    return true;
  } catch (err) {
    throw new Error("Error on creating event report");
  }
};
const createWebReport = async (params: FormData) => {
  try {
    const webReport = await client.post(webReportUrl, params, {
      "Content-Type": "multipart/form-data",
    });
    return true;
  } catch (err) {
    throw new Error("Error on creating web report");
  }
};
const getMyEventReports = async () => {
  try {
    const eventReports = await client.get(`${eventReportUrl}/myreport`);
    return eventReports.data;
  } catch (err) {
    throw new Error("Error fetching event report");
  }
};
const getMyWebReports = async () => {
  try {
    const webReports = await client.get(`${webReportUrl}/myreport`);
    return webReports.data;
  } catch (err) {
    throw new Error("Error fetching web report");
  }
};
const report = {
  createEventReport,
  createWebReport,
  getMyEventReports,
  getMyWebReports,
};

export default report;
