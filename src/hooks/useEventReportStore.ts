import client from "@/utils/client";
import { Event, Report } from "@/types";
import { create } from "zustand";
import report from "api/report";
import FormData from "form-data";
type EventReportStore = {
  eventReports: Report[];
  webReports: Report[];
  isCreateReportSuccess: boolean;
  createEventReport: (params: FormData, id: string) => void;
  createWebReport: (params: FormData) => void;
  fetchMyEventReports: () => void;
  fetchMyWebReports: () => void;
};

const useEventReportStore = create<EventReportStore>((set) => ({
  isCreateReportSuccess: false,
  eventReports: [],
  webReports: [],

  createEventReport: (params: FormData, id: string) => {
    report
      .createEventReport(params, id)
      .then((isSuccess: boolean) => set({ isCreateReportSuccess: isSuccess }));
  },
  createWebReport: (params: FormData) => {
    report.createWebReport(params);
  },
  fetchMyEventReports: () => {
    report.getMyEventReports().then((res: any) => set({ eventReports: res }));
  },
  fetchMyWebReports: () => {
    report.getMyWebReports().then((res: any) => set({ webReports: res }));
  },
}));

export default useEventReportStore;
