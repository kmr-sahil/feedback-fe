"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MainBar from "./MainBar";
import axios from "axios";
import ParentLayout from "@/components/ParentLayout";
import ChildLayout from "@/components/ChildLayout";
import PageLayout from "@/components/PageLayout";

function DashboardPage() {
  const [reveiwData, setReviewData] = useState([]);
  const [projectId, setProject] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const storedProjectId = localStorage.getItem("projectId");
      console.log(storedProjectId)
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [projectId]);

  return (
    <ParentLayout>
      <Navbar />
      <ChildLayout>
        <SideBar setProjectId={setProject} />
        {!loading && projectId && (
          <PageLayout>
            <MainBar data={reveiwData} projectId={projectId} />
          </PageLayout>
        )}
      </ChildLayout>
    </ParentLayout>
  );
}

export default DashboardPage;
