import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + "admin";
const authUrl = CU_API + "auth/admin";

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

const login = async (email:string, password:string) => {
  try {
    const res = await client.post(`${authUrl}/login`,{email, password});
    return res.data;
  } catch (e) {
    throw new Error("Error logging in");
  }
}

const admin = {
  approveOrganizer,
  rejectOrganizer,
  getOrganizerRequests,
  login,
};

export default admin;
