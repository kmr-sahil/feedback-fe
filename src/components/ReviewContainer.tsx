import React from "react";

function ReviewContainer({ data }: any) {
  return (
    <div
      key={data.responseId}
      className="flex flex-col bg-[#4747FF] bg-opacity-[8%] rounded-[12px] px-[1.2rem] py-[1rem] gap-[1rem]"
    >
      <div className="flex justify-between">
        <div className="flex gap-[0.5rem] items-center">
          <span className="w-2 h-2 rounded-full bg-pink-600"></span>
          <p className="text-pink-600">{data?.type}</p>
        </div>
        <img className="" src="/images/bookmark.svg" alt="" />
      </div>
      <div className="flex flex-col text-textColor">
        <h3 className="font-medium">Sahil Kumar</h3>
        <p className="text-[12px] font-light">11.sahil.kmr@gmail.com</p>
      </div>
      <p className="text-textColor">{data?.content}</p>
      <div className="flex justify-between">
        <div className="flex gap-[0.25rem]">
          <img className="w-[14px]" src="/images/star.svg" alt="" />
          <img className="w-[14px]" src="/images/star.svg" alt="" />
          <img className="w-[14px]" src="/images/star.svg" alt="" />
        </div>

        <p className="text-[12px] font-light">10 hours ago</p>
      </div>
    </div>
  );
}

export default ReviewContainer;
