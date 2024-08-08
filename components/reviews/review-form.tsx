"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ReviewSchema } from "@/schemas";
import { addReview } from "@/actions/review/add-review";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const ReviewForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      message: "",
      rating: 5,
    },
  });

  const onSubmit = (values: z.infer<typeof ReviewSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addReview(values)
        .then(data => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError("Something went wrong. Please try again later.");
        });
    });
  };

  return (
    <CardWrapper
      headerTitle="Send feedback"
      headerLabel=""
      backButtonLabel=""
      backButtonHref=""
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your review" {...field} />
                </FormControl>
                <FormDescription>
                  Your message will be publish after being checked by the admin.
                </FormDescription>
              </FormItem>
            )}
          />
          {/* rating */} TODO:
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? <BeatLoader size={8} color="white" /> : "Send"}
          </Button>
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ReviewForm;
