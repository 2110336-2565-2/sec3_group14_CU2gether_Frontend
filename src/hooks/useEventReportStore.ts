import client from "@/utils/client";
import { Event, Report, ReportStatus } from "@/types";
import { create } from "zustand";
import report, { getReportsRequestParams } from "api/report";
import FormData from "form-data";
type EventReportStore = {
  eventReports: Report[];
  webReports: Report[];
  isCreateReportSuccess: boolean;
  createEventReport: (params: FormData, id: string) => Promise<void>;
  createWebReport: (params: FormData) => Promise<void>;
  fetchMyEventReports: () => Promise<void>;
  fetchMyWebReports: () => Promise<void>;
  fetchEventReports: (params: getReportsRequestParams) => Promise<void>;
  fetchWebReports: (params: getReportsRequestParams) => Promise<void>;
  updateEventReportStatus: (webReportId: string, params: any) => Promise<void>;
  updateWebReportStatus: (eventReportId: string, params: any) => Promise<void>;
};

const useEventReportStore = create<EventReportStore>((set) => ({
  isCreateReportSuccess: false,
  eventReports: [],
  webReports: [],

  createEventReport: async (params: FormData, id: string) => {
    await report.createEventReport(params, id);
  },
  createWebReport: async (params: FormData) => {
    await report.createWebReport(params);
  },
  fetchMyEventReports: async () => {
    const res = await report.getMyEventReports();
    set({ eventReports: res });
  },
  fetchMyWebReports: async () => {
    const res = await report.getMyWebReports();
    set({ webReports: res });
  },
  fetchEventReports: async (params: getReportsRequestParams) => {
    const res = await report.getAllUnFinishEventReports(params);
    set({ eventReports: res });
  },
  fetchWebReports: async (params: getReportsRequestParams) => {
    const res = await report.getAllUnFinishWebReports(params);
    set({ webReports: res });
  },
  updateEventReportStatus: async (webReportId: string, params: any) => {
    const res = await report.updateEventReportStatus(webReportId, params);
  },

  updateWebReportStatus: async (eventReportId: string, params: any) => {
    const res = await report.updateWebReportStatus(eventReportId, params);
  },
}));

export default useEventReportStore;
