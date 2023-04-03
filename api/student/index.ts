import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + 'students/';

const getStudentById = async (id: string) => {
  try {
    const student = await client.get(baseUrl+id);
    return student.data;
  } catch (error) {
    throw new Error("Error fetching students");
  }
}

const updateStudentById = async (id: string, params: any) => {
  try {
    await client.patch(baseUrl+id, params);
  } catch (error) {
    throw new Error("Error update student");
  }
}

const resetStudentPasswordById = async (id: string, params: any) => {
  try {
    await client.patch(baseUrl+'reset-password/'+id, params);
  } catch (error) {
    throw new Error("Error reset student password");
  }
}

const student = {
  getStudentById,
  updateStudentById,
  resetStudentPasswordById
}

export default student;
