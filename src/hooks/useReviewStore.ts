import { Review } from "@/types";
import { create } from "zustand";
import reviews from "api/reviews";

export type ReviewDetail = {
  score: number,
  comment: string,
  authorName: string,
  createdAt: string,
}

type ReviewStore = {  
  reviewDetail?: ReviewDetail; 
  reviewList: ReviewDetail[];
  review?: Review;
  getReviewDetail: (reviewId: string) => void;
  getReviews: (eventId: string) => void;
  submitReview: (eventId: string, params: Review) => void;
};

const useReviewStore = create<ReviewStore>((set) => ({
  reviewList: [],
  getReviewDetail: (reviewId: string) => {
    reviews.getReviewDetailByReviewId(reviewId)
    .then((res: any) => set({reviewDetail: res}));
  },
  getReviews: (eventId: string) => {
    reviews.getReviewsByEventID(eventId)
    .then((res: any) => set({reviewList: res}));
  },
  submitReview: (eventId: string, params: Review) => {
    reviews.submitReview(eventId, params)
    .then((res: any) => set({review: res}));
  },
}));

export default useReviewStore;
