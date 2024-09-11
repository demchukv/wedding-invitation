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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import StarRating from "@/components/rating/StarRating";
import Image from "next/image";
import star from "@/public/icons/star.svg";

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
      <p>Estimate your experience (from 1 to 5)</p>
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
                  <div className="flex flex-row">
                    <Image
                      priority
                      src={star}
                      alt={"star"}
                      width={16}
                      height={16}
                    />
                    <Image
                      priority
                      src={star}
                      alt={"star"}
                      width={16}
                      height={16}
                    />
                    <Image
                      priority
                      src={star}
                      alt={"star"}
                      width={16}
                      height={16}
                    />
                    <Image
                      priority
                      src={star}
                      alt={"star"}
                      width={16}
                      height={16}
                    />
                    <Image
                      priority
                      src={star}
                      alt={"star"}
                      width={16}
                      height={16}
                    />
                  </div>
                  {/* <RadioGroup
                    defaultValue={String(field.value)}
                    onValueChange={value => field.onChange(Number(value))}
                    className="flex flex-row space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="font-normal">1</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">2</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="3" />
                      </FormControl>
                      <FormLabel className="font-normal">3</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="4" />
                      </FormControl>
                      <FormLabel className="font-normal">4</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="5" />
                      </FormControl>
                      <FormLabel className="font-normal">5</FormLabel>
                    </FormItem>
                  </RadioGroup> */}
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
                <FormLabel>Comment*</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your review here" {...field} />
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
