import { TopNavigation } from "@/components/top-navigation";
import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <AuthProvider>
      <TopNavigation />
      <main className="flex h-full flex-col items-center justify-center py-6">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default ProtectedLayout;
