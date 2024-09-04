"use client";
import { ThemeProvider } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";
import { Bell, Plus, User } from "@phosphor-icons/react";
import axios from "axios";
import CustomSelect from "./CustomSelect";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter()
  const [project, setProject] = useState<any[]>([]);
  const [defaultProject, setDefaultProject] = useState("Select Project");
  const [loading, setLoading] = useState(true);

  const fetchProject = useCallback(async () => {
    const cachedProjects = localStorage.getItem("projects");
    const cachedProjectId = localStorage.getItem("projectId");

    if (cachedProjects) {
      const parsedProjects = JSON.parse(cachedProjects);
      setProject(parsedProjects);

      const selectedProject = parsedProjects.find(
        (p: any) => p.projectId === cachedProjectId
      );

      setDefaultProject(
        selectedProject ? selectedProject.name : "Select Project"
      );
    } else {
      try {
        const response = await axios.get("http://localhost:8080/v1/project", {
          withCredentials: true,
        });
        const projects = response.data.projects || [];
        setProject(projects);
        localStorage.setItem("projects", JSON.stringify(projects));

        // Set default to the first project or "Select Project"
        const selectedProject = projects.find(
          (p: any) => p.projectId === cachedProjectId
        );

        setDefaultProject(
          selectedProject ? selectedProject.name : "Select Project"
        );
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const [details, setDetails] = useState<any>({
    name: "",
    description: "",
  });

  const onProjectCreate = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/v1/project",
        details,
        {
          withCredentials: true,
        }
      );
      // Refresh projects after creation
      localStorage.clear();
      fetchProject();
    } catch (error) {
      console.log(error);
    }
  };

  const [isModal, setIsModal] = useState(false);

  const options = [
    ...project.map((project: { name: any; projectId: any }) => ({
      name: project.name,
      value: project.projectId,
    })),
    {
      name: "Create New Project",
      value: "0",
      icon: <Plus size={16} />,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  const onOptionSelect = (projectId: string) => {
    if (projectId === "0") {
      setIsModal(true);
    } else {
      const selectedProject = project.find((p) => p.projectId === projectId);
      setDefaultProject(
        selectedProject ? selectedProject.name : "Select Project"
      );
      localStorage.setItem("projectId", projectId);
    }
  };

  return (
    <div className="flex justify-between items-center px-[1rem]">
      <img onClick={() => router.push("/dashboard")} className="w-[12rem]" src="/images/feedback-logoFull.svg" alt="" />
      <div className="flex gap-[1rem] cursor-pointer text-textOne">
        <div className="w-[200px]">
          <CustomSelect
            options={options}
            default={defaultProject}
            onOptionSelect={onOptionSelect}
          />
        </div>

        <div className="flex justify-center items-center rounded-[8px] px-[0.75rem] py-[10px] bg-backgroundOne border-special border-backgroundTwo">
          <Bell size={16} weight="bold" />
        </div>
        <div className="flex justify-center items-center rounded-[8px] px-[0.75rem] py-[10px] bg-backgroundOne border-special border-backgroundTwo">
          <User size={16} weight="bold" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
