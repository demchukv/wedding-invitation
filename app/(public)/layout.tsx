import { Header } from "@/components/header/header";
import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const PublicLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <AuthProvider>
      <Header />
      <main className="flex h-full py-6">
        <div className="h-full container mx-auto sm:container md:container lg:container flex flex-col items-center justify-center">
          {children}
        </div>
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default PublicLayout;
