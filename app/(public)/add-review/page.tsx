import { PageTitle } from "@/components/page-title";
import ReviewForm from "@/components/reviews/review-form";
import { ReviewsList } from "@/components/reviews/reviews-list";
import { cn } from "@/lib/utils";
import { cormorant, ubuntu } from "@/styles/fonts";

const ReviewsPage = () => {
  return (
    <>
      <PageTitle>Reviews</PageTitle>
      <h3 className="text-mdarkbrown text-[32px] leading-[32px] text-start">
        Your review
      </h3>
      <p>
        You can share your experience of using our service with other users
        here, if you want.
      </p>
      <div>
        <ReviewForm />
      </div>
      <p
        className={cn(
          cormorant.className,
          "text-mdarkbrown text-[32px] font-bold leading-[32px] text-start"
        )}
      >
        Reviews of other users
      </p>
      <ReviewsList />
    </>
  );
};

export default ReviewsPage;
