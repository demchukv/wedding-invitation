import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex resize-none h-24 w-full border-[0.5px] rounded-sm border-mbrown bg-transparent px-4 pt-[12px] pb-[8px] text-sm placeholder:text-mgrey hover:shadow-md transition-shadow duration-300 ease-in-out focus:border-mbrown focus:border-[1px] focus:outline-none focus-visible:outline-none focus:shadow-md disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };

const TextareaReview = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full border-[0.5px] rounded-sm border-mbrown bg-transparent px-4 pt-[12px] pb-[8px] text-sm placeholder:text-mgrey hover:shadow-md transition-shadow duration-300 ease-in-out focus:border-mbrown focus:border-[1px] focus:outline-none focus-visible:outline-none focus:shadow-md disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

TextareaReview.displayName = "TextareaReview";

export { TextareaReview };
