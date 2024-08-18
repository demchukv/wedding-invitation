import { cn } from "@/lib/utils";
import { cormorant } from "@/styles/fonts";

interface PageTitleProps {
  children?: React.ReactNode;
  className?: string;
}
export const PageTitle = ({ children, className }: PageTitleProps) => {
  return (
    <h1
      className={cn(
        cormorant.className,
        "inline-block mx-auto text-mdarkbrown font-bold text-center",
        "px-[45px] text-[32px] leading-[32px] lg:px-[104px] lg:text-[56px] lg:leading-[56px] mb-[32px] lg:mb-[56px]",
        "[background:url(/icons/bg/title-left.svg)_no-repeat_left_center,url(/icons/bg/title-right.svg)_no-repeat_right_center]",
        "[background-size:37px_15px] lg:[background-size:80px_33px]",
        className
      )}
    >
      {children}
    </h1>
  );
};
