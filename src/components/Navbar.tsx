"use client";
import { ThemeProvider } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";
import { Bell, Plus, User } from "@phosphor-icons/react";
import axios from "axios";
import CustomSelect from "./CustomSelect";
import CustomModal from "./CustomModal";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [defaultProject, setDefaultProject] = useState("Select Project");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<{ name: string; description: string }>({
    name: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch projects from API or local storage
  const fetchProjects = useCallback(async () => {
    const cachedProjects = localStorage.getItem("projects");
    const cachedProjectId = localStorage.getItem("projectId");

    if (cachedProjects) {
      const parsedProjects = JSON.parse(cachedProjects);
      setProjects(parsedProjects);

      const selectedProject = parsedProjects.find(
        (p: any) => p.projectId === cachedProjectId
      );
      setDefaultProject(selectedProject ? selectedProject.name : "Select Project");
    } else {
      try {
        const response = await axios.get("http://localhost:8080/v1/projects", {
          withCredentials: true,
        });
        const fetchedProjects = response.data.projects || [];
        setProjects(fetchedProjects);
        localStorage.setItem("projects", JSON.stringify(fetchedProjects));

        const selectedProject = fetchedProjects.find(
          (p: any) => p.projectId === cachedProjectId
        );
        setDefaultProject(selectedProject ? selectedProject.name : "Select Project");
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Create new project
  const onProjectCreate = async () => {
    try {
      await axios.post("http://localhost:8080/v1/project", details, {
        withCredentials: true,
      });
      localStorage.clear();
      fetchProjects();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  // Handle option selection from dropdown
  const onOptionSelect = (projectId: string) => {
    if (projectId === "0") {
      setIsModalOpen(true);
    } else {
      const selectedProject = projects.find((p) => p.projectId === projectId);
      setDefaultProject(selectedProject ? selectedProject.name : "Select Project");
      localStorage.setItem("projectId", projectId);
    }
  };

  // Prepare options for CustomSelect component
  const selectOptions = [
    ...projects.map((p: { name: any; projectId: any }) => ({
      name: p.name,
      value: p.projectId,
    })),
    {
      name: "Create New Project",
      value: "0",
      icon: <Plus size={16} />,
    },
  ];

  return (
    <div className="flex justify-between items-center px-[1rem]">
      {isModalOpen && <CustomModal buttonLabel="Submit" />}
      <img
        onClick={() => router.push("/dashboard")}
        className="w-[12rem]"
        src="/images/feedback-logoFull.svg"
        alt="Feedback Logo"
      />
      <div className="flex gap-[1rem] cursor-pointer text-textOne">
        <div className="w-[200px]">
          {!loading && (
            <CustomSelect
              options={selectOptions}
              default={defaultProject}
              onOptionSelect={onOptionSelect}
            />
          )}
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
