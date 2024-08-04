"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MainBar from "./MainBar";
import AdBar from "./AdBar";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

function DashboardPage() {

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  return (
    <div className="max-w-[80rem] mx-auto mt-[2rem]">
      <Navbar />
      <div className="relative flex py-[2rem] justify-between gap-[1.5rem] text-[14px] text-[#4747FF]">
        {false && (
          <div className="fixed w-[20rem] h-[25rem] m-auto left-0 right-0 -top-[8rem] bottom-0 flex flex-col gap-[1rem] p-[1rem] bg-bgColor rounded-[12px] shadow-[0_20px_40px_2px_rgba(0,0,210,0.1)]">
            <h2 className="font-medium text-[1.1rem]">Create Project</h2>
            <CustomInput label={"Name"} type={"text"} onChange={(e) => setProjectName(e.target.value)}/>
            <CustomInput label={"Description ( optional )"} type={"text"} onChange={(e) => setProjectDesc(e.target.value)} />
            <CustomButton label={"Submit"}></CustomButton>
            <CustomButton
              label={"Cancel"}
              type="secondary"
              //onClick={() => setCreateProjectModal(false)}
            ></CustomButton>
          </div>
        )}
        <SideBar />
        <MainBar />
        <AdBar />
      </div>
    </div>
  );
}

export default DashboardPage;
