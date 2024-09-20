"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewContainer from "@/components/ReviewContainer";
import DashboardLayout from "@/components/DashboardLayout";

export default function InboxPage() {
  const [reviewData, setReviewData] = useState<any[]>([]);
  const [projectId, setProject] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [take] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [isStats, setIsStats] = useState(true);
  const [filter, setFilter] = useState(""); // Move the filter state here
  const [stats, setStats] = useState({
    issueCount: 0,
    likedCount: 0,
    suggestionCount: 0,
    totalResponses: 0,
  });

  const fetchReviews = async (appendData = false) => {
    if (!projectId) return; // Ensure projectId is set before making the request

    try {
      const res = await axios.get(
        `http://localhost:8080/v1/responses?projectId=${projectId}&skip=${skip}&take=${take}&filter=${filter}&getStats=${isStats}`,
        { withCredentials: true }
      );

      const { responses } = res.data;

      if (isStats) {
        const { stats } = res.data;
        setStats(stats);
      }
      setReviewData((prev) =>
        appendData ? [...prev, ...responses] : responses
      );
      setHasMore(responses.length === take);
      setIsStats(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    const storedProjectId = localStorage.getItem("projectId");
    if (storedProjectId) {
      setProject(storedProjectId);
    }
  }, []);

  useEffect(() => {
    fetchReviews(skip !== 0);
  }, [projectId, skip, filter]); // Refetch reviews when filter changes

  return (
    <DashboardLayout filter={filter} setFilter={setFilter}>
      <div className="w-[100%] flex flex-col gap-[1.25rem] justify-center items-center">
        {reviewData.length > 0 ? (
          <>
            {reviewData.map((item: { responseId: any }) => (
              <ReviewContainer key={item.responseId} data={item} />
            ))}

            {hasMore && (
              <button
                className="bg-backgroundOne rounded-[12px] px-[1rem] py-[0.5rem] mb-[2rem]"
                onClick={() => setSkip((prev) => prev + take)}
              >
                Load more
              </button>
            )}
          </>
        ) : (
          <span>No responses found</span>
        )}
      </div>
    </DashboardLayout>
  );
}
