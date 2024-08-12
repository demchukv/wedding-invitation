import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BeatLoader } from "react-spinners";
import { useTransition, useState, useEffect } from "react";
import { FormError } from "@/components/form-error";
import { EditReviewForm } from "./edit-review-form";
import { ReviewType } from "@/types/review";
import { getReviewById } from "@/data/review";

interface EditReviewFormProps {
  id: string;
}
export const EditReviewModal = ({ id }: EditReviewFormProps) => {
  const [review, setReview] = useState<ReviewType | null>();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const getReviewData = async (id: string) => {
    startTransition(() => {
      getReviewById(id).then(res => {
        if (res) {
          setReview(res);
        } else {
          setError("Something went wrong! Try again later.");
        }
      });
    });
  };
  
  useEffect(() => {
    getReviewData(id);
  }, [id]);
  console.log(getReviewById(id))
  
  return (
    <>
      <DialogContent className="max-w-min">
        <DialogHeader>
          <DialogTitle>{review?.name}</DialogTitle>
          <DialogDescription>Edit review information</DialogDescription>
        </DialogHeader>

        <div className="mt-2 min-w-[400px]">
          {isPending && <BeatLoader />}
          {!isPending && review && <EditReviewForm review={review} />}
          <FormError message={error} />
        </div>
      </DialogContent>
    </>
  );
};
