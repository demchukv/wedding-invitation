import { TooltipProvider } from "@/components/ui/tooltip";
import { currentUser } from "@/lib/auth";
import { Aside } from "@/app/(admin)/_components/aside";
import { Header } from "@/app/(admin)/_components/header";
import { AuthProvider } from "@/components/auth-provider";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const user = await currentUser();

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-emerald-800">
        <h1 className="text-3xl font-semibold">Unauthorized!</h1>
      </div>
    );
  }

  return (
    <AuthProvider>
      <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Aside />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Header />
            {children}
          </div>
        </div>
      </TooltipProvider>
    </AuthProvider>
  );
};

export default DashboardLayout;
