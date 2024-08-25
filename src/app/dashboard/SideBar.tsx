"use client";
import CustomDiv from "@/components/CustomDiv";
import CustomSelect from "@/components/CustomSelect";
import React, { useCallback, useEffect, useState } from "react";
import CustomModal from "@/components/CustomModal";
import CustomInput from "@/components/CustomInput";
import axios from "axios";

function SideBar({setProjectId}:any) {
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
      
      setDefaultProject(selectedProject ? selectedProject.name : "Select Project");
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
        
        setDefaultProject(selectedProject ? selectedProject.name : "Select Project");
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false)
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
      icon: "plus",
    },
  ];

  if(loading){
    return <div>Loading...</div>
  }

  const onOptionSelect = (projectId: string) => {
    if (projectId === "0") {
      setIsModal(true);
    } else {
      const selectedProject = project.find((p) => p.projectId === projectId);
      setDefaultProject(selectedProject ? selectedProject.name : "Select Project");
      localStorage.setItem("projectId", projectId);
      setProjectId(projectId)
    }
  };

  const modalContent = (
    <>
      <CustomInput
        label={"Name"}
        type={"text"}
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
      />
      <CustomInput
        label={"Description"}
        type={"text"}
        onChange={(e) =>
          setDetails({ ...details, description: e.target.value })
        }
      />
    </>
  );

  return (
    <div className="w-[20%] flex flex-col gap-[1.5rem]">
      {isModal && (
        <CustomModal
          content={modalContent}
          buttonLabel="Submit"
          onSubmitButton={onProjectCreate}
          title=" Create a project"
          onClose={() => setIsModal(false)}
        />
      )}

      <CustomSelect
        options={options}
        default={defaultProject}
        onOptionSelect={onOptionSelect}
      />

      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[0.1rem]">
        <CustomDiv label={"All"} number={17} color="#4747FF" />
        <CustomDiv label={"Issue"} number={3} color="#FF4D4D" />
        <CustomDiv label={"Suggestion"} number={4} color="#FF9933" />
        <CustomDiv label={"Love"} number={9} color="#FA52DF" />
        <CustomDiv label={"Other"} number={0} color="#BFBFBF" />
      </div>
    </div>
  );
}

export default SideBar;
