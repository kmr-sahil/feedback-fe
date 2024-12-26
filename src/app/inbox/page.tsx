"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import axios from "axios";
import ReviewContainer from "@/components/ReviewContainer";
import DashboardLayout from "@/components/DashboardLayout";
import CustomLoader from "../../components/CustomLoader";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import toast from "react-hot-toast";
import withAuth from "@/components/WithAuth";
import { useSearchParams } from "next/navigation";

const InboxPage = () => {
  const searchParams = useSearchParams();
  const [reviewData, setReviewData] = useState<any[]>([]);
  const [projectId, setProject] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [take] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [isStats, setIsStats] = useState(true);
  const [filter, setFilter] = useState<any>(""); // Move the filter state here
  const [stats, setStats] = useState({
    issueCount: 0,
    likedCount: 0,
    suggestionCount: 0,
    totalResponses: 0,
  });
  const [loading, setLoading] = useState(true); // Load state

  // Memoize fetchReviews using useCallback
  const fetchReviews = useCallback(
    async (appendData = false) => {
      if (!projectId) return; // Ensure projectId is set before making the request
      setLoading(true); // Start loading

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/responses?projectId=${projectId}&skip=${skip}&take=${take}&filter=${filter}&getStats=${isStats}`,
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
      } finally {
        setLoading(false); // Stop loading after the request is done
      }
    },
    [projectId, skip, take, filter, isStats] // Add dependencies
  );

  useEffect(() => {
    const loginDate = localStorage.getItem("isLogin");

    if (loginDate) {
      setLoading(true);
      const storedProjectId = localStorage.getItem("projectId");
      if (storedProjectId) {
        setProject(storedProjectId);
      }
      setLoading(false);
    } else {
      console.log("No login date found.");
      toast.error("Log in again please");
      window.location.href = "/signin";
    }
  }, []);

  useEffect(() => {
    const filterValue = searchParams.get("filter");

    // Correct the capitalization and handle null/undefined cases
    if (filterValue && filterValue !== "all") {
      setFilter(filterValue.charAt(0).toUpperCase() + filterValue.slice(1));
    } else {
      setFilter("");
    }
  }, [searchParams]);

  useEffect(() => {
    fetchReviews(skip !== 0);
  }, [projectId, skip, filter, fetchReviews]); // Add fetchReviews as a dependency

  return (
    <Suspense fallback={<CustomLoader />}>
    <DashboardLayout>
      <div className=" w-[100%] flex flex-col gap-[1.25rem]">
        <div className="flex gap-[1rem] items-center justify-start">
          <CustomInput label={""} type={"text"} placeholder="Search" />
          <CustomButton label={"Filter"} type="secondary" />
        </div>

        <div className="w-[100%] flex flex-col gap-[1.25rem] justify-center items-center">
          {loading && reviewData.length == 0 ? (
            <CustomLoader /> // You can use a custom loader component
          ) : (
            <>
              {reviewData.length > 0 ? (
                <>
                  {reviewData.map((item: { responseId: any }) => (
                    <ReviewContainer key={item.responseId} data={item} />
                  ))}
                  {hasMore && (
                    <button
                      className="bg-backgroundOne border-[2px] border-zinc-200 rounded-[8px] px-[1rem] py-[0.5rem] mb-[2rem] text-sm "
                      onClick={() => setSkip((prev) => prev + take)}
                    >
                      {loading ? "Loading..." : "Load more"}
                    </button>
                  )}
                </>
              ) : (
                <p>No responses here</p>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
    </Suspense>
  );
};

export default withAuth(InboxPage);
