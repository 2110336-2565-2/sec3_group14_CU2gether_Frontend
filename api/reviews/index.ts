import { CU_API } from "@/config";
import client from "@/utils/client";
import { Event } from "@/types";
import { Review } from "@/types";

const reviewUrl = CU_API + "review/event/";

const getReviewsByEventID = async (id: String) => {
    try {
        const reviews = await client.get(`${reviewUrl}${id}`);
        if (reviews.status === 200) {
            return reviews.data;
        } else {
            throw new Error("Error fetching events with status code: " + reviews.status);
        }
    } catch(err) {
        console.log(err)
    }
}

const reviews = {
    getReviewsByEventID,
}

export default reviews;