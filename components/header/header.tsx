"use server";

import { auth } from "@/auth";
import { BaseNavbar } from "@/components/base-navbar";
import { NewUserMenu } from "@/components/auth/new-user-menu";
import { Navbar } from "@/app/(protected)/_components/navbar";

export const Header = async () => {
  const session = await auth();
  return (
    <header>
      <div className="container mx-auto flex flex-row items-center justify-between w-full py-4 sm:[background:url(/icons/bg/head-md-bg.svg)_115px_top_no-repeat] lg:[background:url(/icons/bg/head-lg-bg.svg)_132px_top_no-repeat]">
        <BaseNavbar />
        {!session ? <NewUserMenu /> : <Navbar />}
      </div>
    </header>
  );
};
