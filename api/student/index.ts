import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + 'student/';

const getStudentById = async (studentId: string) => {
  try {
    const student = await client.get(baseUrl+studentId);
    if(student.status === 200) {
      return student.data;
    } else {
      throw new Error("Error fetching student with status code: " + student.status);
    }
  } catch (error) {
    console.log(error);
  }
}

const updateStudentById = async (studentId: string, params: any) => {
  try {
    const student = await client.patch(baseUrl+studentId, params);
    if(student.status !== 200) {
      throw new Error("Error update student with status code: " + student.status);
    }
  } catch (error) {
    console.log(error);
  }
}

const resetStudentPasswordById = async (studentId: string, params: any) => {
  try {
    const student = await client.patch(baseUrl+'reset-password/'+studentId);
    if(student.status !== 200) {
      throw new Error("Error reset student password with status code: " + student.status);
    }
  } catch (error) {
    console.log(error);
  }
}

const student = {
  getStudentById,
  updateStudentById,
  resetStudentPasswordById
}

export default student;
