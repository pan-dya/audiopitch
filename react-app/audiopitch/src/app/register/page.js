"use client";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleFormSubmit(ev) {
    ev.preventDefault();
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
  }
  return (
    <section className="bg-bgsecondary bg-opacity-5 shadow-lg rounded-lg p-8 mt-24 mx-auto max-w-lg">
      <h1 className="text-center text-primary text-4xl font-bold mt-8 mb-5">
        Register
      </h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">Register</button>
        <div className="my-4 text-center text-gray-500 flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-3">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <button className="flex gap-4 justify-center bg-white">
          <Image src={"/google.png"} alt={""} width={24} height={24}></Image>
          Login with Google
        </button>
        <div className="pt-4 text-center"> 
          <p>
            Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-300 transition-all">Login Here</a>
          </p>
        </div>
      </form>
    </section>
  );
}
