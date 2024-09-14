"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Form from "./SubPages/form";
import Widget from "./SubPages/widget";
import Inputs from "./SubPages/inputs";
import Templates from "./SubPages/templates";
import ParentLayout from "@/components/ParentLayout";
import ChildLayout from "@/components/ChildLayout";
import PageLayout from "@/components/PageLayout";
import axios from "axios";
import { toast } from "sonner";

interface AdjustInputs {
  isEmailReq: boolean;
  isNameInputReq: boolean;
  isNameReq: boolean;
}

interface ProjectDetails {
  adjustForm: AdjustInputs;
  createdAt: string;
  description: string;
  logoUrl: string;
  name: string;
  projectId: string;
  userId: string;
}

const CustomizePage = () => {
  const [type, setType] = useState<string>("");
  const [projectDetails, setProjectDetails] = useState<
    ProjectDetails | undefined
  >(undefined);

  useEffect(() => {
    const projectId = localStorage.getItem("projectId");
    if (projectId) {
      getProjectDetail(projectId);
    }
  }, []);

  const getProjectDetail = async (projectId: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/v1/project`, {
        params: { projectId }, // Use params to include query parameters
      });
      const details = response.data; // Access data from the response
      console.log(details);
      setProjectDetails(details.project); // Ensure `details.project` is correctly typed
    } catch (error) {
      console.log(error);
      toast("Error fetching project");
    }
  };

  return (
    <ParentLayout>
      <Navbar />
      <ChildLayout>
        <Sidebar setType={setType} />

        <PageLayout>
          {type === "form" && <Form />}
          {type === "widget" && <Widget />}
          {type === "input" && projectDetails?.adjustForm && (
            <Inputs intialDetails={projectDetails.adjustForm} />
          )}
          {type === "templates" && <Templates />}
        </PageLayout>
      </ChildLayout>
    </ParentLayout>
  );
};

export default CustomizePage;
