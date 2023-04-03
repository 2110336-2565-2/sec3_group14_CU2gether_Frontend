import client from "@/utils/client";
import { Event, Report } from "@/types";
import { create } from "zustand";
import report from "api/report";
import FormData from "form-data";
type EventReportStore = {
  eventReports: Report[];
  webReports: Report[];
  isCreateReportSuccess: boolean;
  createEventReport: (params: FormData, id: string) => Promise<void>;
  createWebReport: (params: FormData) => Promise<void>;
  fetchMyEventReports: () => Promise<void>;
  fetchMyWebReports: () => Promise<void>;
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
}));

export default useEventReportStore;
