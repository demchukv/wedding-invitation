import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-4 bg-secondary">
      <div className="container mx-auto sm:container md:container lg:container">
        <div className="flex flex-row justify-between items-center">
          <div>&copy; {new Date().getFullYear()} InviteTeam</div>
          <div className="flex gap-4">
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
