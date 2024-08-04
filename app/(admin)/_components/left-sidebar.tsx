"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import { ModalButton } from "./modal-button";
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
import { Separator } from "@/components/ui/separator";

import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";

export function LeftSidebar() {
  const side = "left";
  const user = useCurrentUser();

  return (
    <div className="flex gap-28 p-2 bg-black text-cyan-50 w-full">
      <Sheet key={side}>
        <SheetTrigger asChild>
          <Button variant="ghost">Menu</Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Select a navigation option.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Link href="/manage">Dashboard</Link>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Link href="/manage/users">Users</Link>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Link href="/manage/feedbacks">Feedbacks</Link>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-4 items-center gap-4">
              <Link href="/">Home&nbsp;page</Link>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className="flex gap-10 justify-end items-center w-full p-2">
        <p className="flex gap-2 items-center">
          <FaUser /> {user?.name}
        </p>
        <p className="flex gap-2 items-center">
          <ExitIcon />
          <LogoutButton>LogOut</LogoutButton>
        </p>
      </div>
    </div>
  );
}
