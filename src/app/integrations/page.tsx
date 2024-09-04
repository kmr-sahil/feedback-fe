"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import WallOfLove from "./SubPages/wallOfLove";
import Snippet from "./SubPages/snippet";
import ApiInt from "./SubPages/apiInt";

const IntegrationPage = () => {
  const [type, setType] = useState("");
  return (
    <div className="max-w-[80rem] mx-auto mt-[2rem] relative">
      <Navbar />
      <div className="flex gap-[2rem]">
        <Sidebar setType={setType} />

        <div className="flex-grow w-[40%] flex flex-col gap-[1.25rem]">
          {type == "walloflove" && <WallOfLove />}
          {type == "snippet" && <Snippet />}
          {type == "api" && <ApiInt />}
        </div>
      </div>
    </div>
  );
};

export default IntegrationPage;
