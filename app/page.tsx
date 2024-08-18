import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/page-title";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Header />
      <main className="flex-grow  py-10 container mx-auto flex flex-col items-center justify-start">
        {/* <div className="min-h-full container mx-auto flex flex-col items-center justify-center"> */}
        <div className="space-y-6 text-center">
          <PageTitle>Wedding Invitations</PageTitle>
          <p className="text-primary">A simple test project</p>

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

            <Button variant="two" type="button" className="btnTwo" size="auto">
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
        {/* </div> */}
      </main>
      <Footer />
    </>
  );
}
