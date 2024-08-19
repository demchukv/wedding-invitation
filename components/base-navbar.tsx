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

  const linkClass =
    "block text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-3 rounded-[2px]";
  const currentLinkClass = "border-mlightbrown bg-mlightbrown";
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="items-center flex-row gap-0">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                className={cn(
                  cormorant.className,
                  "block p-3 no-underline outline-none text-mblack mr-12 text-[24px] leading-8 font-normal"
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
                className={cn(linkClass, pathname === "/" && currentLinkClass)}
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
                  linkClass,
                  pathname === "/about" && currentLinkClass
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
                  linkClass,
                  pathname === "/templates" && currentLinkClass
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
                  linkClass,
                  pathname === "/feedback" && currentLinkClass
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
