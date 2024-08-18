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

export const BaseNavbarMobile = () => {
  const pathname = usePathname();

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="flex-col items-start gap-4 py-10">
          <NavigationMenuItem
            className={cn(
              "text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-2 rounded-[2px]",
              pathname === "/" && "border-mlightbrown bg-mlightbrown"
            )}
          >
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem
            className={cn(
              "text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-2 rounded-[2px]",
              pathname === "/about" && "border-mlightbrown bg-mlightbrown"
            )}
          >
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink>About</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem
            className={cn(
              "text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-2 rounded-[2px]",
              pathname === "/templates" && "border-mlightbrown bg-mlightbrown"
            )}
          >
            <Link href="/templates" legacyBehavior passHref>
              <NavigationMenuLink>Templates</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem
            className={cn(
              "text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-2 rounded-[2px]",
              pathname === "/feedback" && "border-mlightbrown bg-mlightbrown"
            )}
          >
            <Link href="/feedback" legacyBehavior passHref>
              <NavigationMenuLink>Contact Us</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
