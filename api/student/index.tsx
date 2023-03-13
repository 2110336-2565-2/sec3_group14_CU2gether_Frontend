import axios, { AxiosError } from "axios";
import { CU_API } from "@/utils/env";

const baseURL = CU_API + 'student/';

export const getStudents = async () => {
  try {
    const res = await axios.get(baseURL);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const getStudentById = async (studentId: string) => {
  try {
    const res = await axios.get(baseURL+studentId);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const updateStudentById = (
  studentId: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  image: String,
  cardId: String,
) => {
  axios
  .patch(baseURL+studentId, {
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
}

export const deleteStudentById = (studentId: String) => {
  try {
    axios.delete(baseURL+studentId)
  } catch (error) {
    console.log(error);
  }
}
