"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  console.log(session);
  const status = session.status;
  return (
    <header className="flex items-center justify-between bg-bgprimary p-7 px-12">
      <nav className="flex items-center gap-8 text-primarylighter font-semibold">
        <Link href={"/"} className="text-primary font-semibold text-4xl mr-9">
          AudioPitch
        </Link>
        <Link href={"/"} className="hover:text-white transition-all">
          Home
        </Link>
        <Link href={""} className="hover:text-white transition-all">
          Menu
        </Link>
        <Link href={""} className="hover:text-white transition-all">
          About
        </Link>
        <Link href={""} className="hover:text-white transition-all">
          Contact
        </Link>
      </nav>
      <nav className="flex item-center gap-4 font-semibold">
        {status === "authenticated" && (
          <button
            onClick={() => signOut()}
            className="bg-primary rounded-full text-white px-8 py-2 hover:bg-primarylighter transition-all"
          >
            Logout
          </button>
        )}
        {status === "unauthenticated" && (
          <>
            <Link
              href={"/login"}
              className="text-primary py-2 hover:text-primarylighter transition-all"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="bg-primary rounded-full text-white px-8 py-2 hover:bg-primarylighter transition-all"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
