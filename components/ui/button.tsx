import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary:
          "p-0 cursor-pointer rounded-[6px] border-[none] bg-[linear-gradient(96.61deg,_#ffe1be_0%,_#ffa391_100%)] pt-[0] pr-[4px] pb-[4px] pl-[0] hover:bg-[#784533] active:bg-[#784533] active:[box-shadow:0px_4px_8px_0px_#61110640] bg-[#848383] *:flex items-center justify-center gap-[10px] px-[24px] py-[10px] bg-[#fffefd] border-[0.5px] border-[solid] border-[#2d0c03] rounded-[2px] text-[18px] font-semibold leading-[23.4px] text-[#2d0c03] bg-[#fffefd] [transition:all_250ms_cubic-bezier(0.32,_0.72,_0,_1)] hover:*:bg-[linear-gradient(96.61deg,_#ffe1be_0%,_#ffa391_100%)]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        auto: "w-auto h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
