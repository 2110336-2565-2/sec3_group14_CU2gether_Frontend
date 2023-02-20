import axios from "axios";
import { CU_API } from "@/utils/env";

const registerStudentURL = CU_API + 'register/student';
const registerOrganizerURL = CU_API + 'register/organizer';
const loginURL = CU_API + 'login/login';

export const registerStudent = (
    studentId: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    image: String,
    cardId: String,
) => {
    console.log(CU_API);
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
    .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
}

export const login = (
    email: String,
    password: String,
    isStudent: Boolean,
) => {
    axios.post(loginURL, {
        email,
        password,
        isStudent
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => console.log(err));
}