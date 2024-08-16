import { cinzel } from "@/styles/fonts";
import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
  headerTitle?: string;
}
export const Header = ({
  label,
  headerTitle,
}: HeaderProps & { label: string }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", cinzel.className)}>
        {headerTitle || "Wedding Invitation"}
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;
