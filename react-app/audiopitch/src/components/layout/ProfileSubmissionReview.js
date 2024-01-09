"use client";

import Link from "next/link";
import { useState } from "react";

export default function SubmissionReview({
  isOpen,
  onClose = () => {},
  Submission = {},
}) {
  if (!isOpen) return null;

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
        <h2 className="text-xl font-semibold mb-4">Review Submission</h2>
        <p>
          <span className="font-semibold">Title:</span> {Submission.title}
        </p>
        <p>
          <span className="font-semibold">Artist:</span> {Submission.name} (
          {Submission.email})
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
        <p>
          <span className="font-semibold">Curator:</span> {Submission.curator}
        </p>
        <p>
          <span className="font-semibold">Feedback:</span> {Submission.feedback}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {Submission.status}
        </p>
      </div>
    </div>
  );
}
