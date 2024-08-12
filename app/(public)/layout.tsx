import { TopNavigation } from "@/components/top-navigation";
import { AuthProvider } from "@/components/auth-provider";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <AuthProvider>
      <div className="flex h-full flex-col items-center justify-start ">
        <TopNavigation />
        <main className="flex h-full flex-col items-center justify-center">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
};

export default ProtectedLayout;
