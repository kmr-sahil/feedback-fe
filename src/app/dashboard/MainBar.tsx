import React from "react";
import ReviewContainer from "@/components/ReviewContainer";

function MainBar() {
  return (
    <div className="flex-grow w-[40%] flex flex-col gap-[1.25rem]">
      <ReviewContainer></ReviewContainer>
      <ReviewContainer></ReviewContainer>

    </div>
  );
}

export default MainBar;
