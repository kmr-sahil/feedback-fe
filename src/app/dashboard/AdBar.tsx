import React from "react";

function AdBar() {
  return (
    <div className="w-[20%] flex flex-col gap-[1.5rem]">
      <div className="flex justify-between rounded-[12px] px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium">
        <h3>PotionAI</h3>
        <img src="/images/dropdown.svg" alt="" />
      </div>
    </div>
  );
}

export default AdBar;
