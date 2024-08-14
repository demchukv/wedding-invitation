import { ReviewType } from "@/types/review";

const ReviewsListItem = ({ review }: { review: ReviewType }) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
      <p>Rating: {review.rating}</p>
      <p>{review.message}</p>
    </div>
  );
};

export default ReviewsListItem;
