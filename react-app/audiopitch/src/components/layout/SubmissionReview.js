"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SubmissionReview({
  isOpen,
  onClose = () => {},
  Submission = {},
}) {
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState("");
  if (!isOpen) return null;

  async function deleteSubmission(_id) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch("/api/Submissions?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) resolve(true);
      else reject();
    });
  }

  async function handleFormSubmit(ev, id) {
    ev.preventDefault();

    const updateFeedbackPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/song/review?id=" + id, {
        method: "PATCH",
        headers: { "Content-Type": "Submission/json" },
        body: JSON.stringify({ feedback, status: "Declined" }),
      });
      if (response.ok) resolve(true);
      else reject();
    });

    await toast.promise(updateFeedbackPromise, {
      loading: "Sending Feedback...",
      success: "Feedback Sent",
      error: "Failed",
    });
    setShowForm(false);
    setFeedback("");
    onClose();
  }

  async function handleAccept(ev, id) {
    ev.preventDefault();

    const updateRolePromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/song/review?id=" + id, {
        method: "PATCH",
        headers: { "Content-Type": "Submission/json" },
        body: JSON.stringify({ status:"To be Published" }),
      });
      if (response.ok) resolve(true);
      else reject();
    });

    await toast.promise(updateRolePromise, {
      loading: "Accepting Submission...",
      success: "Submission Accepted",
      error: "Failed to Accept Submission",
    });
    setShowForm(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative p-6 bg-white rounded-lg shadow-lg w-1/2">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => {
              setShowForm(false);
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
        <h2 className="text-xl font-semibold mb-4">Review Submission</h2>
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
        <div className="flex mt-2 gap-2">
          <button
            disabled={showForm}
            className="bg-green-500 border-0 text-white hover:opacity-50"
            onClick={(ev) =>
              handleAccept(ev, Submission.id)
            }
          >
            Accept
          </button>
          <button
            onClick={() => {
              setShowForm(true);
            }}
            disabled={showForm}
            className="bg-red-500 border-0 text-white hover:opacity-50"
          >
            Decline
          </button>
        </div>

        {showForm && (
          <form onSubmit={(ev) => handleFormSubmit(ev, Submission.id)}>
            <label>Feedback:</label>
            <input
              type="text"
              placeholder="Feedback"
              onChange={(ev) => setFeedback(ev.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}
