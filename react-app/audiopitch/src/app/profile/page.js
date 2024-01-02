"use client";
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

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, image }),
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
        <h1 className="text-center text-primary text-4xl font-bold mt-8 mb-5">
          Profile
        </h1>
        <div className="max-w-md mx-auto">
          <div className="flex gap-2 items-center">
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
              <input
                type="text"
                value={userName}
                placeholder="Name"
                onChange={(ev) => setUserName(ev.target.value)}
              />
              <input
                type="email"
                disabled={true}
                value={session.data.user.email}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
