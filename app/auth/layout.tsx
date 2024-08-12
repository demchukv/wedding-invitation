import { Header } from "@/components/header/header";
import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <Header />
      <main className="flex h-full flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default AuthLayout;
