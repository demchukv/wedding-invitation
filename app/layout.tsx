import type { Metadata } from "next";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/auth-provider";
import { cn } from "@/lib/utils";
import { quicksand, cinzel } from "@/styles/fonts";
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
            "min-h-screen flex flex-col bg-background antialiased",
            quicksand.className
          )}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
