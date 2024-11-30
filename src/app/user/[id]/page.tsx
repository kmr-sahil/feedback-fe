"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function UserPage() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const userId = window.location.pathname.split("/").pop(); // Extract userId from URL

  useEffect(() => {
    // Fetch user details
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`,
          { withCredentials: true }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    // Fetch user reviews
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/reviews`,
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
  }, [userId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-[75rem] mx-auto p-[1rem] flex flex-col gap-[2rem]">
      {/* User Info */}
      <div className="bg-zinc-50 rounded-[12px] border-[2px] border-zinc-200 flex items-center p-4">
        <img src="" alt="" className="w-20 h-20 rounded-full mr-4" />
        <div className="flex flex-col">
          <h2 className="text-[1.1rem] sm:text-[1.5rem] font-semibold">
            {user ? user.name : "Loading..."}
          </h2>
          <h5 className="text-[0.9rem] sm:text-[1rem] ">Location</h5>
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
                    {review.name?.charAt(0) || "N/A"}
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">
                      {review.name || "Anonymous"}
                    </span>
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
                    <span key={i} className="text-[21px] sm:text-[29px]">
                      <Star
                        fill={i < (review.star || 0) ? "#FFD700" : "#ccc"}
                      />
                    </span>
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
