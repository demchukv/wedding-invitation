"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import Image from "next/image";
import icon from "@/public/icons/user.svg";

interface UserButtonMobileProps {
  onClick: (open: boolean) => void;
}
export const UserButtonMobile = ({ onClick }: UserButtonMobileProps) => {
  const user = useCurrentUser();

  const linkClass =
    "text-mblack hover:text-mbrown text-lg font-normal outline-none cursor-pointer focus:bg-transparent p-2";
  const menuItemClass = "focus:bg-transparent";

  return (
    <div className="flex flex-col justify-start items-start gap-4">
      <div className="flex gap-2 p-2">
        <Image
          priority
          src={user?.image ?? icon}
          alt="menu"
          width={24}
          height={24}
          className="rounded-full flex-shrink-1"
        />
        <span className="block max-w-36 truncate text-nowrap text-ellipsis text-mblack font-normal text-lg">
          {user?.name}
        </span>
      </div>

      <Link
        href="/invitations"
        className={linkClass}
        onClick={() => onClick(false)}
      >
        Invitations
      </Link>

      <Link
        href="/settings"
        className={linkClass}
        onClick={() => onClick(false)}
      >
        Profile
      </Link>

      {user?.role === UserRole.ADMIN && (
        <>
          <Link
            href="/manage"
            className={linkClass}
            onClick={() => onClick(false)}
          >
            Admin dashboard
          </Link>
        </>
      )}

      <LogoutButton className={linkClass}>
        <ExitIcon className="mr-2 h-4 w-4" />
        Logout
      </LogoutButton>
    </div>
  );
};
