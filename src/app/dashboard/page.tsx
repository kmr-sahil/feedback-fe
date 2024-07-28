"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MainBar from "./MainBar";
import AdBar from "./AdBar";
import CustomInput from "@/components/CustomInput";

function DashboardPage() {
  const [login, setLogin] = useState(false);
  const [responses, setResponses] = useState([]);
  const [addProj, setAddProj] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v1/responses", {
          withCredentials: true,
        });
        setResponses(response.data);
        console.log(response);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setLogin(true);
        }
        console.log(error);
      }
    };

    fetch();
  }, []);
  return (
    <div className="max-w-[80rem] mx-auto mt-[2rem]">
      <Navbar></Navbar>
      <div className="relative flex py-[2rem] justify-between gap-[1.5rem] text-[14px] text-[#4747FF] ">
        {addProj && (
          <div className="absolute m-auto left-0 right-0 top-0 bottom-0 flex flex-col gap-[1rem] p-[1rem] bg-[#e8e8f6] rounded-[12px]">
            <h2 className="font-medium text-[1.1rem]">Create Project</h2>

            <CustomInput label={"Name"} type={"text"}></CustomInput>
            <CustomInput
              label={"Description ( optional )"}
              type={"text"}
            ></CustomInput>
          </div>
        )}
        <SideBar></SideBar>
        <MainBar></MainBar>
        <AdBar></AdBar>
      </div>
    </div>
  );
}

export default DashboardPage;
