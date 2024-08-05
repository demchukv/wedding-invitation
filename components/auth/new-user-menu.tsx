import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NewUserMenu = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-x-6">
        <NavigationMenuItem
          className={cn(
            "hover:text-white transition-all px-3 radius-md rounded-lg",
            pathname === "/auth/login" && "bg-white"
          )}
        >
          <Link href="/auth/login" legacyBehavior passHref>
            <NavigationMenuLink>Login</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(
            "hover:text-white transition-all px-3 radius-md rounded-lg",
            pathname === "/auth/register" && "bg-white"
          )}
        >
          <Link href="/auth/register" legacyBehavior passHref>
            <NavigationMenuLink>Register</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
