import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-bgprimary p-7 px-12">
      <Link className="text-primary font-semibold text-4xl" href="">
        AudioPitch
      </Link>
      <nav className="flex items-center gap-8 text-primarylighter font-semibold">
        <Link href={""} className="hover:text-white transition-all">
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
        <Link
          href={""}
          className="bg-primary rounded-full text-textcolor px-8 py-2 hover:bg-primarylighter hover:text-textcolorl transition-all"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
