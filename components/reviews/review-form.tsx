"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";
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
import { TextareaReview } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import StarRating from "@/components/rating/StarRating";
import Image from "next/image";
import star from "@/public/icons/star.svg";
import { cn } from "@/lib/utils";
import { cormorant, ubuntu } from "@/styles/fonts";

const ReviewForm = () => {
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      userId: user?.id || "",
      name: user?.name || "",
      message: "",
      rating: 5,
    },
  });
  const { isValid, isDirty } = form.formState;

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

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <>
      <p
        className={cn(
          ubuntu.className,
          "text-m-black text-lg font-normal leading-[23.4px] text-start"
        )}
      >
        Estimate your experience (from 1 to 5)
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full mb-[100px]"
        >
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <StarRating
                    totalStars={5}
                    size={32}
                    rating={field.value}
                    handleClick={field.onChange}
                  />
                </FormControl>
                {/* <FormDescription>
                  Your message will be publish after being checked by the admin.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Comment<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <TextareaReview
                    placeholder="Write your review here"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                {/* <FormDescription>
                  Your message will be publish after being checked by the admin.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="one"
            disabled={isPending || !isValid || !isDirty}
            size="auto"
            className="w-full"
          >
            {isPending ? <BeatLoader size={8} color="white" /> : "Publish"}
          </Button>
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </>
  );
};

export default ReviewForm;
