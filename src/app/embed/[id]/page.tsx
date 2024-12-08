"use client";
import { Star } from "@phosphor-icons/react";
import axios from "axios";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState, useCallback } from "react";

// Define an interface for the feedback data
interface FeedbackData {
  star: number;
  name?: string; // Name could be optional, as you fallback to "Anonymous"
  content: string;
}

const TrustFlagFeedback = () => {
  const pathName = usePathname();
  const id = pathName.split("/")[2]; // Ensure this is the correct part of the URL you're splitting
  console.log(id);

  // Use the FeedbackData interface for typing the state
  const [data, setData] = useState<FeedbackData | null>(null); // Initialize with `null` to handle loading state

  const fetchFeedback = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/responses/single?responseId=${id}`
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
    <div className="">
      <Script src="https://unpkg.com/iframe-resizer/js/iframeResizer.contentWindow.min.js" />
      <div className="w-[100%] h-auto flex flex-col gap-[1rem] p-[1rem] justify-center items-center bg-zinc-50 border-[2px] border-zinc-200 rounded-[8px] relative">
        <img
          className="absolute right-5 top-5 w-[1.5rem]"
          src="/images/logo.svg"
          alt="logo"
        ></img>
        <div className="flex gap-[0.15rem] mr-auto">
          {/* Generate an array of length `data.star` and render stars */}
          {Array.from({ length: data.star }, (_, index) => (
            <Star
              key={index}
              size={32}
              weight="fill"
              className="text-[#F4CE14]"
            />
          ))}
        </div>

        <div className="flex flex-col mr-auto">
          <h2 className="font-medium text-[#45474B] text-[1.1rem]">
            {data.content}
          </h2>
          <span className="text-[#45474B] font-light mt-[0.5rem]">
            {data.name || "Anonymous"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustFlagFeedback;
