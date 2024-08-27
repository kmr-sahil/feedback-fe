"use client";
import React from "react";

function Navbar() {
  const handleThemeToggle = () => {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme); // Update localStorage
    document.body.classList.toggle("dark"); // Toggle the theme class
    document.body.classList.toggle("light");
  };
  return (
    <div className="flex justify-between items-center px-[1rem]">
      <img className="w-[12rem]" src="/images/feedback-logoFull.svg" alt="" />
      <div className="flex gap-[1rem]">
        <div
          className="flex justify-between rounded-[12px] px-[0.75rem] py-[8px] bg-[#4747FF] bg-opacity-[8%] font-medium cursor-pointer"
          onClick={handleThemeToggle}
        >
          Toggle Mode
        </div>
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
