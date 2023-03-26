import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + 'organizer/';

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
    const organizer = await client.patch(baseUrl+id, params);
    if(organizer.status !== 200) {
      throw new Error("Error update organizer with status code: " + organizer.status);
    }
  } catch (error) {
    console.log(error);
  }
}

const resetOrganizerPasswordById = async (organizerId: string, params: any) => {
  try {
    const organizer = await client.patch(baseUrl+'reset-password/'+organizerId);
    if(organizer.status !== 200) {
      throw new Error("Error reset organizer password with status code: " + organizer.status);
    }
  } catch (error) {
    console.log(error);
  }
}

const organizer = {
  getOrganizerById,
  updateOrganizerById,
  resetOrganizerPasswordById
}

export default organizer;
