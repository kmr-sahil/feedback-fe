import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend Day.js with the relativeTime plugin
dayjs.extend(relativeTime);

function ReviewContainer({ data }: any) {
  // Parse the createdAt date string
  const createdAt = dayjs(data.createdAt);

  // Determine if the date is less than 24 hours ago
  const isLessThan24HoursAgo = dayjs().diff(createdAt, "hour") < 24;

  return (
    <div
      key={data.responseId}
      className="flex flex-col bg-backgroundOne border-special border-backgroundTwo rounded-[12px] p-[1.5rem] gap-[1rem] text-textOne"
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
      </div>
    </div>
  );
}

export default ReviewContainer;
