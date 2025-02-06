"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProjectContextProps {
  isAuth: boolean;
  loading: boolean;
  activeProject: string | null;
  setActiveProject: (
    projectId: string,
    projectName: string,
    website: string
  ) => void;
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
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/user`,
        { withCredentials: true }
      );

      if (!activeProject && response.data.projects.length > 0) {
        const firstProject = response.data.projects[0];
        setActiveProject(
          firstProject.projectId,
          firstProject.name,
          firstProject.website
        );
      }

      setProjects(response.data.projects);
      setIsAuth(true);
    } catch (error: any) {
      if (error.status === 401) {
        setIsAuth(false);
      } else {
        console.error("Failed to fetch projects:", error);
      }
    } finally {
      // Delay setting loading to ensure isAuth is set first
      setTimeout(() => {
        setLoading(false);
      }, 100); // Small delay to allow state updates
    }
  };

  const fetchStats = async (projectId: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/helper/stats?projectId=${projectId}`,
        { withCredentials: true }
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setActiveProject = (
    projectId: string,
    projectName: string,
    website: string
  ) => {
    setActiveProjectState(projectId);
    localStorage.setItem("website", website);
  };

  useEffect(() => {
    setLoading(true);
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeProject) {
      fetchStats(activeProject);
    }
  }, [activeProject]);

  return (
    <ProjectContext.Provider
      value={{
        isAuth,
        loading,
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
