import { PageTitle } from "@/components/page-title";
import ReviewForm from "@/components/reviews/review-form";
import { ReviewsList } from "@/components/reviews/reviews-list";
import { cn } from "@/lib/utils";
import { cormorant, ubuntu } from "@/styles/fonts";

const ReviewsPage = () => {
  return (
    <div className="w-full self-start">
      <PageTitle>Reviews</PageTitle>
      <h2
        className={cn(
          cormorant.className,
          "text-m-black text-[32px] font-bold leading-[32px] text-start mb-[32px]"
        )}
      >
        Your review
      </h2>
      <p
        className={cn(
          ubuntu.className,
          "text-m-black text-lg leading-[23.4px] text-start mb-[24px]"
        )}
      >
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
    </div>
  );
};

export default ReviewsPage;
