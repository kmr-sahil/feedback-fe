"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import WallOfLove from "./SubPages/wallOfLove";

const IntegrationPage = () => {
  const [page, setPage] = useState(0);

  return (
    <div className="max-w-[80rem] mx-auto mt-[2rem] relative">
      <Navbar />
      <div className="flex gap-[2rem]">
        <Sidebar setPage={setPage} />

        <div className="flex-grow w-[40%] flex flex-col gap-[1.25rem]">
          {page == 0 && <WallOfLove />}
        </div>
      </div>
    </div>
  );
};

export default IntegrationPage;
