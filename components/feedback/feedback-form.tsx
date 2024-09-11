"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";

import { addFeedback } from "@/actions/feedback/add-feedback";
import { FeedbackSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { PageTitle } from "@/components/page-title";

interface Props {
  title?: boolean;
}

const FeedbackForm = ({ title = true }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      message: "",
    },
  });
  const { isValid, isDirty } = form.formState;

  const onSubmit = (values: z.infer<typeof FeedbackSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addFeedback(values)
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
    <>
      {title && <PageTitle>Send feedback</PageTitle>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Olivia Smith"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                {/* <FormDescription>Your name will not be shared.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="email"
                    placeholder="olivia@mail.com"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  Your email will not be shared.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Phone"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                {/* <FormDescription>
                  Your phone will not be shared.
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
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Message" {...field} />
                </FormControl>
                {/* <FormDescription>
                  Your message will not be shared.
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
            {isPending ? (
              <BeatLoader className="text-mbrown" />
            ) : (
              "Send feedback"
            )}
          </Button>
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </>
  );
};

export default FeedbackForm;
