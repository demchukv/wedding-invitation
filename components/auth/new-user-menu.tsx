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
            "text-primary bg-secondary hover:text-secondary hover:bg-primary transition-all px-3 py-2 radius-md rounded-lg",
            pathname === "/auth/login" && "bg-primary text-secondary"
          )}
        >
          <Link href="/auth/login" legacyBehavior passHref>
            <NavigationMenuLink>Login</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(
            "text-primary bg-secondary hover:text-secondary hover:bg-primary transition-all px-3 py-2 radius-md rounded-lg",
            pathname === "/auth/register" && "bg-primary text-secondary"
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
