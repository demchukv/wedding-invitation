"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import Image from "next/image";
import icon from "@/public/icons/user.svg";
import iconArrowDown from "@/public/icons/arrow-down.svg";
import iconArrowUp from "@/public/icons/arrow-up.svg";
import { useState } from "react";

export const UserButton = () => {
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);

  const linkClass =
    "text-mblack hover:text-mbrown text-lg font-normal outline-none cursor-pointer focus:bg-transparent p-2";
  const menuItemClass = "focus:bg-transparent";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex gap-1 outline-none items-center">
        <Image
          priority
          src={user?.image ?? icon}
          alt="menu"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="block max-w-28 truncate text-nowrap text-ellipsis text-mblack font-normal text-lg">
          {user?.name}
        </span>
        {open ? (
          <Image
            priority
            src={iconArrowDown}
            alt="menu"
            width={24}
            height={24}
          />
        ) : (
          <Image priority src={iconArrowUp} alt="menu" width={24} height={24} />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="max-w-60 border-mbrown rounded-[2px] p-4"
        align="start"
      >
        <DropdownMenuItem className={menuItemClass}>
          <Link
            href="/invitations"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Invitations
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className={menuItemClass}
          onClick={() => setOpen(false)}
        >
          <Link href="/settings" className={linkClass}>
            Profile
          </Link>
        </DropdownMenuItem>

        {user?.role === UserRole.ADMIN && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={menuItemClass}
              onClick={() => setOpen(false)}
            >
              <Link href="/manage" className={linkClass}>
                Admin dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          className={menuItemClass}
          onClick={() => setOpen(false)}
        >
          <LogoutButton className={linkClass}>
            <ExitIcon className="mr-2 h-4 w-4" />
            Logout
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
