import React from "react";

function PublicNavbar() {
  return (
    <div className="w-[100%] flex justify-between py-[1rem]">
      <div className="flex items-center gap-2">
        <img className="w-8 h-8" src="/images/logo.svg" alt="TrustFlag Logo" />
        <h1 className="text-2xl font-bold text-primary text-[#45474B] pb-[0.25rem]">
          TrustFlag.in
        </h1>
      </div>
      <a
        href="/"
        className="px-[1rem] py-[0.5rem] rounded-[8px] bg-[#45474B] border-[2px] border-[#8e9195] text-white"
      >
        For Business
      </a>
    </div>
  );
}

export default PublicNavbar;
