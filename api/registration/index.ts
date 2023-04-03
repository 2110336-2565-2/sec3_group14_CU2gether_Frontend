import axios, { AxiosError } from "axios";
import { CU_API } from "@/config";
import client from "@/utils/client";

const registerStudentURL = CU_API + "register/student";
const registerOrganizerURL = CU_API + "register/organizer";

export type registerStudentParams = {
  studentId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image?: string;
  cardId?: string;
};

export type registerOrganizerParams = {
  email: string;
  name: string;
  coorName: string;
  phone: string;
  description?: string;
};

const registerStudent = async (params: registerStudentParams) => {
  try {
    const createdStudent = await client.post(registerStudentURL, { ...params });
    console.log(`student ${createdStudent} created`);
  } catch (err) {
    console.log(err);
    throw new Error("Error: failed registering student");
  }
};

const registerOrganizer = async (params: registerOrganizerParams) => {
  try {
    const createdOrganizer = await client.post(registerOrganizerURL, {
      ...params,
    });
    console.log(`organizer ${createdOrganizer} created`);
  } catch (err) {
    console.log(err);
    throw new Error("Error: failed registering organizer");
  }
};

const registration = { registerStudent, registerOrganizer };

export default registration;
