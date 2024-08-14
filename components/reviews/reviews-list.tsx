"use client";

import { getAllReviews } from "@/data/review";
import { ReviewType } from "@/types/review";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import CardWrapper from "../auth/card-wrapper";
import ReviewsListItem from "./reviews-list-item";

const ReviewsList = () => {
  const [reviews, setReviews] = useState<ReviewType[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getAllReviews();
      console.log(data);

      if ("error" in data) {
        setError(data.error);
        toast.error(data.error);
      } else {
        setReviews(data);
      }
    };
  }, []);

  return (
    <>
      <CardWrapper
        headerTitle="Reviews"
        headerLabel="Reviews list"
        backButtonHref=""
        backButtonLabel=""
      >
        <ul className="space-y-4">
          {reviews?.map(review => (
            <li key={review.id}>
              <ReviewsListItem review={review} />
            </li>
          ))}
        </ul>
      </CardWrapper>
    </>
  );
};

export default ReviewsList;
