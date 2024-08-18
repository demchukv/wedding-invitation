import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-4 flex-shrink-0">
      <div className="container mx-auto ">
        <div className="flex flex-row justify-between items-center">
          <div>&copy; {new Date().getFullYear()} InviteTeam</div>
          <div className="flex flex-col gap-1 md:flex-row md:gap-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/templates">Templates</Link>
            <Link href="/feedback">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
