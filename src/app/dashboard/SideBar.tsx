"use client";
import CustomDiv from "@/components/CustomDiv";
import CustomSelect from "@/components/CustomSelect";
import React, { useEffect, useState } from "react";
import { fetchProjects } from "../slices/projectSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

function SideBar() {
  // const dispatch = useAppDispatch();
  // const projects = useAppSelector((state) => state.projectState.projectData);
  // const isLoading = useAppSelector((state) => state.projectState.isLoading);
  // const isError = useAppSelector((state) => state.projectState.isError);
  // const error = useAppSelector((state) => state.projectState.error);

  // useEffect(() => {
  //   dispatch(fetchProjects());
  // }, [dispatch]);

  const handleFunction = (name: string) => {
    if (name.startsWith("Create")) {
      // setCreateProjectModal(true);
    } else {
      console.log(name);
      // setCurrentProject(name);
    }
  };

  const options = [
    // ...projects.map((project) => ({
    //   name: project.name,
    //   value: project.projectId,
    // })),
    {
      name: "Create New Project",
      value: "0",
      icon: "plus",
    },
  ];

  const onOptionSelect = (projectId: string) => {
    localStorage.setItem("projectId", projectId);
  };

  // if (isLoading) {
  //   return null;
  // }

  // if (isError) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="w-[20%] flex flex-col gap-[1.5rem]">
      <CustomSelect
        options={options}
        default={"Select Project"}
        onOptionSelect={onOptionSelect}
      ></CustomSelect>

      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[0.1rem]">
        <CustomDiv label={"All"} number={17} color="#4747FF"></CustomDiv>

        <CustomDiv label={"Issue"} number={3} color="#FF4D4D"></CustomDiv>

        <CustomDiv label={"Suggestion"} number={4} color="#FF9933"></CustomDiv>

        <CustomDiv label={"Love"} number={9} color="#FA52DF"></CustomDiv>

        <CustomDiv label={"Other"} number={0} color="#BFBFBF"></CustomDiv>
      </div>

      {/* <div className="flex flex-col rounded-[12px] overflow-hidden gap-[0.1rem]">
        <CustomDiv label={"Collection 1"} number={6}></CustomDiv>
        <CustomDiv label={"Liked"} number={6}></CustomDiv>
        <CustomDiv label={"Create a new view"} icon="plus"></CustomDiv>
      </div> */}

      {/* <div className="flex flex-col rounded-[12px] overflow-hidden gap-[0.1rem]">
        <CustomDiv label={"Help"} icon="help"></CustomDiv>
        <CustomDiv label={"Form"} icon="help"></CustomDiv>
        <CustomDiv label={"Setting"} icon="help"></CustomDiv>
      </div> */}
      
    </div>
  );
}

export default SideBar;
