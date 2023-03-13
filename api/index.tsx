import axios, { AxiosError } from "axios";
import { CU_API } from "@/utils/env";

const registerStudentURL = CU_API + 'register/student';
const registerOrganizerURL = CU_API + 'register/organizer';
const loginURL = CU_API + 'auth/login';

export const registerStudent = (
    studentId: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    image: String,
    cardId: String,
) => {
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
}

export const registerOrganizer = (
    email: String,
    name: String,
    coorName: String,
    phone: String,
    description: String,
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
}

export const login = (
    email: String,
    password: String,
) => {
    axios.post(loginURL, {
        email,
        password
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err: AxiosError) => console.log(err));
}