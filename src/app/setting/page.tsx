"use client";
import React, { Suspense, useState } from "react";
import Sidebar from "./sideBar";
import Navbar from "@/components/Navbar";
import Theme from "./SubPages/theme";
import Profile from "./SubPages/profile";
import ParentLayout from "@/components/ParentLayout";
import ChildLayout from "@/components/ChildLayout";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";

const SettingPage = () => {
  const router = useRouter();
  const [type, setType] = useState("");
  return (
    <ParentLayout>
      <Navbar />
      {/* <div
        onClick={() => router.back()}
        className="cursor-pointer m-[1rem] w-[20%] mr-auto flex justify-start items-center gap-[0.5rem] p-[1rem] hover:bg-backgroundTwo rounded-[12px] text-[14px]"
      >
        {" "}
        <ArrowLeft size={16} /> Back to Dashboard
      </div> */}

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
