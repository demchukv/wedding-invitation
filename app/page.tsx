import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/page-title";
import { cn } from "@/lib/utils";
import { cormorant, ubuntu } from "@/styles/fonts";
import { ReviewsList } from "@/components/reviews/reviews-list";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Header />
      <main className="flex-grow py-10 container mx-auto flex flex-col items-center justify-start">
        <div className="space-y-6 text-center">
          <PageTitle>Wedding Invitations</PageTitle>

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
          <div className="">
            <div className="flex justify-between items-center">
              <p
                className={cn(
                  cormorant.className,
                  "text-mdarkbrown text-[32px] font-bold leading-[32px]"
                )}
              >
                Reviews of other users
              </p>
              <Link href="/add-review">
                <Button
                  variant="link"
                  className={cn(
                    ubuntu.className,
                    "px-0 font-bold text-mbrown text-[18px] leading-[23.4px]"
                  )}
                >
                  View all
                </Button>
              </Link>
            </div>
            <ReviewsList />
          </div>
        </div>
        {/* </div> */}
      </main>
      <Footer />
    </>
  );
}
