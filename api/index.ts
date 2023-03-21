import axios, { AxiosError } from "axios";
import { CU_API } from "@/config";
import events from "./events";

export default {
  events,
}

const registerStudentURL = CU_API + "register/student";
const registerOrganizerURL = CU_API + "register/organizer";
const loginURL = CU_API + "login/login";
const loginStudentURL = CU_API + "login/student";

export const registerStudent = (
  studentId: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  image: String,
  cardId: String
) => {
  console.log("url", CU_API);
  axios
    .post(registerStudentURL, {
      studentId,
      email,
      password,
      firstName,
      lastName,
      image,
      cardId,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err: AxiosError) => console.log(err));
};

export const registerOrganizer = (
  email: String,
  name: String,
  coorName: String,
  phone: String,
  description: String
) => {
  axios
    .post(registerOrganizerURL, {
      email,
      name,
      coorName,
      phone,
      description,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err: AxiosError) => console.log(err));
};

export const login = (email: String, password: String) => {
  axios
    .post(loginStudentURL, {
      email,
      password,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err: AxiosError) => console.log(err));
};
