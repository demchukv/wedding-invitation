import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BeatLoader } from "react-spinners";
import { useTransition, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { UpdateReviewSchema } from "@/schemas";
import { ReviewType } from "@/types/review";
import { updateReview } from "@/actions/review/update-review";
import StarRating from "../../../../components/rating/StarRating";

export const EditReviewForm = ({ review }: { review: ReviewType }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof UpdateReviewSchema>>({
    resolver: zodResolver(UpdateReviewSchema),
    defaultValues: {
      id: review.id || undefined,
      message: review?.message || undefined,
      rating: review?.rating || 0,
      state: review?.state || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateReviewSchema>) => {
    startTransition(() => {
      updateReview(values)
        .then(data => {
          if (data?.error) {
            setError(data.error);
            setSuccess(undefined);
          }
          if (data?.success) {
            setSuccess(data.success);
            setError(undefined);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  const inputTextColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "text-green-600";
      case "DECLINED":
        return "text-red-600";
      default:
        return "text-black";
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Message"}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Status:"}</FormLabel>
                  <FormControl>
                    <select
                      id="status"
                      {...field}
                      className={`mx-5 px-2 py-1 rounded-md border-2 border-black ${inputTextColor(field.value)}`}
                    >
                      <option value="NEW" className="text-black">
                        NEW
                      </option>
                      <option value="APPROVED" className="text-green-600">
                        APPROVED
                      </option>
                      <option value="DECLINED" className="text-red-600">
                        DECLINED
                      </option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Rating:"}</FormLabel>
                  <FormControl>
                    <StarRating
                      totalStars={5}
                      size={32}
                      rating={field.value}
                      handleClick={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" disabled={isPending}>
            {isPending ? <BeatLoader /> : "Update"}
          </Button>
        </form>
      </Form>
    </>
  );
};
