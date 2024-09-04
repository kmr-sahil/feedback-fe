"use client";
import React, { Suspense, useState } from "react";
import Sidebar from "./sideBar";
import Navbar from "@/components/Navbar";
import Theme from "./SubPages/theme";
import Profile from "./SubPages/profile";

const SettingPage = () => {
  const [type, setType] = useState("")
  return (
    <Suspense>
      <div className="max-w-[80rem] mx-auto mt-[2rem] relative">
        <Navbar />
        <div className="flex gap-[2rem]">
          <Sidebar setType={setType}/>

          <div className="flex-grow w-[40%] flex flex-col gap-[1.25rem]">
            {type == "theme" && <Theme />}
            {type == "profile" && <Profile />}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SettingPage;
