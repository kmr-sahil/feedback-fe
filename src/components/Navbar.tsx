"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { Bell, User } from "@phosphor-icons/react";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-[1rem]">
      <img className="w-[12rem]" src="/images/feedback-logoFull.svg" alt="" />
      <div className="flex gap-[1rem] cursor-pointer text-textOne">
        <div className="flex justify-center items-center rounded-[8px] px-[0.75rem] py-[10px] bg-backgroundOne border-special border-backgroundTwo">
          <ThemeSwitch />
        </div>
        <div className="flex justify-center items-center rounded-[8px] px-[0.75rem] py-[10px] bg-backgroundOne border-special border-backgroundTwo">
          <Bell size={16} weight="bold" />
        </div>
        <div className="flex justify-center items-center rounded-[8px] px-[0.75rem] py-[10px] bg-backgroundOne border-special border-backgroundTwo">
          <User size={16} weight="bold" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
