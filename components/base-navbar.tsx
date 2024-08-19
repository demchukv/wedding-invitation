"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { cormorant } from "@/styles/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BaseNavbar = () => {
  const pathname = usePathname();

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="items-center flex-row gap-3">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                className={cn(
                  cormorant.className,
                  "no-underline outline-none text-mblack pr-16 text-[24px] leading-8 font-normal"
                )}
                href="/"
              >
                InviTEAM
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className={cn(
                  "text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-2 rounded-[2px]",
                  pathname === "/" && "border-mlightbrown bg-mlightbrown"
                )}
              >
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/about"
                className={cn(
                  "text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-2 rounded-[2px]",
                  pathname === "/about" && "border-mlightbrown bg-mlightbrown"
                )}
              >
                About
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/templates"
                className={cn(
                  "text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-2 rounded-[2px]",
                  pathname === "/templates" &&
                    "border-mlightbrown bg-mlightbrown"
                )}
              >
                Templates
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/feedback"
                className={cn(
                  "text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-2 rounded-[2px]",
                  pathname === "/feedback" &&
                    "border-mlightbrown bg-mlightbrown"
                )}
              >
                Contact Us
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
