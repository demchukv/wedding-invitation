import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full border-[0.5px] rounded-sm border-mbrown bg-transparent px-4 pt-[12px] pb-[8px] text-sm placeholder:text-mgrey hover:shadow-md transition-shadow duration-300 ease-in-out focus:border-mbrown focus:border-[1px] focus:outline-none focus-visible:outline-none focus:shadow-md disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
