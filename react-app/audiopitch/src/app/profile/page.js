"use client";
import Loading from "@/components/layout/Loading";
import ErrorLayout from "@/components/layout/Error";
import UserTabs from "@/components/layout/UserTabs";
import Redirect from "@/components/icons/Redirect";
import Header from "@/components/layout/Header";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [media, setMedia] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState("");
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setRole(data.role);
          setMedia(data.media);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, image, role, media }),
      });
      if (response.ok) resolve();
      else reject;
    });
    toast.promise(savingPromise, {
      loading: "Updating...",
      success: "Profile Upldated!",
      error: "An Error has Occured",
    });
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((Link) => {
            setImage(Link);
          });
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload Completed!",
        error: "Upload Error",
      });
    }
  }

  async function handleCuratorApplication(ev) {
    ev.preventDefault();
    // setRole("Pending");

    const applicationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          role: "Curator Pending",
          media,
        }),
      });
      if (response.ok) {
        resolve();
        setRole("Curator Pending");
      } else reject;
    });
    toast.promise(applicationPromise, {
      loading: "Applying...",
      success: "Submission Applied!",
      error: "An Error has Occured",
    });
  }

  async function handleArtistApplication(ev) {
    ev.preventDefault();
    // setRole("Pending");

    const applicationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, role: "Artist Pending", media }),
      });
      if (response.ok) {
        resolve();
        setRole("Artist Pending");
      } else reject;
    });
    toast.promise(applicationPromise, {
      loading: "Applying...",
      success: "Submission Applied!",
      error: "An Error has Occured",
    });
  }

  const handleMediaClick = () => {
    if (media) {
      window.open(media, "_blank");
    }
  };

  if (status === "loading" || !profileFetched) {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return (
      <ErrorLayout
        code="401"
        message="Please Login"
        href="/login"
        buttonMessage="Login"
      />
    );
  }

  return (
    <>
      <Header />
      <section className="mt-8">
        <UserTabs isAdmin={isAdmin} />
        <div className="max-w-md mx-auto mt-10">
          <div className="flex gap-4">
            <div>
              <div className="p-2 rounded-lg relative max-w-[120px]">
                {image && (
                  <Image
                    className="rounded-lg w-full h-full mb-1"
                    src={image}
                    width={250}
                    height={250}
                    alt={"avatar"}
                  ></Image>
                )}
                <label>
                  <input type="file" className="hidden" />
                  <span className="block border border-gray-300 rounded-lg p-2 text-center hover:bg-gray-200 cursor-pointer">
                    Edit
                  </span>
                </label>
              </div>
            </div>
            <form className="grow" onSubmit={handleProfileInfoUpdate}>
              <label>Username:</label>
              <input
                type="text"
                value={userName}
                placeholder="Name"
                onChange={(ev) => setUserName(ev.target.value)}
              />
              {role === "Curator Pending" ||
              role === "Artist Pending" ||
              role === "Artist" ||
              role === "Curator" ||
              role === "" ? (
                <label>Role:</label>
              ) : (
                <label>Feedback:</label>
              )}
              <input
                type="text"
                placeholder="Role"
                value={role}
                disabled={true}
              />
              <label>Email:</label>
              <input
                type="email"
                disabled={true}
                value={session.data.user.email}
                placeholder={"email"}
              />
              <label>Media Link:</label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="Media Link (Youtube/Spotify/etc)"
                  value={media}
                  disabled={role === "Curator" || role === "Artist"}
                  onChange={(ev) => setMedia(ev.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={handleMediaClick}
                >
                  <Redirect />
                </div>
              </div>
              <button className="mt-4" type="submit">Save</button>
            </form>
          </div>
          {role === "Curator Pending" || role === "Artist Pending" ? (
            <div
              className="applicationBox"
              title="Admin is checking your application."
            >
              Application Pending
            </div>
          ) : role === "Curator" || role === "Artist" ? (
            <></>
          ) : role === "" ? (
            <div className="applies flex gap-4 mt-6">
              <button onClick={handleCuratorApplication}>
                Apply to be a Curator
              </button>
              <button onClick={handleArtistApplication}>
                Apply to be an Artist
              </button>
            </div>
          ) : (
            <>
              <div className="applicationBox" title="Feedback">
                {role}
              </div>
              <div className="applies flex gap-4 mt-2">
                <button onClick={handleCuratorApplication}>
                  Re-Apply to be a Curator
                </button>
                <button onClick={handleArtistApplication}>
                  Re-Apply to be an Artist
                </button>
              </div>
            </>
          )}
          ;
        </div>
      </section>
    </>
  );
}
