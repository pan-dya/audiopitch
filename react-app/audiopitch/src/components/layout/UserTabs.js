"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/applications" ? "active" : ""}
            href={"/applications"}
          >
            Applications
          </Link>
          <Link className={path === "/users" ? "active" : ""} href={"/users"}>
            Users
          </Link>
        </>
      )}
      <Link
        className={path === "/submissions" ? "active" : ""}
        href={"/submissions"}
      >
        Submissions
      </Link>
    </div>
  );
}
