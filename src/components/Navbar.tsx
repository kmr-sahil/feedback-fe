import React from "react";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-[1rem]">
      <img className="w-[12rem]" src="/images/feedback-logoFull.svg" alt="" />
      <div className="flex gap-[1rem]">
        <div className="flex justify-between rounded-[12px] px-[0.75rem] py-[8px] bg-[#4747FF] bg-opacity-[8%] font-medium">
          <img src="/images/bell.svg" alt="bell" />
        </div>
        <div className="flex justify-between rounded-[12px] px-[0.75rem] py-[8px] bg-[#4747FF] bg-opacity-[8%] font-medium">
          <img src="/images/profile.svg" alt="bell" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
