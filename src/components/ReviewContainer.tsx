import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ShareNetwork } from "@phosphor-icons/react";
import { toast } from "sonner";

// Extend Day.js with the relativeTime plugin
dayjs.extend(relativeTime);

function ReviewContainer({ data }: any) {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility of the absolute div

  // Parse the createdAt date string
  const createdAt = dayjs(data.createdAt);

  // Determine if the date is less than 24 hours ago
  const isLessThan24HoursAgo = dayjs().diff(createdAt, "hour") < 24;

  // Function to copy the link to clipboard
  const copyClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    toast("Embed link copied to clipboard!"); // Optional feedback
  };

  return (
    <div
      key={data.responseId}
      className="w-[100%] flex flex-col bg-backgroundOne border-special border-backgroundTwo rounded-[12px] p-[1.5rem] gap-[1rem] text-textOne"
    >
      <div className="flex gap-[0.5rem] items-center">
        <span className="w-2 h-2 rounded-full bg-textTwo"></span>
        <p className="text-textTwo">{data?.type}</p>
      </div>
      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="font-medium text-textTwo">
          {data.name ? data.name : "Anonymous"}
        </h3>
        <p className="text-[16px]">{data?.content}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-[12px] font-light text-textTwo">
          {isLessThan24HoursAgo
            ? createdAt.fromNow() // Shows "12 hours ago" for recent dates
            : createdAt.format("YYYY-MM-DD")}{" "}
          {/* Shows date in YYYY-MM-DD format for older dates */}
        </p>
        <span
          className="relative flex gap-[1rem] text-textOne"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <ShareNetwork size={16} />
          {isVisible && (
            <div className="absolute bottom-[1rem] right-0 flex flex-col justify-start bg-backgroundTwo rounded-[8px] p-[0.5rem]">
              <span
                className="hover:bg-backgroundThree rounded-[6px] text-[14px] w-[8rem] p-[0.5rem]"
                onClick={() => 
                  copyClipboard(`<iframe src="http://localhost:3000/${data.responseId}" width="100%" frameborder="0" height="400px" scrolling="no" title="W3Schools Free Online Web Tutorials">
</iframe>`) 
                }
              >
                Get embed link
              </span>
              <span className="hover:bg-backgroundThree rounded-[6px] text-[10px] w-[8rem] p-[0.5rem]">
                More coming soon..
              </span>
            </div>
          )}
        </span>
      </div>
    </div>
  );
}

export default ReviewContainer;
