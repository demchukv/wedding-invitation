"use client";

import { usePathname } from "next/navigation";

import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-between items-center p-1 rounded-xl w-min shadow-md">
      <UserButton />
    </nav>
  );
};
