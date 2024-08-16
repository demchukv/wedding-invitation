"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import { Social } from "@/components/auth/social";

import { login } from "@/actions/login";

import { LoginSchema } from "@/schemas";
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
import { useSession } from "next-auth/react";

export const LoginForm = () => {
  const { update } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");
  const urlError =
    searchParams?.get("error") === "OAuthAccountNotLinked"
      ? "Email alredy in use with different provider!"
      : "";
  const [showTowFactor, setShowTowFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });
  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values, callbackUrl)
        .then(data => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            update();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTowFactor(true);
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTowFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTowFactor && (
              <>
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
                          placeholder="john.doe@me.com"
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
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            variant="primary"
            disabled={isPending || !isValid || !isDirty}
            className="w-full cursor-pointer rounded-[2px] text-mblack font-semibold px-6 py-2.5 text-center transition-background 
            [border-width: 0px, 4px, 4px, 0px]
            [border-image-source: linear-gradient(96.61deg, #FFE1BE 0%, #FFA391 100%)]
            hover:bg-gradient-to-br from-btnbgstart to-btnbgend"
          >
            {isPending ? (
              <BeatLoader className="text-mblack" />
            ) : showTowFactor ? (
              "Confirm"
            ) : (
              "Login"
            )}
          </Button>

          <div className="rounded-sm flex gap-2.5 justify-center items-center self-stretch relative w-full bg-[#fffefd]">
            <button className="rounded-sm border-[0.5px] border-[#2d0c03] px-6 py-2.5 flex gap-2.5 justify-center items-center flex-1 relative w-full bg-transparent">
              <span className="font-semibold leading-[21px] text-base text-[#2d0c03]">
                Sign in
              </span>
            </button>
          </div>
        </form>
      </Form>
      <Social />
    </>
  );
};
