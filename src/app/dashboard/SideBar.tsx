"use client";
import CustomDiv from "@/components/CustomDiv";
import CustomSelect from "@/components/CustomSelect";
import React, { useState } from "react";
import { createProjectModalState, currentProjectState } from "../recoilContextProvider";
import { useRecoilState } from "recoil";

function SideBar() {
  const [currentProject, setCurrentProject] =
    useRecoilState(currentProjectState);
  //const [projects, setProjects] = useState(false);
  const [createProjectModal, setCreateProjectModal] = useRecoilState(createProjectModalState);

  const handleFunction = (name: string) => {
    if (name.startsWith("Create")) {
      setCreateProjectModal(true);
    } else {
      console.log(name);
      setCurrentProject(name);
    }
  };

  const options = [
    // {
    //   name: "PotionAi",
    //   onClick: () => handleFunction("PotionAi"),
    // },
    // {
    //   name: "SiteGPT",
    //   onClick: () => handleFunction("SiteGPT"),
    // },
    {
      name: "Create New Project",
      onClick: () => handleFunction("Create New Project"),
      icon: "plus",
    },
  ];

  return (
    <div className="w-[20%] flex flex-col gap-[1.5rem]">
      <CustomSelect options={options} default={"Select Project"}></CustomSelect>

      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[0.1rem]">
        <CustomDiv label={"All"} number={17} color="#4747FF"></CustomDiv>

        <CustomDiv label={"Issue"} number={3} color="#FF4D4D"></CustomDiv>

        <CustomDiv label={"Suggestion"} number={4} color="#FF9933"></CustomDiv>

        <CustomDiv label={"Love"} number={9} color="#FA52DF"></CustomDiv>

        <CustomDiv label={"Other"} number={0} color="#BFBFBF"></CustomDiv>
      </div>

      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[0.1rem]">
        <CustomDiv label={"Collection 1"} number={6}></CustomDiv>
        <CustomDiv label={"Liked"} number={6}></CustomDiv>
        <CustomDiv label={"Create a new view"} icon="plus"></CustomDiv>
      </div>

      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[0.1rem]">
        <CustomDiv label={"Help"} icon="help"></CustomDiv>
        <CustomDiv label={"Form"} icon="help"></CustomDiv>
        <CustomDiv label={"Setting"} icon="help"></CustomDiv>
      </div>
    </div>
  );
}

export default SideBar;
