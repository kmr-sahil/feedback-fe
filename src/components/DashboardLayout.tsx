"use client"
import React, { useState, useEffect } from "react";
import { Bell, UserCircle, Plus } from "@phosphor-icons/react";
import CustomSelect from "./CustomSelect";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname to detect the current route
import ThemeSwitch from "./ThemeSwitch";

export default function DashboardLayout({ children, filter, setFilter }: any) {
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const [activeProject, setActiveProject] = useState("Select Project");
  const [projects, setProjects] = useState<any[]>([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch projects from API or local storage
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const cachedProjects = localStorage.getItem("projects");
        const cachedProjectId = localStorage.getItem("projectId");

        if (cachedProjects) {
          const parsedProjects = JSON.parse(cachedProjects);
          setProjects(parsedProjects);
          const selectedProject = parsedProjects.find(
            (p: any) => p.projectId === cachedProjectId
          );
          setActiveProject(
            selectedProject ? selectedProject.name : "Select Project"
          );
        } else {
          const response = await axios.get(
            "http://localhost:8080/v1/projects",
            {
              withCredentials: true,
            }
          );
          const fetchedProjects = response.data.projects || [];
          setProjects(fetchedProjects);
          localStorage.setItem("projects", JSON.stringify(fetchedProjects));

          const selectedProject = fetchedProjects.find(
            (p: any) => p.projectId === cachedProjectId
          );
          setActiveProject(
            selectedProject ? selectedProject.name : "Select Project"
          );
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const onOptionSelect = (projectId: string) => {
    if (projectId === "0") {
      // Logic for creating a new project
    } else {
      const selectedProject = projects.find((p) => p.projectId === projectId);
      setActiveProject(
        selectedProject ? selectedProject.name : "Select Project"
      );
      localStorage.setItem("projectId", projectId);
    }
  };

  const selectOptions = [
    ...projects.map(({ name, projectId }) => ({
      name,
      value: projectId,
    })),
    { name: "Create New Project", value: "0", icon: <Plus size={16} /> },
  ];

  const handleFilterClick = (filterValue: string) => {
    if (pathname.startsWith("/form")) {
      // If on a form route, don't use setFilter
      router.push("/inbox")
      console.log(`Filter ${filterValue} clicked, but ignored on form routes`);
    } else if (typeof setFilter === "function") {
      // Only call setFilter if it's a function (i.e., on inbox routes)
      setFilter(filterValue);
    }
  };

  return (
    <div className="h-screen flex text-textOne">
      {/* Sidebar */}
      <aside className="w-[16rem] bg-backgroundOne border-r-2 border-r-backgroundThree p-[1.5rem]">
        <h1 className="mb-[1rem] font-semibold">trustbuddy.ai</h1>
        <div className="relative">
          <CustomSelect
            options={selectOptions}
            default={activeProject}
            onOptionSelect={onOptionSelect}
          />
        </div>
        <nav className="flex flex-col gap-[1rem]">
          <div className="flex flex-col">
            <h2 className="text-[0.85rem] font-semibold mb-[1rem] mt-[2rem] text-textTwo">
              Inbox
            </h2>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne ${pathname == "/inbox" && filter == "" ? "bg-yellow-500" : ""}`}
              onClick={() => handleFilterClick("")}
            >
              All
            </span>
            <span
             className={`px-[0.5rem] py-[0.5rem] text-textOne ${pathname == "/inbox" && filter == "Issue" ? "bg-yellow-500" : ""}`}
              onClick={() => handleFilterClick("Issue")}
            >
              Issue
            </span>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne ${pathname == "/inbox" && filter == "Suggestion" ? "bg-yellow-500" : ""}`}
              onClick={() => handleFilterClick("Suggestion")}
            >
              Suggestion
            </span>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne ${pathname == "/inbox" && filter == "Liked" ? "bg-yellow-500" : ""}`}
              onClick={() => handleFilterClick("Liked")}
            >
              Liked
            </span>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne ${pathname == "/inbox" && filter == "Others" ? "bg-yellow-500" : ""}`}
              onClick={() => handleFilterClick("Others")}
            >
              Others
            </span>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[0.85rem] font-semibold mb-[1rem] mt-[2rem] text-textTwo">
              Form
            </h2>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne ${pathname === "/form/customize" ? "bg-yellow-500" : ""}`}
              onClick={() => router.push("/form/customize")}
            >
              Customize
            </span>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne ${pathname === "/form/integrate" ? "bg-yellow-500" : ""}`}
              onClick={() => router.push("/form/integrate")}
            >
              Integrate
            </span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-backgroundOne border-b-2 border-backgroundThree">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <ThemeSwitch />
              <button className="text-textOne">
                <Bell size={24} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center text-textOne"
                >
                  <UserCircle size={24} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
