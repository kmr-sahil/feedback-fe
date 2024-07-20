"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MainBar from "./MainBar";
import AdBar from "./AdBar";

function DashboardPage() {
  const [login, setLogin] = useState(false);
  const [responses, setResponses] = useState([]);

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
      <div className="flex py-[2rem] justify-between gap-[1.5rem] text-[14px] text-[#4747FF] ">
        <SideBar></SideBar>

        <MainBar></MainBar>
        <AdBar></AdBar>
      </div>
    </div>
  );
}

export default DashboardPage;
