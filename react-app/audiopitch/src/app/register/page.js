"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <section className="bg-bgsecondary bg-opacity-5 shadow-lg rounded-lg p-8 mt-24 mx-auto max-w-lg">
      <h1 className="text-center text-primary text-4xl font-bold mt-8 mb-5">
        Register
      </h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created. Please{" "}
          <Link
            className="underline text-blue-600 hover:text-blue-300 transition-all"
            href={"/login"}
          >
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occured. Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500 flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-3">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center bg-white"
        >
          <Image src={"/google.png"} alt={""} width={24} height={24}></Image>
          Login with Google
        </button>
        <div className="pt-4 text-center border-t">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="underline text-blue-600 hover:text-blue-300 transition-all"
              disabled={creatingUser}
            >
              Login Here
            </a>
          </p>
        </div>
      </form>
    </section>
  );
}
