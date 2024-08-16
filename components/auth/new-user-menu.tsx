"use server";

import { auth } from "@/auth";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LoginButton from "@/components/auth/login-button";
// import { useCurrentUser } from "@/hooks/use-current-user";

export const NewUserMenu = async () => {
  const session = await auth();

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-x-6">
        <NavigationMenuItem
          className={cn(
            "text-primary bg-secondary hover:text-secondary hover:bg-primary transition-all px-3 py-2 radius-md rounded-lg"
          )}
        >
          {!session && (
            <LoginButton mode="modal" asChild>
              <NavigationMenuLink className="cursor-pointer">
                Sign in
              </NavigationMenuLink>
            </LoginButton>
          )}
          {/* <Link href="/auth/login" legacyBehavior passHref>
            <NavigationMenuLink>Sign in</NavigationMenuLink>
          </Link> */}
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(
            "text-primary bg-secondary hover:text-secondary hover:bg-primary transition-all px-3 py-2 radius-md rounded-lg"
          )}
        >
          <Link href="/auth/register" legacyBehavior passHref>
            <NavigationMenuLink>Sign up</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
