"use client";

import { usePathname } from "next/navigation";

import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-between items-center p-0 rounded-full w-min h-min shadow-md">
      <UserButton />
    </nav>
  );
};
