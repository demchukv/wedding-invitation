import { LeftSidebar } from "@/app/(admin)/_components/left-sidebar";
import { currentUser } from "@/lib/auth";
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
    <>
      <div className="h-full w-full flex flex-col gap-y-10 items-start justify-start">
        <LeftSidebar />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
