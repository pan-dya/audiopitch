"use client";
import UserTabs from "@/components/layout/UserTabs"
import Redirect from "@/components/icons/Redirect";
import Header from "@/components/layout/Header";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import { UploadButton } from "@uploadthing/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [media, setMedia] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setMedia(data.media);
          setIsAdmin(data.admin);
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
        body: JSON.stringify({ name: userName, image, media }),
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

  const handleMediaClick = () => {
    if (media) {
      window.open(media, '_blank')
    }
  }

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
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
                  <span className="block border border-gray-300 rounded-lg p-2 text-center">
                    Edit
                  </span>
                </label>
                {/* <UploadButton
                  className="block border border-gray-300 rounded-lg p-2 text-center"
                  style={{ width: "100%", cursor: "pointer" }}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                >
                  Upload
                </UploadButton> */}
              </div>
            </div>
            <form className="grow" onSubmit={handleProfileInfoUpdate}>
              <label>
                Username:
              </label>
              <input
                type="text"
                value={userName}
                placeholder="Name"
                onChange={(ev) => setUserName(ev.target.value)}
              />
              <label>
                Role:
              </label>
              <input type="text" value={"Curator / Artist"} disabled={true} />
              <label>
                Email:
              </label>
              <input
                type="email"
                disabled={true}
                value={session.data.user.email}
                placeholder={"email"}
              />
              <label>
                Media Link:
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="Media Link (Youtube/Spotify/etc)"
                  value={media}
                  onChange={(ev) => setMedia(ev.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleMediaClick}>
                  <Redirect />
                </div>
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
