"use client";
import { Star } from "@phosphor-icons/react";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

// Define an interface for the feedback data
interface FeedbackData {
  star: number;
  name?: string; // Name could be optional, as you fallback to "Anonymous"
  content: string;
}

const SureefyFeedback = () => {
  const pathName = usePathname();
  const id = pathName.split("/")[1]; // Ensure this is the correct part of the URL you're splitting
  console.log(id);

  // Use the FeedbackData interface for typing the state
  const [data, setData] = useState<FeedbackData | null>(null); // Initialize with `null` to handle loading state

  const fetchFeedback = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sureefy?responseId=${id}`
      );
      console.log(response.data.response);

      setData(response.data.response); // Set the response data
    } catch (error) {
      console.log(error);
    }
  }, [id]); // Memoize the function and ensure it updates when `id` changes

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]); // Use the memoized fetchFeedback as a dependency

  if (!data) {
    return <div></div>; // Handle loading state before data is fetched
  }

  return (
    <div className="w-[100%] h-auto flex flex-col gap-[1rem] p-[1rem] justify-center items-center">
      <div className="flex gap-[0.15rem] mr-auto">
        {/* Generate an array of length `data.star` and render stars */}
        {Array.from({ length: data.star }, (_, index) => (
          <Star
            key={index}
            size={24}
            weight="fill"
            className="text-yellow-300"
          />
        ))}
      </div>

      <div className="flex flex-col gap-[0.15rem] pb-[2rem] mr-auto">
        <h2 className="font-semibold text-zinc-400 text-[1.1rem]">
          {data.name || "Anonymous"}
        </h2>
        <span className="text-200">{data.content}</span>
      </div>
      <span className="px-[0.75rem] py-[0.25rem] rounded-[8px] bg-green-50 text-green-600 ml-auto text-sm font-semibold">trustko.in</span>
    </div>
  );
};

export default SureefyFeedback;
