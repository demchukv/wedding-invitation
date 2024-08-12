import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";
import { TopNavigation } from "@/components/top-navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <AuthProvider>
      <TopNavigation />
      <main className="flex flex-col items-center justify-start py-6">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default ProtectedLayout;
