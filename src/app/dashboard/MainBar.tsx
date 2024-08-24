import React from "react";
import ReviewContainer from "@/components/ReviewContainer";

function MainBar({ data }: any) {
  return (
    <div className="flex-grow w-[40%] flex flex-col gap-[1.25rem]">
      {data && data.length > 0 ? (
        data.map((item: { responseId: any }) => (
          <ReviewContainer key={item.responseId} data={item} />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          No responses yet. Be the first to leave a review!
        </div>
      )}
    </div>
  );
}

export default MainBar;
