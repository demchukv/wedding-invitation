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
      <main className="flex-grow flex">
        <div className="h-full container mx-auto sm:container md:container lg:container flex flex-col items-center justify-start w-full">
          {children}
        </div>
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default PublicLayout;
