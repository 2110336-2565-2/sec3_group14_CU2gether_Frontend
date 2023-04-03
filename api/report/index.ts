import { CU_API } from "@/config";
import client from "@/utils/client";
import FormData from "form-data";
const eventReportUrl = CU_API + "event-report";
const webReportUrl = CU_API + "web-report";

export type getReportsRequestParams = {
  page?: number;
  limit?: number;
};

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
const getAllEventReports = async (params: getReportsRequestParams) => {
  try {
    const webReports = await client.get(`${eventReportUrl}`, { ...params });
    return webReports.data;
  } catch (err) {
    throw new Error("Error fetching web reports");
  }
};
const getAllWebReports = async (params: getReportsRequestParams) => {
  try {
    const webReports = await client.get(`${webReportUrl}`, { ...params });
    return webReports.data;
  } catch (err) {
    throw new Error("Error fetching web reports");
  }
};
const updateWebReportStatus = async (webReportId: string, params: any) => {
  try {
    const webReports = await client.patch(
      `${webReportUrl}/${webReportId}/updateAdmin`,
      params
    );
    return webReports.data;
  } catch (err) {
    throw new Error("Error fetching web reports");
  }
};

const updateEventReportStatus = async (eventReportId: string, params: any) => {
  try {
    const webReports = await client.patch(
      `${eventReportUrl}/${eventReportId}/updateAdmin`,
      params
    );
    return webReports.data;
  } catch (err) {
    throw new Error("Error fetching web reports");
  }
};

const report = {
  createEventReport,
  createWebReport,
  getMyEventReports,
  getMyWebReports,
  getAllEventReports,
  getAllWebReports,
  updateWebReportStatus,
  updateEventReportStatus,
};

export default report;
