import Image from "next/image";
import Link from "next/link";
import copy from "@/public/icons/copy.svg";
import logo from "@/public/icons/logo.svg";

export const Footer = () => {
  return (
    <footer className="w-full py-4 max-md:w-80 mr-auto ml-auto">
      <div className="container flex flex-row justify-between items-center max-md:flex-col-reverse px-4 lg:px-8">
        <div className="flex gap-16 md:gap-24 justify-between max-md:flex lg:gap-96">
          <Image priority src={logo} alt="Logo" width={97} height={26} />
          <div className="pointer-events-none flex gap-1">
            <Image
              priority
              src={copy}
              alt="copy trade mark"
              width={20}
              height={20}
            />
            <p className="m-0 p-0">{new Date().getFullYear()}</p>
            <p className="m-0 p-0">{"InviTeam"}</p>
          </div>
        </div>
        <nav className="flex gap-2">
          <Link href="#">{"Privacy"}</Link>
          <span>{"|"}</span>
          <Link href="#">{"Terms & Conditions"}</Link>
          <span>{"|"}</span>
          <Link href="/add-review">{"Reviews"}</Link>
        </nav>
      </div>
    </footer>
  );
};
