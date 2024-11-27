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
import { Checkbox } from "@/components/ui/checkbox";
import PublicNavbar from "@/components/PublicNavbar";
import { Button } from "@/components/ui/button";

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
    <div className="container mx-auto max-w-[80rem] p-[1rem] sm:p-[2rem] md:p-[4rem] flex flex-col gap-[1rem] relative bg-zinc-50">
      <div className="fixed z-50 bottom-6 right-4">
        <Button
          className="bg-[#379777] text-white hover:bg-[#379777]/90"
          asChild
        >
          <a
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/feedback/`}
            target="_blank"
          >
            Write a Review
          </a>
        </Button>
      </div>
      <PublicNavbar />
      {companyData && (
        <>
          {/* Company Info */}
          <div className="bg-[#379777] p-[0.75rem] md:p-[2rem] rounded-[16px] mt-[5rem] sm:mt-[4rem] md:mt-[2rem]">
            <div className="flex sm:flex-row justify-between items-center text-[#F5F7F8]">
              <div className="flex items-center gap-[0.5rem]  md:gap-[1rem]">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-zinc-100 rounded-full overflow-hidden flex items-center justify-center">
                  {companyData.logoUrl ? (
                    <img
                      src={companyData.logoUrl || ""}
                      alt={`${companyData.name} logo`}
                      className="w-10 h-10 sm:w-16 sm:h-16 object-cover"
                    />
                  ) : (
                    <span className="text-[1.1rem] font-bold text-[#45474B]">
                      {companyData.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <a
                    href={`https://${companyData.website}`}
                    target="_blank"
                    className="text-[1rem] sm:text-3xl font-bold flex gap-[0.5rem]"
                  >
                    {companyData.name}{" "}
                    <span>
                      <ArrowSquareOut size={16} />
                    </span>
                  </a>
                  <p className="text-[0.75rem] sm:text-[1rem] font-light">
                    {companyData.country} • {companyData.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) =>
                      i < (companyData.avgRating || 0) ? (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 sm:h-8 sm:w-8 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ) : (
                        <span key={i} className="text-[21px] sm:text-[29px]">
                          <Star
                            //size={window.innerWidth >= 640 ? 28 : 21} // Dynamically set size
                            fill={
                              i < (companyData.avgRating || 0)
                                ? "#FFD700"
                                : "#ccc"
                            }
                          />
                        </span>
                      )
                    )}
                  </div>
                  <div className="text-end text-xl sm:text-3xl font-bold">
                    {companyData.avgRating || 0}{" "}
                    <span className="text-xs sm:text-sm font-extralight">
                      {companyData.totalReviews} reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Reviews */}
          <div className="flex flex-col md:flex-row gap-8 sm:p-[1rem] ">
            <div className="w-full md:w-1/4 pl-[1rem]">
              <h2 className="text-xl font-semibold mb-4">Filter Reviews</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="all"
                    //checked={selectedRatings.length === 0}
                    //onCheckedChange={() => setSelectedRatings([])}
                  />
                  <label
                    htmlFor="all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    All Ratings
                  </label>
                </div>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      //checked={selectedRatings.includes(rating)}
                      onCheckedChange={() => handleFilterChange(rating)}
                    />
                    <label
                      htmlFor={`rating-${rating}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {rating} {rating === 1 ? "Star" : "Stars"}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-3/4 relative">
              <div className="relative h-[600px] overflow-y-auto pr-4 mb-16 bg-zinc-100 rounded-[16px] p-[1rem]">
                <div className="space-y-4">
                  {reviews.length == 0
                    ? "No responses"
                    : reviews.map((review) => (
                        <div
                          key={review.responseId}
                          className="border p-4 rounded-lg bg-zinc-50"
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
                                <CheckCircle
                                  size={16}
                                  className="text-[#379777]"
                                />
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {review.email || "No email provided"}
                              </div>
                            </div>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) =>
                              i < (review.star || 0) ? (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 sm:h-8 sm:w-8 text-yellow-400"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ) : (
                                <span
                                  key={i}
                                  className="text-[21px] sm:text-[29px]"
                                >
                                  <Star
                                    //size={window.innerWidth >= 640 ? 28 : 21} // Dynamically set size
                                    fill={
                                      i < (review.star || 0)
                                        ? "#FFD700"
                                        : "#ccc"
                                    }
                                  />
                                </span>
                              )
                            )}
                          </div>
                          <p className="mb-2">{review.content}</p>
                          <div className="text-sm text-muted-foreground mb-2">
                            Reviewed on{" "}
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                </div>

                {reviews.length < (companyData.totalReviews || 0) && (
                  <Button
                    className="px-2 py-1 mt-4 bg-zinc-50 rounded border-[1px] border-zinc-200 hover:bg-zinc-100 text-[#45474B]"
                    onClick={loadMoreReviews}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
