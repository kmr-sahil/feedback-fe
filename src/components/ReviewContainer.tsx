"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Info, ShareNetwork, Star } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import DownloadImg from "./DownloadImg";

// Extend Day.js with the relativeTime plugin
dayjs.extend(relativeTime);

function ReviewContainer({ data }: any) {
  const [isDownload, setIsDownload] = useState("");
  const [isVisible, setIsVisible] = useState(""); // State to control visibility of the absolute div

  // Parse the createdAt date string
  const createdAt = dayjs(data.createdAt);

  // Determine if the date is less than 24 hours ago
  const isLessThan24HoursAgo = dayjs().diff(createdAt, "hour") < 24;

  // Function to copy the link to clipboard
  const copyClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Embed link copied to clipboard!"); // Optional feedback
  };

  return (
    <div
      key={data.responseId}
      className="w-[100%] flex flex-col bg-zinc-50 border-2 border-zinc-200 rounded-[12px] p-[1.5rem] gap-[1rem] text-zinc-700"
    >
      {isDownload && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <DownloadImg id={isDownload} onClose={() => setIsDownload("")} />
        </div>
      )}
      <div className="flex gap-[0.5rem] items-center">
        <span className="w-2 h-2 rounded-full bg-textTwo"></span>
        <p className="text-textTwo text-[0.75rem]">{data?.type}</p>
      </div>
      <div className="flex flex-col gap-[0.25rem]">
        <div className="font-semibold text-zinc-700 flex-col gap-[1rem]">
          <div className="flex mb-2 items-center ml-[-0.25rem]">
            {[...Array(5)].map((_, i) =>
              i < (data?.star || 0) ? (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:h-6 sm:w-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ) : (
                <span key={i} className="text-[16px] sm:text-[21px]">
                  <Star
                    //size={window.innerWidth >= 640 ? 28 : 21} // Dynamically set size
                    fill={i < (data?.star || 0) ? "#FFD700" : "#ccc"}
                  />
                </span>
              )
            )}
          </div>
          <h3>{data.user.name ? data.user.name : "Anonymous"} </h3>
        </div>
        <p className="text-[16px]">{data?.content}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-[12px] font-light text-textTwo">
          {isLessThan24HoursAgo
            ? createdAt.fromNow() // Shows "12 hours ago" for recent dates
            : createdAt.format("YYYY-MM-DD")}{" "}
          {/* Shows date in YYYY-MM-DD format for older dates */}
        </p>
        <div className="flex gap-[1rem] items-center">
          <span
            className="relative flex gap-[1rem] text-textOne cursor-pointer"
            onClick={() => setIsVisible(isVisible == "info" ? "" : "info")}
          >
            <Info size={18} />
            {isVisible == "info" && (
              <div className="absolute bottom-[1rem] right-0 flex flex-col justify-start bg-zinc-100 rounded-[8px] p-[0.5rem] shadow-md text-xs whitespace-nowrap">
                <span>IP Address : {data.ip}</span>
                <span>Location : {data.location}</span>
                <span>
                  Date of exp : {dayjs(data.doe).format("YYYY-MM-DD")}
                </span>
              </div>
            )}
          </span>
          <span
            className="relative flex gap-[1rem] text-textOne cursor-pointer"
            onClick={() => setIsVisible(isVisible == "share" ? "" : "share")}
          >
            <ShareNetwork size={16} />
            {isVisible == "share" && (
              <div className="absolute bottom-[1rem] right-0 flex flex-col justify-start bg-zinc-100 rounded-[8px] p-[0.5rem] shadow-md">
                <span
                  className="hover:bg-zinc-200 rounded-[6px] text-[12px] p-[0.5rem] cursor-pointer"
                  onClick={() =>
                    copyClipboard(`
<script type="text/javascript" src="https://testimonial.to/js/iframeResizer.min.js"></script>
<iframe
  id="my-embed-widget"
  src="${process.env.NEXT_PUBLIC_FRONTEND_URL}/embed/${data.responseId}"
  frameborder="0"
  scrolling="no"
  width="100%"
  style="border: none; border-radius: 8px"
></iframe>
<script type="text/javascript">
  iFrameResize({ log: false, checkOrigin: false }, "#my-embed-widget");
</script>
</iframe>`)
                  }
                >
                  Get embed link
                </span>
                <span
                  className="hover:bg-zinc-200 rounded-[6px] text-[12px] p-[0.5rem] whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    console.log(data.responseId); // Debug log
                    setIsDownload(data.responseId.toString());
                  }}
                >
                  Download as an Image
                </span>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReviewContainer;
