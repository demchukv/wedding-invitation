import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <AuthProvider>
      <Header />
      <main className="flex h-full flex-col items-center justify-start py-6">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default ProtectedLayout;
