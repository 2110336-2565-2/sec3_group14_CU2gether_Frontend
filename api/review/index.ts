import { CU_API } from "@/config";
import client from "@/utils/client";
import { Event } from "@/types";
import { Review } from "@/types";

const reviewUrl = CU_API + "review/event/";

const getReviewByEventID = async (id: String) => {
    try {
        const event = await client.get(`${reviewUrl}${id}`);
        if (event.status === 200) {
            return event.data;
        } else {
            throw new Error("Error fetching events with status code: " + event.status);
        }
    } catch(err) {
        console.log(err)
    }
}

const submitReview = async (
    id: string,
    params: Review,
) => {
    try {
        await client.post(
            `${reviewUrl}${id}`,
            params,
        );
    } catch(err) {
        console.log(err)
    }
}

const review = {
    getReviewByEventID,
    submitReview,
}

export default review;