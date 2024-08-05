"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  PanelLeft,
  Search,
  Home,
  Users,
  MessageCircleMore,
  Rows4,
  ShieldPlus,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";
import { usePathname } from "next/navigation";

export const Header = () => {
  const user = useCurrentUser();
  const pathname = usePathname();

  const breadcrumb = [];
  if (pathname === "/manage/users") {
    breadcrumb.push({
      name: "Users",
      href: "/manage/users",
    });
  }
  if (pathname === "/manage/invitations") {
    breadcrumb.push({
      name: "Invitations",
      href: "/manage/invitations",
    });
  }
  if (pathname === "/manage/feedbacks") {
    breadcrumb.push({
      name: "Feedbacks",
      href: "/manage/feedbacks",
    });
  }
  if (pathname === "/manage/reviews") {
    breadcrumb.push({
      name: "Reviews",
      href: "/manage/reviews",
    });
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/manage"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/manage/users"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <Users className="h-5 w-5" />
                Users
              </Link>
              <Link
                href="/manage/invitations"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <ShieldPlus className="h-5 w-5" />
                Invitations
              </Link>
              <Link
                href="/manage/feedbacks"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <MessageCircleMore className="h-5 w-5" />
                Feedbacks
              </Link>
              <Link
                href="/manage/refiews"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Rows4 className="h-5 w-5" />
                Reviews
              </Link>
              <Link
                href="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/manage">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumb.map((item, index) => (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                <AvatarFallback>{user?.name?.charAt(0) || ""}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton>Logout</LogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
};
