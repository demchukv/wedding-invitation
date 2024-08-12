import { Header } from "@/components/header/header";
import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <AuthProvider>
      <Header />
      <main className="flex h-full flex-col items-center justify-center py-6">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default ProtectedLayout;
