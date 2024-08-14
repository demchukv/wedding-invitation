import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { auth } from "@/auth";
import { cinzel } from "@/styles/fonts";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Header />
      <main className="flex-grow flex">
        <div className="min-h-full container mx-auto flex flex-col items-center justify-center">
          <div className="space-y-6 text-center">
            <h1
              className={cn(
                "text-6xl font-semibold text-primary drop-shadow-md font-ginzel",
                cinzel.className
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
        </div>
      </main>
      <Footer />
    </>
  );
}
