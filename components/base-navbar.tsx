import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import Link from "next/link";

export const BaseNavbar = () => {
  const headersList = headers();
  const pathname = headersList.get("x-current-path");

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem
          className={cn(
            "text-primary bg-secondary hover:text-secondary hover:bg-primary  transition-all px-3 py-2 rounded-lg",
            pathname === "/" && "bg-primary text-secondary"
          )}
        >
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>Home</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(
            "text-primary bg-secondary hover:text-secondary hover:bg-primary transition-all px-3 py-2 radius-md rounded-lg",
            pathname === "/about" && "bg-primary text-secondary"
          )}
        >
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink>About</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(
            "text-primary bg-secondary hover:text-secondary hover:bg-primary transition-all px-3 py-2 radius-md rounded-lg",
            pathname === "/templates" && "bg-primary text-secondary"
          )}
        >
          <Link href="/templates" legacyBehavior passHref>
            <NavigationMenuLink>Templates</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(
            "text-primary bg-secondary hover:text-secondary hover:bg-primary transition-all px-3 py-2 radius-md rounded-lg",
            pathname === "/feedback" && "bg-primary text-secondary"
          )}
        >
          <Link href="/feedback" legacyBehavior passHref>
            <NavigationMenuLink>Contact Us</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
