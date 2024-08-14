"use client";

import { getAllReviews } from "@/data/review";
import { ReviewType } from "@/types/review";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import CardWrapper from "../auth/card-wrapper";
import ReviewsListItem from "./reviews-list-item";
import { BeatLoader } from "react-spinners";

const ReviewsList = () => {
  const [reviews, setReviews] = useState<ReviewType[] | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchReviews = () => {
      startTransition(() => {
        const data = getAllReviews().then(data => {
          if ("error" in data) {
            toast.error(data.error);
          } else {
            setReviews(data);
          }
        });
      });
    };
    fetchReviews();
  }, []);

  return (
    <>
      <CardWrapper
        headerTitle="Reviews"
        headerLabel="Reviews list"
        backButtonHref=""
        backButtonLabel=""
      >
        {isPending && <BeatLoader color="black" />}
        {!isPending && reviews && (
          <ul className="flex flex-col gap-4 md:flex-row">
            {reviews?.map(review => (
              <li key={review.id}>
                <ReviewsListItem review={review} />
              </li>
            ))}
          </ul>
        )}
      </CardWrapper>
    </>
  );
};

export default ReviewsList;
