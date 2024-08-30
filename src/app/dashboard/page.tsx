"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MainBar from "./MainBar";
import axios from "axios";

function DashboardPage() {
  const [reveiwData, setReviewData] = useState([]);
  const [projectId, setProject] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const storedProjectId = localStorage.getItem("projectId");
      setProject(storedProjectId);
      console.log(projectId);
      const res = await axios.get(
        `http://localhost:8080/v1/responses?projectId=${storedProjectId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setReviewData(res.data.responses);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [projectId]);

  return (
    <div className="max-w-[80rem] mx-auto mt-[2rem] relative">
      <Navbar />
      <div className="relative flex py-[2rem] justify-between gap-[1.5rem] text-[14px]">
        <SideBar setProjectId={setProject} />
        {!loading && <MainBar data={reveiwData} projectId={projectId}/>}
      </div>
    </div>
  );
}

export default DashboardPage;
