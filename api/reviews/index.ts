import { CU_API } from "@/config";
import client from "@/utils/client";
import { Event } from "@/types";
import { Review } from "@/types";

const reviewUrl = CU_API + "reviews/event/";

const getReviewsByEventID = async (id: String) => {
    try {
        const reviews = await client.get(`${reviewUrl}${id}`);
        return reviews.data;
    } catch(err) {
        throw new Error("Error fetching event's reviews")
    }
}

const getReviewDetailByReviewId = async (id: String) => {
    try {
        const review = await client.get(`${reviewUrl}${id}`);
        return review.data;
    } catch(err) {
        throw new Error("Error get event's review detail")
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


const reviews = {
    getReviewsByEventID,
    getReviewDetailByReviewId,
    submitReview,
}

export default reviews;