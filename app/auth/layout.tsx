import { TopNavigation } from "@/components/top-navigation";
import { AuthProvider } from "@/components/auth-provider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <TopNavigation />
      <main className="flex h-full flex-col items-center justify-center">
        {children}
      </main>
    </AuthProvider>
  );
};

export default AuthLayout;
