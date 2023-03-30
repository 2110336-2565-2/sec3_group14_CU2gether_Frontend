import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + 'organizers/';

const getOrganizerById = async (id: string) => {
  try {
    const organizer = await client.get(baseUrl+id);
    if(organizer.status === 200) {
      return organizer.data;
    } else {
      throw new Error("Error fetching organizer with status code: " + organizer.status);
    }
  } catch (error) {
    console.log(error);
  }
}

const updateOrganizerById = async (id: string, params: any) => {
  try {
    await client.patch(baseUrl+id, params);
  } catch (error) {
    throw new Error("Error update organizer");
  }
}

const resetOrganizerPasswordById = async (organizerId: string, params: any) => {
  try {
    await client.patch(baseUrl+'reset-password/'+organizerId);
  } catch (error) {
    throw new Error("Error reset organizer password");
  }
}

const organizer = {
  getOrganizerById,
  updateOrganizerById,
  resetOrganizerPasswordById
}

export default organizer;
