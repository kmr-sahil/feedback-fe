"use client";
import React, { Suspense, useState } from "react";
import Sidebar from "./sideBar";
import Navbar from "@/components/Navbar";
import Theme from "./SubPages/theme";
import Profile from "./SubPages/profile";
import ParentLayout from "@/components/ParentLayout";
import ChildLayout from "@/components/ChildLayout";

const SettingPage = () => {
  const [type, setType] = useState("");
  return (
    <ParentLayout>
      <Navbar />
      <ChildLayout>
        <Sidebar setType={setType} />

        <div className="flex-grow w-[40%] flex flex-col gap-[1.25rem]">
          {type == "theme" && <Theme />}
          {type == "profile" && <Profile />}
        </div>
      </ChildLayout>
    </ParentLayout>
  );
};

export default SettingPage;
