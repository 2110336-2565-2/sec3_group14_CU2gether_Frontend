import client from "@/utils/client";
import { Event, EventReport } from "@/types";
import { create } from "zustand";
import report from "api/report";
import FormData from "form-data";
type EventReportStore = {
  event?: Event;
  isCreateReportSuccess: boolean;
  getEventDetail: (id: string) => void;
  createEventReport: (params: FormData) => void;
};

const useEventReportStore = create<EventReportStore>((set) => ({
  isCreateReportSuccess: false,
  getEventDetail: (id: string) => {
    report.getEventByID(id).then((res: any) => set({ event: res }));
  },

  createEventReport: (params: FormData) => {
    report
      .createReport(params)
      .then((isSuccess: boolean) => set({ isCreateReportSuccess: isSuccess }));
  },
}));

export default useEventReportStore;
