"use client";

import { BaseNavbar } from "@/components/base-navbar";
import { BaseNavbarMobile } from "@/components/base-navbar-mobile";
import { NewUserMenu } from "@/components/auth/new-user-menu";
import { UserButton } from "@/components/auth/user-button";
import { UserButtonMobile } from "@/components/auth/user-button-mobile";
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
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import { LanguagesSelect } from "@/components/languages-select";

export const Header = () => {
  const session = useCurrentUser();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="container hidden mx-auto lg:flex flex-row gap-3 items-center justify-between w-full py-6 lg:[background:url(/icons/bg/head-lg-bg.svg)_132px_top_no-repeat]">
        <BaseNavbar />
        <div className="flex gap-8 items-center">
          {!session ? <NewUserMenu /> : <UserButton />}
          <LanguagesSelect />
        </div>
      </div>

      <div className="container mx-auto flex flex-row items-center justify-between p-4 lg:hidden sm:[background:url(/icons/bg/head-md-bg.svg)_115px_top_no-repeat]">
        <LanguagesSelect />
        <div className="text-mblack text-xl leading-6 font-normal">
          InviTeam
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-start items-start p-9 mt-6">
              <BaseNavbarMobile onClick={setOpen} />
              {!session ? (
                <NewUserMenu />
              ) : (
                <UserButtonMobile onClick={setOpen} />
              )}
            </div>
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
