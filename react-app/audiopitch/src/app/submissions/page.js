"use client";
import Header from "@/components/layout/Header";
import UserTabs from "@/components/layout/UserTabs";
import ErrorLayout from "@/components/layout/Error";
import { useEffect, useState } from "react";
import Loading from "@/components/layout/Loading";
import { useProfile } from "@/components/UseProfile";
import ApplicationReview from "@/components/layout/ApplicationReview";

export default function SubmissionsPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [submissions, setSubmissions] = useState([]);
  const [openReview, setOpenReview] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    // const submissionsData = [
    //   { id: 1, type: "Curator", status: "Pending", name: "John Doe" },
    //   { id: 2, type: "Artist", status: "Pending", name: "Jane Doe" },
    // ];
    // setSubmissions(submissionsData);
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/applications");
        if (!response.ok) throw new Error("An error has occured");
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.log("Error fetching submissions:", error.message);
      }
    };

    fetchSubmissions();
  }, [openReview]);

  const handleEditReview = (submission) => {
    setSelectedSubmission(submission);
    // console.log("Submission: ", submission)
    setOpenReview(true);
  };

  const closeReview = () => {
    setOpenReview(false);
    setSelectedSubmission(null);
  };

  if (profileLoading) {
    return <Loading />;
  }

  if (!profileData.admin) {
    return <ErrorLayout code="403" message="Access Denied" href="/" />;
  }

  return (
    <>
      <Header />
      <section className="mt-8 max-w-lg mx-auto">
        <UserTabs isAdmin={true} />
        <div>
          <h2 className="mt-8 text-sm text-gray-500">Pending Applications</h2>
          {submissions.length > 0 ? (
            submissions.map((submission) => (
              <div
                key={submission._id}
                className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
              >
                <div className="grow">
                  {submission.email}: {submission.media} ({submission.role})
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
            <p>No pending applications</p>
          )}
          <ApplicationReview isOpen={openReview} onClose={closeReview} Application={selectedSubmission} />
        </div>
      </section>
    </>
  );
}
