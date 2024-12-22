"use client";
import DashboardLayout from "@/components/DashboardLayout";
import axios from "axios";
import { Star } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import withAuth from "@/components/WithAuth";
import TrustBadge from "@/components/TrustBadge";

interface ReviewData {
  user: any;
  name?: string;
  content: string;
  star?: number; // Assuming star is a part of the response
}

const IntegratePage: React.FC = () => {
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [projectId, setProject] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewsCount, setReviewsCount] = useState<number>(3); // Default to 3 reviews
  const [message, setMessage] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const storedProjectId = localStorage.getItem("projectId");
      setProject(storedProjectId);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/responses?projectId=${storedProjectId}`,
        {
          withCredentials: true,
        }
      );
      setReviewData(res.data.responses as ReviewData[]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    const reviewsHtml = `
    <div
  style={{
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
  }}
>
      ${reviewData
        .slice(0, reviewsCount)
        .map(
          (review, index) => `
          <div
            key="${index}"
            style={{
        minWidth: "15rem",
        width: "30%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        justifyContent: "start",
        alignItems: "start",
        backgroundColor: "#FAFAFA",
        border: "2px solid #E5E5E5",
        borderRadius: "8px",
        position: "relative",
      }}
          >
            <div style={{ display: "flex", gap: "0.15rem", marginRight: "auto" }}>
              ${Array.from({ length: review.star || 0 })
                .map(
                  () =>
                    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F4CE14" viewBox="0 0 256 256"><path d="M236.47,104.91a15.81,15.81,0,0,0-13.55-10.81l-58.64-4.92L141.5,34.35a15.91,15.91,0,0,0-27,0L91.72,89.18,33.08,94.1A15.81,15.81,0,0,0,19.53,104.91a15.34,15.34,0,0,0,3.35,16.41l44.19,39.4-12.68,56.95a15.33,15.33,0,0,0,5.89,15.85,15.74,15.74,0,0,0,16.58.82l52.14-29.68,52.14,29.68a15.74,15.74,0,0,0,16.58-.82,15.33,15.33,0,0,0,5.89-15.85l-12.68-56.95,44.19-39.4A15.34,15.34,0,0,0,236.47,104.91Z"></path></svg>`
                )
                .join("")}
            </div>

           <div style={{ display: "flex", flexDirection: "column", marginRight: "auto" }}>
        <h2 style={{ fontWeight: 500, color: "#45474B", fontSize: "1.1rem" }}>
          ${review.content}
        </h2>
        <span style={{ color: "#45474B", fontWeight: 300, marginTop: "0.5rem" }}>
          ${review.user.name || "Anonymous"}
        </span>
      </div>
          </div>
          `
        )
        .join("")}
    </div>
  `;

    const codeIntegratePage = `
  <div className="w-[100%] flex flex-wrap gap-[1rem] justify-center">
    ${reviewsHtml}
  </div>
  <a href="/" className="p-2 rounded-[8px] bg-backgroundTwo text-textTwo">
    View more
  </a>
`;

    navigator.clipboard.writeText(codeIntegratePage.trim());
    toast.success("Code copied to clipboard!");
  };

  useEffect(() => {
    const website = localStorage.getItem("projectId") || null;
    if (website != null) {
      fetchReviews();
    } else {
      setMessage("Select project first!");
    }
  }, [projectId]);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const reviewsToShow = reviewData.slice(0, reviewsCount);

  return (
    <DashboardLayout>
      <div>
        {message ? (
          <div>{message}</div>
        ) : (
          <>
            <div className="relative bg-zinc-100 border-special border-backgroundTwo rounded-[12px] p-[1rem] flex flex-col items-center justify-center gap-[1rem]">
              {loading ? (
                <p>Loading...</p>
              ) : reviewsToShow.length > 0 ? (
                <div className="w-[100%] flex flex-wrap gap-[1rem] justify-center">
                  {reviewsToShow.map((review, index) => (
                    <div
                      key={index}
                      className="min-w-[15rem] md:w-[30%] flex-grow flex flex-col gap-[1rem] p-[1rem] justify-start items-start bg-zinc-50 border-[2px] border-zinc-200 rounded-[8px] relative"
                    >
                      <div className="flex gap-[0.15rem] mr-auto">
                        {Array.from(
                          { length: review.star || 0 },
                          (_, index) => (
                            <Star
                              key={index}
                              size={32}
                              weight="fill"
                              className="text-[#F4CE14]"
                            />
                          )
                        )}
                      </div>

                      <div className="flex flex-col mr-auto">
                        <h2 className="font-medium text-[#45474B] text-[1.1rem]">
                          {review.content}
                        </h2>
                        <span className="text-[#45474B] font-light mt-[0.5rem]">
                          {review.user.name || "Anonymous"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No reviews available.</p>
              )}

              <div className="absolute bottom-2 right-2 flex gap-2 text-xs">
                <select
                  value={reviewsCount}
                  onChange={(e) => setReviewsCount(Number(e.target.value))}
                  className="px-2 py-1 rounded-sm bg-zinc-200 border-[1px] border-zinc-300 bg-opacity-70 text-zinc-600"
                >
                  <option value={3}>3 Reviews</option>
                  <option value={6}>6 Reviews</option>
                </select>
                <button
                  onClick={handleCopyCode}
                  className=" px-2 py-1 rounded-sm bg-zinc-200 border-[1px] border-zinc-300 bg-opacity-70 text-zinc-600"
                >
                  Copy Code
                </button>
              </div>
            </div>

            {/* API Info Section */}
            <div className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-lg mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                API Information
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Use the following API key and URL to fetch reviews for your
                project:
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm">
                    API Key:<span className="pl-2">{projectId} </span>
                  </span>
                  <button
                    onClick={() =>
                      handleCopyText(`${process.env.NEXT_PUBLIC_BACKEND_URL}`)
                    }
                    className="text-sm text-blue-500 underline"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm">
                    API URL:{" "}
                    <span className="pl-2">{`https://trustflag.in/responses?projectId=${projectId}`}</span>{" "}
                  </span>
                  <button
                    onClick={() =>
                      handleCopyText(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/responses?projectId=${projectId}`
                      )
                    }
                    className="text-sm text-blue-500 underline"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <hr className="my-[1rem] bg-zinc-400" />

            <TrustBadge />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuth(IntegratePage);
