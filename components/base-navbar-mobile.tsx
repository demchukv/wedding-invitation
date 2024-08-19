"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface BaseNavbarMobileProps {
  onClick: (open: boolean) => void;
}
export const BaseNavbarMobile = ({ onClick }: BaseNavbarMobileProps) => {
  const pathname = usePathname();

  const linkClass =
    "text-mblack hover:text-mbrown font-normal text-lg active:text-mbrown focus:text-mbrown transition-all px-3 py-2";
  const activeLinkClass = "text-mbrown";
  return (
    <>
      <NavigationMenu className="max-w-full items-start justify-start">
        <NavigationMenuList className="flex-col justify-start items-start gap-4">
          <NavigationMenuItem
            className={cn(linkClass, pathname === "/" && activeLinkClass)}
          >
            <NavigationMenuLink href="/" onClick={() => onClick(false)}>
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem
            className={cn(linkClass, pathname === "/about" && activeLinkClass)}
          >
            <NavigationMenuLink href="/about" onClick={() => onClick(false)}>
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem
            className={cn(
              linkClass,
              pathname === "/templates" && activeLinkClass
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
              linkClass,
              pathname === "/feedback" && activeLinkClass
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
