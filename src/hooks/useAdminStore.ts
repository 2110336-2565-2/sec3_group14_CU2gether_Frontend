import { OrganizerRequest, RequestStatus } from "@/types";
import { create } from "zustand";

type EventStore = {
  organizerRequests: OrganizerRequest[];
  fetchOrganizerRequests: () => void;
};

const useAdminStore = create<EventStore>((set) => ({
  organizerRequests: [],
  fetchOrganizerRequests: () => {
    // TODO: fetch api for this content
    const _organizerRequests = [
      {
        id: 1,
        email: "wang@wang.in.th",
        name: "Wang Data Market",
        coorName: "Chayakorn Vongbunsin",
        phone: "0617081377",
        description:
          "We are ... . We want to... . ;odiqwjdq[oij[dwqd;woqjdpoqwp[wqiohdpoqwdquwdpwqhuihdwqpuh puqwh pduwqh huiqwh dphqwp wpqh qhqhu ihqduhwqdhwq oiwqoh ioqhpoq powhqhqw phwqp hw qpohw qiphuiwqh uidwhqpdhqw hdqwhd kjqwhduwqhjk qeiyfgqy bfqnfbqlwif qwjb",
        status: RequestStatus.PENDING,
      },
      {
        id: 2,
        email: "wang@wang.in.th",
        name: "Wang Data Market",
        coorName: "Chayakorn Vongbunsin",
        phone: "0617081377",
        description:
          "We are ... . We want to... . ;odiqwjdq[oij[dwqd;woqjdpoqwp[wqiohdpoqwdquwdpwqhuihdwqpuh puqwh pduwqh huiqwh dphqwp wpqh qhqhu ihqduhwqdhwq oiwqoh ioqhpoq powhqhqw phwqp hw qpohw qiphuiwqh uidwhqpdhqw hdqwhd kjqwhduwqhjk qeiyfgqy bfqnfbqlwif qwjb",
        status: RequestStatus.PENDING,
      },
      {
        id: 3,
        email: "wang@wang.in.th",
        name: "Wang Data Market",
        coorName: "Chayakorn Vongbunsin",
        phone: "0617081377",
        description:
          "We are ... . We want to... . ;odiqwjdq[oij[dwqd;woqjdpoqwp[wqiohdpoqwdquwdpwqhuihdwqpuh puqwh pduwqh huiqwh dphqwp wpqh qhqhu ihqduhwqdhwq oiwqoh ioqhpoq powhqhqw phwqp hw qpohw qiphuiwqh uidwhqpdhqw hdqwhd kjqwhduwqhjk qeiyfgqy bfqnfbqlwif qwjb",
        status: RequestStatus.PENDING,
      },
    ];
    set({
      organizerRequests: _organizerRequests,
    });
  },
}));

export default useAdminStore;
