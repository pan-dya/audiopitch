"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [status, setStatus] = useState(null);
  const [userName, setUserName] = useState(null);
  const session = useSession();

  useEffect(() => {
    if (session) {
      setStatus(session.status);

      if (session.data?.user) {
        if (session.data.user.name) {
          const firstName = session.data.user.name.split(" ")[0];
          setUserName(firstName);
        } else {
          setUserName(session.data?.user.email);
        }
      }
    }
  }, [session]);
  // console.log(session);

  return (
    <header className="flex items-center justify-between bg-bgprimary p-7 px-12">
      <nav className="flex items-center gap-8 text-primarylighter font-semibold">
        <Link href={"/"} className="text-primary font-semibold text-4xl mr-9">
          AudioPitch
        </Link>
        {status === "authenticated" && (
          <>
            <Link href={"/"} className="hover:text-white transition-all">
              Home
            </Link>
            <Link href={""} className="hover:text-white transition-all">
              Coins
            </Link>
            <Link href={""} className="hover:text-white transition-all">
              About
            </Link>
            <Link href={""} className="hover:text-white transition-all">
              Contact
            </Link>
          </>
        )}
        {status !== "authenticated" && (
          <>
            <Link href={"/"} className="hover:text-white transition-all">
              Home
            </Link>
            <Link href={""} className="hover:text-white transition-all">
              About
            </Link>
            <Link href={""} className="hover:text-white transition-all">
              Contact
            </Link>
          </>
        )}
      </nav>
      <nav className="flex item-center gap-4 font-semibold">
        {status === "authenticated" && (
          <>
            <Link
              href={"/profile"}
              className="py-2 whitespace-nowrap text-primarylighter hover:text-white transition-all"
            >
              Hello, {userName}
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" }) }
              className="bg-primary rounded-full text-white px-8 py-2 hover:bg-primarylighter transition-all"
            >
              Logout
            </button>
          </>
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
