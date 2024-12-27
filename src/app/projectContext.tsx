"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProjectContextProps {
  activeProject: string | null;
  setActiveProject: (projectId: string, projectName: string, website:string) => void;
  projects: any[];
  fetchProjects: () => void;
  stats: any;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProject, setActiveProjectState] = useState<string | null>(null);
  const [stats, setStats] = useState<any>();

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/user`,
        { withCredentials: true }
      );
         
      if (!activeProject && response.data.projects.length > 0) {
        
        const firstProject = response.data.projects[0];
        setActiveProject(firstProject.projectId, firstProject.name, firstProject.website);
      }
      setProjects(response.data.projects);
    } catch (error: any) {
      if (error.status === 401) {
        localStorage.clear();
        router.push("/business/signin");
      } else {
        console.error("Failed to fetch projects:", error);
      }
    }
  };

  const fetchStats = async (projectId: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/helper/stats?projectId=${projectId}`,
        { withCredentials: true }
      );

      console.log(res);
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setActiveProject = (projectId: string, projectName: string, website: string) => {
    setActiveProjectState(projectId);
    localStorage.setItem("website", website);
    // Add additional project-related logic if needed
  };

  useEffect(() => {
    fetchProjects();
    if (activeProject) {
      fetchStats(activeProject);
    }
  }, [activeProject]);

  return (
    <ProjectContext.Provider
      value={{
        activeProject,
        setActiveProject,
        projects,
        fetchProjects,
        stats,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};
