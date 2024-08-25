"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MainBar from "./MainBar";
import axios from "axios";

function DashboardPage() {
  const [reveiwData, setReviewData] = useState([]);
  const [projectId, setProject] = useState<string | null>();

  const fetchReviews = async () => {
    try {
      const storedProjectId = localStorage.getItem("projectId");
      setProject(storedProjectId);
      console.log(projectId);
      const res = await axios.get(
        `http://localhost:8080/v1/responses?projectId=${projectId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setReviewData(res.data.responses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [projectId]);

  return (
    <div className="max-w-[80rem] mx-auto mt-[2rem] relative">
      <Navbar />
      <div className="relative flex py-[2rem] justify-between gap-[1.5rem] text-[14px] text-[#4747FF]">
        <SideBar setProjectId={setProject} />
        <MainBar data={reveiwData} projectId={projectId}/>
      </div>
    </div>
  );
}

export default DashboardPage;
