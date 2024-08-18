import { Header } from "@/components/header/header";
import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <Header />
      <main className="flex-grow  py-10 container mx-auto flex flex-col items-center justify-start">
        {/* <div className="h-full container mx-auto flex flex-col items-center justify-start"> */}
        {children}
        {/* </div> */}
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default AuthLayout;
