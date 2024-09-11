"use server";

import { getAllReviews } from "@/data/review";
import { ReviewType } from "@/types/review";
import { ReviewsListItem } from "@/components/reviews/reviews-list-item";

interface ReviewInput {
  take?: number | undefined;
}

export const ReviewsList = async ({ take }: ReviewInput) => {
  const reviews = (await getAllReviews(take)) as {
    success: boolean;
    data: ReviewType[];
  };

  if (!reviews.success) {
    return null;
  }

  const items = reviews.data.length;
  const mdItems = items < 4 ? items : 4;
  const lgItems = items < 6 ? items : 6;

  return (
    <>
      <div>
        <ul
          className={`w-full mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2  md:grid-cols-${mdItems}  lg:grid-cols-${lgItems}`}
        >
          {reviews.data.map(review => (
            <ReviewsListItem key={review.id} review={review} />
          ))}
        </ul>
      </div>
    </>
  );
};
