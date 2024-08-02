import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export const NewUserMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-x-6">
        <NavigationMenuItem>
          <Link href="/auth/login" legacyBehavior passHref>
            <NavigationMenuLink>Login</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/auth/register" legacyBehavior passHref>
            <NavigationMenuLink>Register</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
