import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + "admin";

const approveOrganizer = async (id: string) => {
  try {
    const res = await client.post(`${baseUrl}/approve-organizer/${id}`);
    return res.data;
  } catch (e) {
    throw new Error("Error approving organizer");
  }
};

const rejectOrganizer = async (id: string) => {
  try {
    const res = await client.post(`${baseUrl}/reject-organizer/${id}`);
    return res.data;
  } catch (e) {
    throw new Error("Error rejecting organizer");
  }
};

const admin = {
  approveOrganizer,
  rejectOrganizer,
};

export default admin;
