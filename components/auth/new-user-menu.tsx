"use server";

// import { auth } from "@/auth";

import Link from "next/link";
import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
// import { useCurrentUser } from "@/hooks/use-current-user";

export const NewUserMenu = async () => {
  // const session = await auth();

  return (
    <div className="flex gap-4">
      <LoginButton mode="modal" asChild>
        <Button variant="one">Sign in</Button>
      </LoginButton>
      <Button variant="two" asChild>
        <Link href="/auth/register">Sign up</Link>
      </Button>
    </div>
  );
};
