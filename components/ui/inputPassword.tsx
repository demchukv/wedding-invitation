import * as React from "react";
import Image from "next/image";
import iconEyeOpen from "@/public/icons/eye-open.svg";
import iconEyeClose from "@/public/icons/eye-close.svg";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [inputType, setInputType] = React.useState("password");
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShow = () => {
      setInputType(prev => (prev === "password" ? "text" : "password"));
      setShowPassword(prev => !prev);
    };

    return (
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            "peer flex h-9 w-full border-[0.5px] rounded-sm border-mbrown bg-transparent px-4 pt-[12px] pb-[8px] text-sm placeholder:text-mgrey hover:shadow-md transition-shadow duration-300 ease-in-out focus:border-mbrown focus:border-[1px] focus:outline-none focus-visible:outline-none focus:shadow-md disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute fill-mdarkbrown right-4 top-1/2 transform -translate-y-1/2"
        >
          <Image
            priority
            src={showPassword ? iconEyeClose : iconEyeOpen}
            alt={showPassword ? "hide password" : "show password"}
            width={24}
            height={24}
          />
        </button>
      </div>
    );
  }
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
