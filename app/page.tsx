import { cn } from "@/lib/utils";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { auth } from "@/auth";
import { cinzel } from "@/styles/fonts";
import { Button } from "@/components/ui/button";

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
                "text-3xl sm:text-6xl font-semibold text-primary drop-shadow-md font-ginzel",
                cinzel.className
              )}
            >
              Wedding Invitations
            </h1>
            <p className="text-primary text-lg">A simple test project</p>

            <div className="grid grid-cols-2 gap-4 py-4">
              <Button variant="one" type="button" size="auto">
                variant=&quot;one&quot;
              </Button>

              <Button
                size="auto"
                variant="one"
                type="button"
                className="btnOne"
                disabled={true}
              >
                variant=&quot;one&quot;
              </Button>

              <Button
                variant="two"
                type="button"
                className="btnTwo"
                size="auto"
              >
                variant=&quot;two&quot;
              </Button>
              <Button
                size="auto"
                variant="two"
                type="button"
                className="btnTwo"
                disabled={true}
              >
                variant=&quot;two&quot;
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
