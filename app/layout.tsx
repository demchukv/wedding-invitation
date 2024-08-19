import type { Metadata } from "next";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/auth-provider";
import { cn } from "@/lib/utils";
import { ubuntu } from "@/styles/fonts";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "InviTeam",
  description: "Create your own invitation with InviTeam",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-full min-w-[320px] flex flex-col bg-background antialiased",
            ubuntu.className,
            "bg-right-bottom bg-no-repeat bg-scroll bg-clip-border bg-origin-border",
            "bg-[url(/icons/bg/page-bg.svg)]"
          )}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
