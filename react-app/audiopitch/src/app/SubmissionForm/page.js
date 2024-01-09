"use client";
import Header from "@/components/layout/Header";
import React, { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import ErrorLayout from "@/components/layout/Error";
import Loading from "@/components/layout/Loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SubmissionForm() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [curators, setCurators] = useState([]);
  const [title, setTitle] = useState("");
  const [curator, setCurator] = useState("");
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/song/curators").then((response) => {
      response.json().then((data) => {
        setCurators(data);
      });
    });
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (!title || !curator || !url || !date || !description) {
      // Handle the case where some required fields are not filled
      toast.error("All fields are required!");
      return;
    }

    const submitPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/song/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          curator,
          url,
          date,
          description,
          feedback: "-",
          status: "Waiting for Review",
        }),
      });
      if (response.ok) resolve();
      else reject;
    });
    toast
      .promise(submitPromise, {
        loading: "Submitting...",
        success: "Submission Submitted!",
        error: "An Error has Occured",
      })
      .then(() => {
        router.push("/");
      });
  }

  if (profileLoading) {
    return <Loading />;
  }

  if (profileData.admin || profileData.role === "Artist") {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen bg-shade">
          <form
            onSubmit={handleSubmit}
            className="mt-10 mb-20 shadow-xl w-full md:w-1/2 lg:w-1/3 bg-white p-8 rounded-lg shadow-2xl"
          >
            <h2 className="italic text-3xl font-semibold mb-6 text-center text-primary">
              Track Submission Form
            </h2>
            <div className="mb-4">
              <label className="labelForm">Song Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={(ev) => setTitle(ev.target.value)}
                className="border rounded-md p-3 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="labelForm">Curator:</label>
              <select onChange={(ev) => setCurator(ev.target.value)}>
                <option value="">Select a Curator</option>
                {curators.map((curator) => (
                  <option key={curator.email} value={curator.email}>
                    {curator.name} ({curator.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="labelForm">Track URL:</label>
              <input
                type="url"
                id="title"
                name="title"
                onChange={(ev) => setUrl(ev.target.value)}
                placeholder="Enter title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="labelForm">Release Date:</label>
              <input
                type="date"
                id="title"
                name="title"
                onChange={(ev) => setDate(ev.target.value)}
                placeholder="Enter title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="labelForm">Song Description:</label>
              <p className="text-xs text-gray-500">
                Write a description for your song
              </p>
              <textarea
                id="content"
                name="content"
                onChange={(ev) => setDescription(ev.target.value)}
                placeholder="Enter song Description"
                required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }

  return <ErrorLayout code="403" message="Access Denied" href="/" />;
}
