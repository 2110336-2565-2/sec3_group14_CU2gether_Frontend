import axios, { AxiosError } from "axios";
import { CU_API } from "@/utils/env";
import { Radio } from "antd";
import dayjs from "dayjs"

const registerStudentURL = CU_API + 'register/student';
const registerOrganizerURL = CU_API + 'register/organizer';
const loginURL = CU_API + 'login/login';
const loginStudentURL = CU_API + 'login/student';
const getStudentByIdURL = CU_API + 'student/' // + studentId
const getEventByNameURL = CU_API + 'event/' // + eventName
const updateEventDetailURL = CU_API + 'event/' 
const updateEventDescriptionURL = CU_API + 'event/'
const cancelEventURL = CU_API + 'event/'

export const registerStudent = (
    studentId: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    image: String,
    cardId: String,
) => {
    console.log('url', CU_API);
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
    axios.post(loginStudentURL, {
        email,
        password
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err: AxiosError) => console.log(err));
}

export const getStudentById = async (studentId: String) => {
    const response = await axios.get(getStudentByIdURL+studentId);
    return response.data;
}

export const getEventByName = async (eventName: string) => {
    const response = await axios.get(getEventByNameURL+eventName);
    return response.data;
}

export const updateEventDetail = (
    eventName: String,
    eventType: String,
    visibility: String,
    tags: String,
    requireParticipantsMin: Number,
    requireParticipantsMax: Number,
    // startDate: dayjs,
    // endDate: dayjs,
    // startTime: dayjs,
    // endTime: dayjs,
    meetingType: String,
    location: String,
    website: String,
) => {
    axios
    .patch(updateEventDetailURL+eventName, {
        eventName,
        eventType,
        visibility,
        tags,
        requireParticipantsMin,
        requireParticipantsMax,
        // startDate,
        // endDate,
        // startTime,
        // endTime,
        meetingType,
        location,
        website,
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err: AxiosError) => console.log(err));
}

export const updateEventDescription = (
    eventName: String,
    description: String,
) => {
    axios
    .patch(updateEventDescriptionURL+eventName, {
        eventName,
        description,
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err: AxiosError) => console.log(err));
}

export const cancelEvent = (
    eventName: String,
) => {
    axios
    .delete(cancelEventURL+eventName, {
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err: AxiosError) => console.log(err));
}