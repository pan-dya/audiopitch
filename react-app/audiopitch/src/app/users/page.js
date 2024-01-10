"use client";
import Header from "@/components/layout/Header";
import { useProfile } from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import ErrorLayout from "@/components/layout/Error";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (profileLoading) {
    return <Loading />;
  }

  if (!profileData.admin) {
    return <ErrorLayout code="403" message="Access Denied" href="/" />;
  }

  return (
    <>
      <Header />
      <section className="mt-8 max-w-xl mx-auto">
        <UserTabs isAdmin={true} />
        <h1 className="mt-8 text-3xl text-primary italic font-semibold text-center">
          Users
        </h1>
        <div>
          <h2 className="mt-8 text-sm text-gray-500">Users</h2>
          {users.length > 0 &&
            users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                  <div className="text-gray-900">
                    {!!user.name && <span>{user.name}</span>}
                    {!user.name && <span className="italic">No name</span>}
                  </div>
                  <span className="text-gray-500">{user.email}</span>
                </div>
                <div>
                  <Link className="button" href={"/users/" + user._id}>
                    Edit
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
