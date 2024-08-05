import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BaseNavbar = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem
          className={cn(
            "hover:text-white transition-all px-3 rounded-lg",
            pathname === "/" && "bg-white"
          )}
        >
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>Home</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(
            "hover:text-white transition-all px-3 radius-md rounded-lg",
            pathname === "/about" && "bg-white"
          )}
        >
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink>About</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(
            "hover:text-white transition-all px-3 radius-md rounded-lg",
            pathname === "/templates" && "bg-white"
          )}
        >
          <Link href="/templates" legacyBehavior passHref>
            <NavigationMenuLink>Templates</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(
            "hover:text-white transition-all px-3 radius-md rounded-lg",
            pathname === "/feedback" && "bg-white"
          )}
        >
          <Link href="/feedback" legacyBehavior passHref>
            <NavigationMenuLink>Feedback</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
