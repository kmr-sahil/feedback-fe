"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import WallOfLove from "./SubPages/wallOfLove";
import Snippet from "./SubPages/snippet";
import ApiInt from "./SubPages/apiInt";
import ParentLayout from "@/components/ParentLayout";
import ChildLayout from "@/components/ChildLayout";

const IntegrationPage = () => {
  const [type, setType] = useState("");
  return (
    <ParentLayout>
      <Navbar />
      <ChildLayout>
        <Sidebar setType={setType} />

        <div className="flex-grow w-[40%] flex flex-col gap-[1.25rem]">
          {type == "walloflove" && <WallOfLove />}
          {type == "snippet" && <Snippet />}
          {type == "api" && <ApiInt />}
        </div>
      </ChildLayout>
    </ParentLayout>
  );
};

export default IntegrationPage;
