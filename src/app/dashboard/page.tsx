"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MainBar from "./MainBar";
import axios from "axios";
import ParentLayout from "@/components/ParentLayout";
import ChildLayout from "@/components/ChildLayout";
import PageLayout from "@/components/PageLayout";

function DashboardPage() {
  const [reviewData, setReviewData] = useState<any[]>([]); // Use any[] for type-safety
  const [projectId, setProject] = useState<string | null>(null); // Initialize null
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [skip, setSkip] = useState(0);
  const [take] = useState(5); // Fixed amount per request
  const [hasMore, setHasMore] = useState(true); // To handle "load more" button visibility

  const fetchReviews = async (appendData = false) => {
    if (!projectId) return; // Ensure projectId is set before making the request
    // setLoading(true);
    
    try {
      const res = await axios.get(
        `http://localhost:8080/v1/responses?projectId=${projectId}&skip=${skip}&take=${take}&filter=${filter}`,
        { withCredentials: true }
      );

      const { responses } = res.data;
      setReviewData((prev) =>
        appendData ? [...prev, ...responses] : responses
      );
      setHasMore(responses.length === take); // If less than `take` items are fetched, no more data is available
      // setLoading(false);
    } catch (error) {
      console.log("Error fetching reviews:", error);
      // setLoading(false);
    }
  };

  // Fetch projectId from localStorage
  useEffect(() => {
    setLoading(true)
    const storedProjectId = localStorage.getItem("projectId");
    if (storedProjectId) {
      setProject(storedProjectId);
    }
    setLoading(false)
  }, []);

  // Fetch reviews when projectId, skip, or filter changes
  useEffect(() => {
    fetchReviews(skip !== 0); // Append data if skip > 0 (load more), otherwise reset
  }, [projectId, skip, filter]);

  // Reset skip to 0 when filter changes
  const handleFilterChange = (newFilter: string) => {
    setSkip(0); // Reset skip
    setFilter(newFilter); // Set new filter
  };

  return (
    <ParentLayout>
      <Navbar />
      <ChildLayout>
        <SideBar
          setProjectId={setProject}
          filter={filter}
          setFilter={handleFilterChange}
        />
        {!loading && projectId && reviewData ? (
          <PageLayout>
            <MainBar
              data={reviewData}
              projectId={projectId}
              setSkip={setSkip}
              hasMore={hasMore} // Disable "load more" if no more data
            />
          </PageLayout>
        ): (<>Loading...</>)}
        {/* {loading && <div>Loading...</div>} */}
      </ChildLayout>
    </ParentLayout>
  );
}

export default DashboardPage;
