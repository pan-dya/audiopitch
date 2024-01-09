"use client";
import Image from "next/image";
import Right from "../icons/Right";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch("/api/profile/roles")
      .then((response) => {
        response.json().then((data) => {
          setRole(data.role);
        });
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }, []);

  return (
    <section className="hero bg-shade2">
      <div className="py-16">
        <h1 className="text-4xl font-semibold leading-normal">
          Empowering Musicians
          <br />
          with&nbsp;
          <span className="text-primary">AudioPitch</span>
        </h1>
        <p className="my-4 text-gray-500 text-sm">
          Discover a collaborative space dedicated to supporting artists on
          their musical journeys. Join us today and elevate your music career!
        </p>
        <div className="flex gap-4 text-sm">
          <Link
            className="bg-primary flex justify-center items-center uppercase gap-3 w-auto text-textcolor px-4 py-2 rounded-full hover:opacity-50 transition-all"
            href={
              role === "Artist"
                ? "/SubmissionForm"
                : role === "Curator"
                ? "/SongSubmissions"
                : "/get-started"
            }
          >
              {role === "Artist"
                ? "Submit Song"
                : role === "Curator"
                ? "Song Submissions"
                : "Get Started"}{" "}
              <Right />
          </Link>
          <button className=" border-none text-gray-400 w-auto px-4 py-2 hover:text-gray-600">
            Learn More
          </button>
        </div>
      </div>

      <div className="ml-10 relative">
        <Image
          src={"/imagehero.png"}
          alt={"Hero Image"}
          priority={true}
          fill
          style={{objectFit:"contain"}}
        />
      </div>
    </section>
  );
}
