"use server";

import { auth } from "@/auth";
import { BaseNavbar } from "@/components/base-navbar";
import { NewUserMenu } from "@/components/auth/new-user-menu";
import { Navbar } from "@/app/(protected)/_components/navbar";

export const Header = async () => {
  const session = await auth();
  return (
    <header className="py-4">
      <div className="container mx-auto flex flex-row items-center justify-between w-full">
        <BaseNavbar />
        {!session ? <NewUserMenu /> : <Navbar />}
      </div>
    </header>
  );
};
