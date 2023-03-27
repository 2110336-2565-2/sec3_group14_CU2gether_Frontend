import { CU_API } from "@/config";
import client from "@/utils/client";
import { Event } from "@/types";
import { Review } from "@/types";

const reviewUrl = CU_API + "review/event/";

const getReviewDetailByReviewId = async (id: String) => {
    try {
        const review = await client.get(`${reviewUrl}${id}`);
        if (review.status === 200) {
            return review.data;
        } else {
            throw new Error("Error fetching events with status code: " + review.status);
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
    getReviewDetailByReviewId,
    submitReview,
}

export default review;