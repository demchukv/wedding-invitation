"use server";

import { auth } from "@/auth";
import { BaseNavbar } from "@/components/base-navbar";
import { BaseNavbarMobile } from "@/components/base-navbar-mobile";
import { NewUserMenu } from "@/components/auth/new-user-menu";
import { Navbar } from "@/app/(protected)/_components/navbar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import icon from "@/public/icons/menu.svg";
import Image from "next/image";

export const Header = async () => {
  const session = await auth();
  return (
    <header>
      <div className="container hidden mx-auto lg:flex flex-row items-center justify-between w-full py-4 lg:[background:url(/icons/bg/head-lg-bg.svg)_132px_top_no-repeat]">
        <BaseNavbar />
        {!session ? <NewUserMenu /> : <Navbar />}
        <div className="text-xl">Lang</div>
      </div>

      <div className="container mx-auto flex flex-row items-center justify-between p-4 lg:hidden sm:[background:url(/icons/bg/head-md-bg.svg)_115px_top_no-repeat]">
        <div className="text-xl">Lang</div>
        <div className="text-mblack text-xl leading-6 font-normal">
          InviTeam
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-transparent"
              size="auto"
              title="Open menu"
            >
              <Image priority src={icon} alt="menu" width={24} height={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="h-full">
            <SheetHeader className="hidden">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <BaseNavbarMobile />
            <SheetFooter className="hidden">
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
