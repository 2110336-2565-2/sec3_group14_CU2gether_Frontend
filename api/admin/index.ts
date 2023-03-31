import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + "admin";

const approveOrganizer = async (id: string) => {
  try {
    const res = await client.patch(`${baseUrl}/approve-organizer/${id}`);
    return res.data;
  } catch (e) {
    throw new Error("Error approving organizer");
  }
};

const rejectOrganizer = async (id: string) => {
  try {
    const res = await client.patch(`${baseUrl}/reject-organizer/${id}`);
    return res.data;
  } catch (e) {
    throw new Error("Error rejecting organizer");
  }
};

const getOrganizerRequests = async () => {
  try {
    const res = await client.get(`${baseUrl}/pending-organizers`);
    return res.data;
  } catch (e) {
    throw new Error("Error getting organizer requests");
  }
};

const admin = {
  approveOrganizer,
  rejectOrganizer,
  getOrganizerRequests,
};

export default admin;
