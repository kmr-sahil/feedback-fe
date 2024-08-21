"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MainBar from "./MainBar";

function DashboardPage() {
  return (
    <div className="max-w-[80rem] mx-auto mt-[2rem] relative">
      <Navbar />
      <div className="relative flex py-[2rem] justify-between gap-[1.5rem] text-[14px] text-[#4747FF]">
        <SideBar />
        <MainBar />
      </div>
    </div>
  );
}

export default DashboardPage;
