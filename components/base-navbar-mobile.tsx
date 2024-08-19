"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BaseNavbarMobileProps {
  onClick: (open: boolean) => void;
}
export const BaseNavbarMobile = ({ onClick }: BaseNavbarMobileProps) => {
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
            <NavigationMenuLink href="/" onClick={() => onClick(false)}>
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem
            className={cn(
              "text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-2 rounded-[2px]",
              pathname === "/about" && "border-mlightbrown bg-mlightbrown"
            )}
          >
            <NavigationMenuLink href="/about" onClick={() => onClick(false)}>
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem
            className={cn(
              "text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-2 rounded-[2px]",
              pathname === "/templates" && "border-mlightbrown bg-mlightbrown"
            )}
          >
            <NavigationMenuLink
              href="/templates"
              onClick={() => onClick(false)}
            >
              Templates
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem
            className={cn(
              "text-mblack font-normal text-xl border-transparent border-[2px] hover:border-mpink active:bg-mpink focus:bg-mpink transition-all px-3 py-2 rounded-[2px]",
              pathname === "/feedback" && "border-mlightbrown bg-mlightbrown"
            )}
          >
            <NavigationMenuLink href="/feedback" onClick={() => onClick(false)}>
              Contact Us
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
