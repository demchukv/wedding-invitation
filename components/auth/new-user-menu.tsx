"use client";

import Link from "next/link";
import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export const NewUserMenu = () => {
  return (
    <div className="flex flex-col md:flex-row gap-3 flex-shrink-0">
      <LoginButton mode="modal" asChild>
        <Button variant="one" size="auto">
          Sign in
        </Button>
      </LoginButton>
      <Button variant="two" size="auto" asChild>
        <Link href="/auth/register">Sign up</Link>
      </Button>
    </div>
  );
};
