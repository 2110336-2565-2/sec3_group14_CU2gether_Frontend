import { Dayjs } from "dayjs";

export type Event = {
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
    image: String,
}