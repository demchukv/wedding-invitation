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
      <main className="flex-grow flex">
        <div className="h-full container mx-auto md:container xl:container flex flex-col items-center justify-start">
          {children}
        </div>
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default ProtectedLayout;
