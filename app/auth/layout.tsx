import { TopNavigation } from "@/components/top-navigation";
import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <TopNavigation />
      <main className="flex h-full flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default AuthLayout;
