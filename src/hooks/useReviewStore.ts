import { Review } from "@/types";
import { create } from "zustand";
import review from "api/review";

type ReviewStore = {   
  review?: Review;
  getReview: (id: string) => void;
  submitReview: (id: string, params: Review) => void;
};

const useReviewStore = create<ReviewStore>((set) => ({
  getReview: (id: string) => {
    review.getReviewByEventID(id)
    .then((res: any) => set({review: res}));
  },
  submitReview: (id: string, params: Review) => {
    review.submitReview(id, params)
    .then((res: any) => set({review: res}));
  },
}));

export default useReviewStore;
