import { Header } from "@/components/header/header";
import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <Header />
      <main className="h-full">
        <div className="h-full container mx-auto sm:container md:container lg:container flex flex-col items-center justify-center">
          {children}
        </div>
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default AuthLayout;
