"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ApplicationReview({
  isOpen,
  onClose = () => {},
  Application = {},
}) {
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState("");
  if (!isOpen) return null;

  async function deleteApplication(_id) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch("/api/applications?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) resolve(true);
      else reject();
    });
  }

  async function handleFormSubmit(ev, _id, email) {
    ev.preventDefault();

    const deletePromise = deleteApplication(_id);

    const updateFeedbackPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/applications?email=" + email, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });
      if (response.ok) resolve(true);
      else reject();
    });

    await toast.promise(deletePromise, updateFeedbackPromise, {
      loading: "Sending Feedback...",
      success: "Feedback Sent",
      error: "Failed",
    });
    setShowForm(false);
    setFeedback("");
    onClose();
  }

  async function handleAccept(ev,_id, email, role) {
    ev.preventDefault();

    const deletePromise = deleteApplication(_id);

    const updateRolePromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/applications?email=" + email, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role: role.replace(" Pending", ""),
        }),
      });
      if (response.ok) resolve(true);
      else reject();
    });

    await toast.promise(deletePromise, updateRolePromise, {
      loading: "Updating Role...",
      success: "Role Updated",
      error: "Failed to Update Role",
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
        <h2 className="text-xl font-semibold mb-4">Review/Edit Submission</h2>
        <p>
          <span className="font-semibold">Email:</span> {Application.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {Application.role}
        </p>
        <p>
          <span className="font-semibold">Media:</span>
          <Link className="text-blue-600 hover:text-blue-300" href={Application.media}> {Application.media}</Link>
        </p>
        <div className="flex mt-2 gap-2">
          <button
            disabled={showForm}
            className="bg-green-500 border-0 text-white hover:opacity-50"
            onClick={(ev) =>
              handleAccept(ev, Application._id, Application.email, Application.role)
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
          <form
            onSubmit={(ev) =>
              handleFormSubmit(
                ev,
                Application._id,
                Application.email,
                Application.role
              )
            }
          >
            <label>Feedback:</label>
            <input
              type="text"
              placeholder="Feedback"
              onChange={(ev) => setFeedback(ev.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}
