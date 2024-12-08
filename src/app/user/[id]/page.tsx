"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";

// Define types for User and Review
interface User {
  name?: string;
}

interface Review {
  responseId: string;
  star?: number;
  content: string;
  createdAt: string;
}

function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false); // New state to handle errors
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Extract userId from the URL in the browser
    const id = window.location.pathname.split("/").pop() || null;
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return; // Wait for userId to be set

    // Fetch user details
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`,
          { withCredentials: true }
        );
        setUser(response.data);
      } catch (error: any) {
        if (
          error.response?.status === 404 ||
          error.response?.data?.message === "user not found"
        ) {
          setError(true); // Mark as error
        } else {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (!userId || error) return; // Skip fetching reviews if there's an error

    // Fetch user reviews
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/reviews/${userId}`,
          {
            withCredentials: true,
            params: { page: currentPage, limit: 10 },
          }
        );
        setReviews(response.data.responses);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId, currentPage, error]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <h1 className="text-2xl font-semibold text-zinc-400">
          404 Error: User not found. Please return back later.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-[75rem] mx-auto p-[1rem] flex flex-col gap-[2rem] relative">
      <Navbar />
      {/* User Info */}
      <div className="bg-[#379777] rounded-[12px] border-[2px] border-zinc-200 flex gap-[1rem] items-center p-4 mt-[5rem]">
        <span className="text-zinc-200 font-semibold w-10 h-10 sm:w-20 sm:h-20 bg-zinc-50 rounded-full flex justify-center items-center">
          {user?.name?.charAt(0)}
        </span>
        <div className="flex flex-col">
          <h2 className="text-[1.1rem] sm:text-[1.5rem] font-semibold text-zinc-50">
            {user ? user.name : "Loading..."}
          </h2>
        </div>
      </div>

      {/* Reviews */}
      <div className="p-[1rem] flex flex-col gap-[1rem]">
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No responses</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.responseId}
              className="border p-4 rounded-lg bg-zinc-50"
            >
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-2 text-[#45474B]">
                  <span className="text-white font-semibold">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">{user?.name}</span>
                  </div>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) =>
                  i < (review.star || 0) ? (
                    <Star
                      key={i}
                      className="text-yellow-400"
                      weight="fill"
                      size={24}
                    />
                  ) : (
                    <Star key={i} className="text-gray-300" size={24} />
                  )
                )}
              </div>
              <p className="mb-2">{review.content}</p>
              <div className="text-sm text-muted-foreground mb-2">
                Reviewed on {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
