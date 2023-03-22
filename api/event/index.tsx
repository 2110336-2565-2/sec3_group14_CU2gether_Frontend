import axios, { AxiosError } from "axios";
import { CU_API } from "@/config";
import { Dayjs } from "dayjs"
import client from "@/utils/client";

const eventUrl = CU_API + "events/" // + id

export const getEventByID = async (id: String) => {
    const response = await axios.get(eventUrl+id);
    return response.data;
}

// const getEventByID = async (id: String) => {
//     try {
//         const event = await client.get(eventUrl);
//         if (event.status === 200) {
//             return event.data;
//         } else {
//             throw new Error("Error fetching events with status code: " + event.status);
//         }
//     } catch(err) {
//         console.log(err)
//     }
// }

export const updateEventDetail = (
    id: String,
    eventName: String,
    eventType: String,
    visibility: String,
    tags: String,
    requireParticipantsMin: Number,
    requireParticipantsMax: Number,
    startDate: Dayjs,
    endDate: Dayjs,
    startTime: Dayjs,
    endTime: Dayjs,
    meetingType: String,
    location: String,
    website: String,
) => {
    axios
    .patch(eventUrl+id, {
        id,
        eventName,
        eventType,
        visibility,
        tags,
        requireParticipantsMin,
        requireParticipantsMax,
        startDate,
        endDate,
        startTime,
        endTime,
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
    id: String,
    description: String,
) => {
    axios
    .patch(eventUrl+id, {
        id,
        description,
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err: AxiosError) => console.log(err));
}

export const updateEventImage = (
    id: String,
    picture: String,
) => {
    axios
    .patch(eventUrl+id, {
        id,
        picture,
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err: AxiosError) => console.log(err));
}

export const cancelEvent = (
    id: String,
) => {
    axios
    .delete(eventUrl+id, {
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err: AxiosError) => console.log(err));
}

const event = {
    getEventByID,
    updateEventDetail,
    updateEventDescription,
    cancelEvent,
}

export default event;