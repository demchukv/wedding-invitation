import { AuthProvider } from "@/components/auth-provider";
import { TopNavigation } from "@/components/top-navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <AuthProvider>
      <div className="flex h-full flex-col items-center justify-start bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <TopNavigation />
        <main className="flex h-full flex-col items-center justify-center">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
};

export default ProtectedLayout;
