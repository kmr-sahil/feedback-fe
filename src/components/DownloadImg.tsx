"use client";
import { Star, X } from "@phosphor-icons/react";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toPng } from "html-to-image";

function DownloadImg({ id, onClose }: any) {
  // Use the FeedbackData interface for typing the state
  const [data, setData] = useState<any>(null); // Initialize with `null` to handle loading state
  const [size, setSize] = useState("");

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

  const handleDownload = () => {
    const node = document.getElementById("preview"); // Ensure the div has an id
    if (!node) return;

    toPng(node)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "feedback-image.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to download image:", err);
      });
  };

  const sizeMapping: Record<string, string> = {
    "1": "aspect-square", // 1:1
    "2": "aspect-[3/4]", // 3:4
    "3": "aspect-[4/3]", // 4:3
  };

  return (
    <div className="flex">
      <div className="flex flex-col p-[1rem] rounded-[12px] border-zinc-200 border-[2px] relative bg-zinc-50 text-zinc-700 gap-[1rem] h-[40rem] overflow-y-scroll">
        <button
          className="absolute top-2 right-2  px-2 py-1 rounded"
          onClick={onClose}
        >
          <X />
        </button>
        <h1 className="text-2xl font-semibold">Configure and Download</h1>
        {/* Inputs */}
        <div className="flex justify-between items-center">
          <div className="flex gap-[1rem] items-center justify-start">
            <label className="block font-medium mb-2">Choose Size:</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border rounded px-4 py-2 w-[10rem]"
            >
              <option value="1">Default</option>
              <option value="2">Square</option>
              <option value="3">Narrow</option>
            </select>
          </div>
          {/* Download Button */}
          <div className="text-center">
            <button
              onClick={handleDownload}
              className="bg-[#379777] text-white px-6 py-2 rounded hover:bg-opacity-75 text-[14px]"
            >
              Download Image
            </button>
          </div>
        </div>

        {/* preview*/}
        <div className="w-[45rem] bg-zinc-100 rounded-[12px] flex justify-center p-[1rem]">
          <div
            id="preview"
            style={{
              width: size == "2" ? "25rem" : size == "3" ? "18rem" : "100%",
            }}
            className={`flex justify-center items-center bg-zinc-50 border-[2px] border-zinc-200 rounded-[8px] relative`}
          >
            {/* set width /aspect ratio according to the input */}
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
                  {data.user.name || "Anonymous"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadImg;
