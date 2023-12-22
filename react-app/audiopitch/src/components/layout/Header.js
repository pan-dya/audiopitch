import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-lighter3 p-7 px-12">
      <Link className="text-primary font-semibold text-4xl" href="">
        AudioPitch
      </Link>
      <nav className="flex items-center gap-8 text-darker1 font-semibold">
        <Link href={""}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
        <Link
          href={""}
          className="bg-darker2 rounded-full text-white px-8 py-2"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
