"use client";
import Link from "next/link";
import SubmissionReview from "@/components/layout/SubmissionReview";
import { useProfile } from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import ErrorLayout from "@/components/layout/Error";
import Header from "@/components/layout/Header";
import { useEffect, useState } from "react";
import Right from "@/components/icons/Right";

export default function SongSubmissionPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [openReview, setOpenReview] = useState(false);

  useEffect(() => {
    let url = "/api/song/submissions";

    fetch(url).then((response) => {
      response.json().then((data) => {
        setSubmissions(
          data.filter((submission) => submission.status !== "To be Published")
        );
        setFilteredSubmissions(
          data.filter((submission) => submission.status === "To be Published")
        );
      });
    });
  }, [profileData]);

  const handleEditReview = (submission) => {
    setSelectedSubmission(submission);
    setOpenReview(true);
  };

  const closeReview = () => {
    setOpenReview(false);
    setSelectedSubmission(null);
  };

  if (profileLoading) {
    return <Loading />;
  }

  if (profileData.admin || profileData.role === "Curator") {
    return (
      <>
        <Header />
        <section className="mt-8 max-w-lg mx-auto">
          <h1 className="mt-8 text-3xl text-primary italic font-semibold">
            Track Submissions
          </h1>
          <div>
            <h2 className="mt-8 text-sm text-gray-500">
              Submitted Tracks ({profileData.name})
            </h2>
            {submissions.length > 0 ? (
              submissions.map((submission) => (
                <div
                  key={submission._id}
                  className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
                >
                  <div className="grow">
                    {submission.title}, {submission.name} ({submission.email})
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        handleEditReview(submission);
                      }}
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No submissions</p>
            )}
          </div>
          <div>
            <h2 className="mt-8 text-sm text-gray-500">
              Tracks to Publish ({profileData.name})
            </h2>
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <div
                  key={submission._id}
                  className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
                >
                  <div className="grow">
                    {submission.title}, {submission.name} ({submission.email})
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        handleEditReview(submission);
                      }}
                    >
                      Publish
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tracks to be published</p>
            )}
            <SubmissionReview
              isOpen={openReview}
              onClose={closeReview}
              Submission={selectedSubmission}
            />
          </div>
          <Link
            className="bg-primary flex justify-center items-center uppercase gap-3 w-auto text-white px-4 py-2 my-8 rounded-full hover:opacity-50 transition-all"
            href={"/submissions"}
          >
            Submissons History
          </Link>
        </section>
      </>
    );
  }

  return <ErrorLayout code="403" message="Access Denied" href="/" />;
}
