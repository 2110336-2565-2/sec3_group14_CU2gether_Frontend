import client from "@/utils/client";
import { Event, Report } from "@/types";
import { create } from "zustand";
import report from "api/report";
import FormData from "form-data";
type EventReportStore = {
  event?: Event;
  eventReports: Report[];
  webReports: Report[];
  isCreateReportSuccess: boolean;
  getEventDetail: (id: string) => void;
  createEventReport: (params: FormData) => void;
  fetchMyEventReports: () => void;
  fetchMyWebReports: () => void;
};

const useEventReportStore = create<EventReportStore>((set) => ({
  isCreateReportSuccess: false,
  eventReports: [],
  webReports: [],
  getEventDetail: (id: string) => {
    report.getEventByID(id).then((res: any) => set({ event: res }));
  },

  createEventReport: (params: FormData) => {
    report
      .createEventReport(params)
      .then((isSuccess: boolean) => set({ isCreateReportSuccess: isSuccess }));
  },
  fetchMyEventReports: () => {
    report.getMyEventReports().then((res: any) => set({ eventReports: res }));
  },
  fetchMyWebReports: () => {
    report.getMyWebReports().then((res: any) => set({ webReports: res }));
  },
}));

export default useEventReportStore;
