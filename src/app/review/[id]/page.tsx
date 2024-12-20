"use client";

import {
  ArrowSquareOut,
  CheckCircle,
  Flag,
  ShareFat,
  Star,
} from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import CustomLoader from "@/components/CustomLoader";

// Interfaces for type safety
interface AdjustForm {
  isEmailReq: boolean;
  isNameInputReq: boolean;
  isNameReq: boolean;
}

interface Response {
  responseId: number;
  projectId: string;
  type: string;
  content: string;
  star: number;
  name?: string;
  email?: string;
  createdAt: string;
}

interface Project {
  projectId: string;
  userId: string;
  name: string;
  website: string;
  description?: string;
  logoUrl?: string;
  adjustForm: AdjustForm;
  totalReviews?: number;
  avgRating?: number;
  country?: string;
  category?: string;
  createdAt: string;
  responses: Response[];
}

interface ApiResponse {
  message: string;
  response: Project[];
}

export default function CompanyReviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const website = searchParams.get("website") || params.id;

  const [companyData, setCompanyData] = useState<Project | null>(null);
  const [reviews, setReviews] = useState<Response[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async (append = false) => {
    if (!website) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/review`,
        {
          params: { website, rating: ratingFilter || "", page },
        }
      );
      const newReviews = res.data.response[0]?.responses || [];
      if (append) {
        setReviews((prev) => [...prev, ...newReviews]); // Append to existing reviews
      } else {
        setReviews(newReviews); // Replace existing reviews
      }
      setCompanyData(res.data.response[0]);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews(); // Initial fetch or when filter changes
  }, [website, ratingFilter]);

  const handleFilterChange = (rating: number | null) => {
    setRatingFilter(rating);
    setPage(1); // Reset to the first page when changing filter
    setReviews([]);
    fetchReviews(false); // Replace reviews with filtered ones
  };

  const loadMoreReviews = () => {
    setPage((prev) => prev + 1); // Increment the page count
    fetchReviews(true); // Fetch and append new reviews
  };

  if (!website) {
    return (
      <div className="container mx-auto p-4">No website parameter provided</div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col gap-[1rem]">
      {companyData && (
        <>
          {/* Company Info */}
          <div className="bg-[#379777] p-[1rem] rounded-[16px]">
            <h1 className="text-end text-xl font-bold text-[#F4CE14] pr-[1rem]">
              TrustFlag.in
            </h1>

            <div className="flex flex-col md:flex-row justify-between items-center text-[#F5F7F8]">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-blue-500 rounded-full mr-4 overflow-hidden">
                  <img
                    src={companyData.logoUrl || ""}
                    alt={`${companyData.name} logo`}
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <div>
                  <a
                    href={`https://${companyData.website}`}
                    target="_blank"
                    className="text-3xl font-bold flex gap-[0.5rem]"
                  >
                    {companyData.name}{" "}
                    <span>
                      <ArrowSquareOut size={16} />
                    </span>
                  </a>
                  <p className="">
                    {companyData.country} • {companyData.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) =>
                      i < (companyData.avgRating || 0) ? (
                        <svg
                        key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ) : (
                        <Star
                          key={i}
                          size={26}
                          fill={
                            i < (companyData.avgRating || 0)
                              ? "#FFD700"
                              : "#ccc"
                          }
                        />
                      )
                    )}
                  </div>
                  <div className="text-3xl font-bold">
                    {companyData.avgRating || 0}{" "}
                    <span className="text-sm font-extralight">
                      {companyData.totalReviews} reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Reviews */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
              <h2 className="text-xl font-semibold mb-4">Filter Reviews</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value="all"
                    className="mr-2"
                    defaultChecked
                    onChange={() => handleFilterChange(null)}
                  />
                  All Ratings
                </label>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      className="mr-2"
                      onChange={() => handleFilterChange(rating)}
                    />
                    {rating} {rating === 1 ? "Star" : "Stars"}
                  </label>
                ))}
              </div>
            </div>

            <div className="w-full md:w-3/4">
              <div className="mb-8">
                <a
                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/feedback/${companyData.projectId}`}
                  target="_blank"
                  className="bg-[#379777] text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Write a Review
                </a>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.responseId}
                    className="border p-4 rounded-lg"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-2 text-[#45474B]">
                        <span className="text-white font-semibold">
                          {review.name?.charAt(0) || "N/A"}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">
                            {review.name || "Anonymous"}
                          </span>
                          {/* <CheckCircle size={32} /> */}
                        </div>
                        <div className="text-sm ">
                          {review.email || "No email provided"}
                        </div>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) =>
                        i < (companyData.avgRating || 0) ? (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-[#379777]"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ) : (
                          <Star
                            key={i}
                            size={26}
                            fill={
                              i < (companyData.avgRating || 0)
                                ? "#FFD700"
                                : "#ccc"
                            }
                          />
                        )
                      )}
                    </div>
                    <p className="mb-2">{review.content}</p>
                    <div className="text-sm mb-2">
                      Reviewed on{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                    {/* <div className="flex space-x-4">
                        <button className="flex items-center text-gray-600 hover:text-gray-800">
                          <ShareFat size={32} />
                          Share
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-gray-800">
                          <Flag size={32} />
                          Report
                        </button>
                      </div> */}
                  </div>
                ))}
              </div>

              {reviews.length < (companyData.totalReviews || 0) && (
                <button
                  className="bg-zinc-300 px-4 py-2 rounded hover:bg-zinc-400 transition-colors mt-4"
                  onClick={loadMoreReviews}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
