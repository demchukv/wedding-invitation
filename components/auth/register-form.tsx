"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";

import { register } from "@/actions/register";

import { RegisterSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { PageTitle } from "../page-title";
import { Social } from "./social";
import Link from "next/link";
import { InputPassword } from "@/components/ui/inputPassword";

interface Props {
  title?: boolean;
}

export const RegisterForm = ({ title = true }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then(data => {
        setError(data.error);
        setSuccess(data.succes);
      });
    });
  };
  return (
    <>
      {title && <PageTitle>Sign Up</PageTitle>}
      <div className="w-full max-w-[288px] md:max-w-[664px] lg:max-w-[924px] md:flex md:justify-between md:items-baseline mx-auto">
        <div className="w-full md:w-[332px] lg:w-[528px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Olivia Smith"
                          type="text"
                        />
                      </FormControl>
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
                          {...field}
                          disabled={isPending}
                          placeholder="olivia@mail.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <InputPassword
                          {...field}
                          disabled={isPending}
                          placeholder="yT4!hj5U"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                type="submit"
                variant="one"
                disabled={isPending || !isValid || !isDirty}
                size="auto"
                className="w-full"
              >
                {isPending ? <BeatLoader className="text-mbrown" /> : "Sign up"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="w-full md:w-[332px] md:pl-6 mt-6 md:mt-0 flex flex-col items-center justify-center">
          <Social className="w-full mb-2"></Social>
          <div className="px-0 font-ubuntu text-mbrown text-base text-center">
            Already signed up? Please{" "}
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 mt-2 font-medium text-mbrown text-base"
            >
              <Link href="/auth/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
