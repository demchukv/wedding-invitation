import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import css from "@/components/ui/button.module.css";
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
        primary: "",
        oneTest: cn(
          "text-lg font-semibold leading-6 text-mblack",
          "cursor-pointer py-3 px-6 rounded-[5px] rounded-tl-[2px]",
          "bg-[linear-gradient(96.61deg,_#ffe1be_0%,_#ffa391_100%)]",
          "shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.75)]",
          "border-mbrown border-t-0 border-l-0 border-r-4 border-b-4 border-solid",
          "hover:[box-shadow:inset_0_0_0_0.5px_#2D0C03,0px_4px_8px_0px_#61110640]",
          "active:[box-shadow:inset_0_0_0_0.5px_#2D0C03,0px_4px_8px_0px_#61110640] active:text-mlightgreybg",
          "focus:[box-shadow:inset_0_0_0_0.5px_#2D0C03,0px_4px_8px_0px_#61110640] focus:text-mlightgreybg",
          "disabled:[box-shadow:inset_0_0_0_0.5px_#848383]",
          "disabled:bg-[linear-gradient(96.61deg,_#EAE9E9_0%,_#EAE9E9_100%)]",
          "disabled:border-mgrey disabled:text-mgrey disabled:opacity-100",
          "transition-[box-shadow,border-color,background-color,transform] duration-250 ease-in-out"
        ),
        twoTest: cn(
          "text-lg font-semibold leading-6 text-mblack",
          "cursor-pointer py-3 px-6 rounded-[5px] rounded-tl-[2px]",
          "bg-[linear-gradient(90deg,_#ffffff_0%,_#ffffff_100%)]",
          "shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.75)]",
          "border-t-0 border-l-0 border-r-4 border-b-4 border-solid",

          "[border-image:linear-gradient(90deg,_rgb(238,111,87),_rgb(129,61,37))_1]",
          // "[border-image:linear-gradient(45deg,_rgb(0,143,104),_rgb(250,224,66))_1]",

          "hover:border-mgrey hover:bg-[linear-gradient(90deg,_#EE6F57_0%,_#813D25_100%)] hover:text-white",

          "active:border-mgrey active:[box-shadow:inset_0_0_0_0.5px_#2D0C03,0px_4px_8px_0px_#61110640] hover:bg-[linear-gradient(90deg,_#EE6F57_0%,_#813D25_100%)] hover:text-white",
          "focus:border-mgrey focus:[box-shadow:inset_0_0_0_0.5px_#2D0C03,0px_4px_8px_0px_#61110640] hover:bg-[linear-gradient(90deg,_#EE6F57_0%,_#813D25_100%)] hover:text-white",
          "disabled:[box-shadow:inset_0_0_0_0.5px_#848383]",
          "disabled:bg-[linear-gradient(90deg,_#ffffff_0%,_#ffffff_100%)]",
          "disabled:border-mgrey disabled:text-mgrey disabled:opacity-100",
          "transition-[box-shadow,border-color,background-color,transform] duration-250 ease-in-out"
        ),
        empty: "",
        one: cn(css.btnOne, "disabled:opacity-100"),
        two: cn(css.btnTwo, "disabled:opacity-100"),
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
