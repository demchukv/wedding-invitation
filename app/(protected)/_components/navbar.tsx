"use client";

// import { usePathname } from "next/navigation";

import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  // const pathname = usePathname();
  return (
    <nav>
      <UserButton />
    </nav>
  );
};
