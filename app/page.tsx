import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";
import { TopNavigation } from "@/components/top-navigation";
import { Footer } from "@/components/footer/footer";
import { auth } from "@/auth";

const font = Poppins({ subsets: ["latin"], weight: "600" });
export default async function Home() {
  const session = await auth();
  return (
    <>
      <TopNavigation />
      <main className="flex h-full flex-col items-center justify-center">
        <div className="space-y-6 text-center">
          <h1
            className={cn(
              "text-6xl font-semibold text-primary drop-shadow-md",
              font.className
            )}
          >
            Wedding Invitations
          </h1>
          <p className="text-primary text-lg">A simple test project</p>
        </div>
        {!session && (
          <div>
            <LoginButton mode="modal" asChild>
              <Button variant="secondary" size="lg">
                Sign in
              </Button>
            </LoginButton>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
