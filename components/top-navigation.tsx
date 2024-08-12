"use client";

import { BaseNavbar } from "@/components/base-navbar";
import { NewUserMenu } from "@/components/auth/new-user-menu";
import { Navbar } from "@/app/(protected)/_components/navbar";
import { useCurrentUser } from "@/hooks/use-current-user";

export const TopNavigation = () => {
  const session = useCurrentUser();

  return (
    <header className="flex flex-row items-center justify-around w-full py-4">
      <BaseNavbar />
      {!session ? <NewUserMenu /> : <Navbar />}
    </header>
  );
};
