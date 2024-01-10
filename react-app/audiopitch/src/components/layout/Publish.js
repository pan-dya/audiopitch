"use client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PublishTab({
  isOpen,
  onClose = () => {},
  Submission = {},
}) {
  if (!isOpen) return null;

  const refreshPage = () => {
    window.location.reload();
  };

  async function handleFormSubmit(ev, id) {
    ev.preventDefault();

    const updateFeedbackPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/song/review?id=" + id, {
        method: "PATCH",
        headers: { "Content-Type": "Submission/json" },
        body: JSON.stringify({ status: "Accepted" }),
      });
      if (response.ok) resolve(true);
      else reject();
    });

    await toast.promise(updateFeedbackPromise, {
      loading: "Sending Feedback...",
      success: "Feedback Sent",
      error: "Failed",
    });
    refreshPage();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative p-6 bg-white rounded-lg shadow-lg w-1/2">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => {
              onClose();
            }}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Already Published?</h2>
        <p>
          <span className="font-semibold">Title:</span> {Submission.title}
        </p>
        <p>
          <span className="font-semibold">Artist:</span> {Submission.name}
        </p>
        <p>
          <span className="font-semibold">Release Date:</span> {Submission.date}
        </p>
        <p>
          <span className="font-semibold">Description:</span>{" "}
          {Submission.description}
        </p>
        <p>
          <span className="font-semibold">Track Url:</span>
          <Link
            className="text-blue-600 hover:text-blue-300"
            href={Submission.url}
          >
            {" "}
            {Submission.url}
          </Link>
        </p>
        <form
          className="mt-4"
          onSubmit={(ev) => handleFormSubmit(ev, Submission.id)}
        >
          <label>Published to:</label>
          <input
            type="url"
            placeholder="Playlist Link, Other Curation Media Link"
            value={Submission.media}
            // onChange={(ev) => setMedia(ev.target.value)}
            required
          />
          <button type="submit">Done</button>
        </form>
      </div>
    </div>
  );
}
