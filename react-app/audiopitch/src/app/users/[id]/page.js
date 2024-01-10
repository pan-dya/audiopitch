"use client";
import UserForm from "@/components/layout/Userform";
import Loading from "@/components/layout/Loading";
import ErrorLayout from "@/components/layout/Error";
import Header from "@/components/layout/Header";
import Left from "@/components/icons/Left";
import { useProfile } from "@/components/UseProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, [id]);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved",
      error: "An error has occurred while saving the user",
    });
  }

  if (loading) {
    return <Loading />;
  }

  if (!data.admin) {
    return <ErrorLayout code="403" message="Access Denied" href="/" />;
  }

  return (
    <>
      <Header />
      <section className="mt-8 max-w-xl mx-auto">
        <UserTabs isAdmin={data.admin} />
        <div className="relative">
          <Link href={"/users"}>
            <Left />
          </Link>
          <div className="flex-grow">
            <UserForm user={user} onSave={handleSaveButtonClick} />
          </div>
        </div>
      </section>
    </>
  );
}
