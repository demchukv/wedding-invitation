"use client";

import { cormorant } from "@/styles/fonts";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({
  children,
  mode = "redirect",
  asChild = false,
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>

        <DialogContent className="p-[24px] pt-[72px] w-[300px] sm:w-[340px] md:w-[400px] bg-background border border-mdarkbrown rounded-[2px] gap-[32px]">
          <DialogTitle
            className={cn(
              cormorant.className,
              "text-[28px] text-mblack font-bold text-center"
            )}
          >
            Welcome Back
          </DialogTitle>
          <DialogDescription className="hidden">Welcome Back</DialogDescription>
          <LoginForm title={false} />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
