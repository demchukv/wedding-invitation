"use server";

import { ReviewType } from "@/types/review";

export const ReviewsListItem = ({ review }: { review: ReviewType }) => {
  console.log(review);
  return (
    <li className="flex flex-col items-start justify-start rounded-lg border gap-1 p-3 shadow-md text-mbrown">
      <p>Rating: {review.rating}</p>
      <p className="font-bold text-sm">{review.name}</p>
      <p>{review.message}</p>
    </li>
  );
};
