import { CU_API } from "@/config";
import client from "@/utils/client";
import { Review } from "@/types";

const reviewUrl = CU_API + "reviews/event/";

const getReviewsByEventID = async (id: String) => {
  try {
    const reviews = await client.get(`${reviewUrl}${id}`);
    return reviews.data;
  } catch (err) {
    throw new Error("Error fetching event's reviews");
  }
};

const getReviewDetailByUserID = async (id: String) => {
  try {
    const review = await client.get(`${reviewUrl}${id}`);
    return review.data;
  } catch (err) {
    throw new Error("Error fetching event's review detail");
  }
};

const getReviewDetailByReviewId = async (id: String) => {
  try {
    const review = await client.get(`${reviewUrl}${id}`);
    return review.data;
  } catch (err) {
    throw new Error("Error fetching event's review detail");
  }
};

const submitReview = async (id: string, params: Review) => {
  try {
    const response = await client.post(`${reviewUrl}${id}`, params);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const reviews = {
  getReviewsByEventID,
  getReviewDetailByUserID,
  getReviewDetailByReviewId,
  submitReview,
};

export default reviews;
