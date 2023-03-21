import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + "events";

const getEvents = async (page = 1, limit = -1) => {
    try{
        const events = await client.get(baseUrl, { page, limit });
        if(events.status === 200) {
            return events.data;
        } else {
            throw new Error("Error fetching events with status code: " + events.status);
        }
    } catch(err) {
        console.log(err);
    }
};

const events = {
    getEvents
}

export default events;
