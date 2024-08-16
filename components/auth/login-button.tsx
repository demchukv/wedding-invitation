"use client";

import { cinzel } from "@/styles/fonts";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
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

        <DialogContent className="p-[24px] pt-[72px] w-[320px] bg-background border border-mdarkbrown rounded-[2px] gap-[32px]">
          <DialogTitle
            className={cn(
              cinzel.className,
              "text-[28px] text-mblack font-bold text-center"
            )}
          >
            Welcom Back
          </DialogTitle>
          <LoginForm />
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
