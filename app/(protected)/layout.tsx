import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import StoreProvider from "@/app/StoreProvider";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <AuthProvider>
      <Header />
      <main className="flex-grow  py-10 container mx-auto flex flex-col items-center justify-start">
        {/* <div className="h-full container mx-auto flex flex-col items-center justify-start"> */}
        <StoreProvider>{children}</StoreProvider>
        {/* </div> */}
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default ProtectedLayout;
