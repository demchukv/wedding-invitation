import { AuthProvider } from "@/components/auth-provider";
import { TopNavigation } from "@/components/top-navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col items-center justify-start">
        <TopNavigation />
        <main className="flex h-full flex-col items-center justify-start">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
};

export default ProtectedLayout;
