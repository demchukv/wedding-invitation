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
import { useForm } from "react-hook-form";
import { UpdateReviewSchema, UpdateUserSchema } from "@/schemas";
import { ReviewType } from "@/types/review";
import { updateReview } from "@/actions/review/update-review";

export const EditReviewForm = ({ review }: { review: ReviewType }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof UpdateReviewSchema>>({
    resolver: zodResolver(UpdateReviewSchema),
    defaultValues: {
      id: review.id || undefined,
      message: review?.message || undefined,
      rating: review?.rating || undefined
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateReviewSchema>) => {
    startTransition(() => {
      updateReview(values).then(data => {
        if (data?.error) {
          setError(data.error)
          setSuccess(undefined)
        }
        if (data?.success) {
          setSuccess(data.success)
          setError(undefined)
        }
      }).catch(() => {
        setError("Something went wrong!")
      })
    })
  }

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
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
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
