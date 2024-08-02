import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { BaseNavbar } from "@/components/base-navbar";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";
import { NewUserMenu } from "@/components/auth/new-user-menu";
import { Navbar } from "@/app/(protected)/_components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log("session", session);
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <div className="flex flex-row justify-around w-full">
            <BaseNavbar />
            {!session ? <NewUserMenu /> : <Navbar />}
          </div>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
