import axios, { AxiosError } from "axios";
import { CU_API } from "@/config";
import { Dayjs } from "dayjs"

const getEventByNameURL = CU_API + 'event/' // + eventName
const updateEventDetailURL = CU_API + 'event/' 
const updateEventDescriptionURL = CU_API + 'event/'
const cancelEventURL = CU_API + 'event/'

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
    startDate: Dayjs,
    endDate: Dayjs,
    startTime: Dayjs,
    endTime: Dayjs,
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