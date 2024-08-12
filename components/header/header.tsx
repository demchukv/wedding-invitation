"use client";

import { BaseNavbar } from "@/components/base-navbar";
import { NewUserMenu } from "@/components/auth/new-user-menu";
import { Navbar } from "@/app/(protected)/_components/navbar";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Header = () => {
  const session = useCurrentUser();

  return (
    <header className="py-4">
      <div className="container mx-auto flex flex-row items-center justify-between w-full sm:container md:container lg:container">
        <BaseNavbar />
        {!session ? <NewUserMenu /> : <Navbar />}
      </div>
    </header>
  );
};
