"use client";
import Redirect from "@/components/icons/Redirect";
import Image from "next/image";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  //   const [image, setImage] = useState(user?.image || "");
  const [media, setMedia] = useState(user?.media || "https://");
  const [isAdmin, setIsAdmin] = useState(user?.admin || false);
  const [role, setRole] = useState(user?.role || "");
  const { data: loggedInUserData } = useProfile();

  const handleMediaClick = () => {
    if (media) {
      window.open(media, "_blank");
    }
  };

  return (
    <section className="mt-8">
      <div className="max-w-md mx-auto mt-10">
        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              {user.image && (
                <Image
                  className="rounded-lg w-full h-full mb-1"
                  src={user.image}
                  width={250}
                  height={250}
                  alt={"avatar"}
                ></Image>
              )}
            </div>
          </div>
          <form
            className="grow"
            onSubmit={(ev) =>
              onSave(ev, { name: userName, role, media, isAdmin })
            }
          >
            <label>Username:</label>
            <input
              type="text"
              value={userName}
              placeholder="Name"
              onChange={(ev) => setUserName(ev.target.value)}
            />
            {user.role === "Curator Pending" ||
            user.role === "Artist Pending" ||
            user.role === "Artist" ||
            user.role === "Curator" ||
            user.role === "" ? (
              <label>Role:</label>
            ) : (
              <label>Feedback:</label>
            )}
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(ev) => setRole(ev.target.value)}
            />
            <label>Email:</label>
            <input
              type="email"
              disabled={true}
              value={user.email}
              placeholder={"email"}
            />
            <label>Media Link:</label>
            <div className="relative">
              <input
                type="url"
                placeholder="Media Link (Youtube/Spotify/etc)"
                value={media}
                onChange={(ev) => setMedia(ev.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={handleMediaClick}
              >
                <Redirect />
              </div>
            </div>
            {loggedInUserData.admin && (
              <div>
                <label
                  className="p-2 inline-flex items-center gap-2 mb-2"
                  htmlFor="adminCb"
                >
                  <input
                    id="adminCb"
                    type="checkbox"
                    className=""
                    value={"1"}
                    checked={isAdmin}
                    onChange={(ev) => setIsAdmin(ev.target.checked)}
                  />
                  <span>Admin</span>
                </label>
              </div>
            )}

            <button className="mt-4" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
