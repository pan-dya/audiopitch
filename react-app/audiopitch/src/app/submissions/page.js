"use client";
import SubmissionReview from "@/components/layout/ProfileSubmissionReview";
import { useProfile } from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import ErrorLayout from "@/components/layout/Error";
import Header from "@/components/layout/Header";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";

export default function submissionsPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [submissions, setSubmissions] = useState([]);
  const [openReview, setOpenReview] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    let url = "/api/song/submissions";

    fetch(url).then((response) => {
      response.json().then((data) => {
        setSubmissions(data);
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

  return (
    <>
      <Header />
      <section className="mt-8 max-w-lg mx-auto">
        <UserTabs isAdmin={profileData.admin} />
        <h1 className="mt-8 text-3xl text-primary italic font-semibold text-center">
          Track Submissions
        </h1>
        <div>
          <h2 className="mt-8 text-sm text-gray-500">Submitted Tracks</h2>
          {submissions.length > 0 ? (
            submissions.map((submission) => (
              <div
                key={submission._id}
                className={`rounded-xl p-2 px-4 flex gap-1 mb-1 items-center border-2 ${
                  submission.status === "Declined"
                    ? "bg-red-100 border-red-400"
                    : submission.status === "Accepted"
                    ? "bg-green-100 border-green-400"
                    : submission.status === "To be Published"
                    ? "bg-cyan-100 border-cyan-400"
                    : "bg-yellow-100 border-yellow-400"
                }`}
              >
                <div className="grow">
                  {submission.title}, {submission.name} ({submission.email})
                </div>
                <div className="flex gap-1">
                  <button
                    className={`border-0 ${
                      submission.status === "Declined"
                        ? "bg-red-300"
                        : submission.status === "Accepted"
                        ? "bg-green-300"
                        : submission.status === "To be Published"
                        ? "bg-cyan-300"
                        : "bg-yellow-300"
                    }`}
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
        <SubmissionReview
          isOpen={openReview}
          onClose={closeReview}
          Submission={selectedSubmission}
        />
      </section>
    </>
  );
}
