"use client";
import React, { useState, useEffect } from "react";
import { Bell, UserCircle, Plus } from "@phosphor-icons/react";
import CustomSelect from "./CustomSelect";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // Import usePathname to detect the current route
import ThemeSwitch from "./ThemeSwitch";
import CreateProject from "./CreateProject";
import CustomButton from "./CustomButton";
import toast from "react-hot-toast";

export default function DashboardLayout({ children }: any) {
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<any>("");
  const [activeProject, setActiveProject] = useState("Select Project");
  const [projects, setProjects] = useState<any[]>([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCreate, setIsCreate] = useState(false);

  // Fetch projects from API or local storage
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectId = localStorage.getItem("projectId") || null;

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/user`,
          {
            withCredentials: true,
          }
        );

        const fetchedProjects = response.data.projects;
        setProjects(fetchedProjects);

        // Set the active project name if projectId exists
        if (projectId) {
          const selectedProject = fetchedProjects.find(
            (p: any) => p.projectId === projectId
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

  useEffect(() => {
    const filterValue = searchParams.get("filter");
    setFilter(filterValue);
    console.log(filterValue)
  }, [searchParams]);

  const onOptionSelect = (projectId: string) => {
    if (projectId === "0") {
      // Logic for creating a new project
      setIsCreate(true);
    } else {
      const selectedProject = projects.find((p) => p.projectId === projectId);
      setActiveProject(
        selectedProject ? selectedProject.name : "Select Project"
      );
      localStorage.setItem("projectId", projectId);
      window.location.reload();
    }
  };

  const selectOptions = [
    ...projects.map(({ name, projectId }) => ({
      name,
      value: projectId,
    })),
    { name: "Create New Project", value: "0", icon: <Plus size={16} /> },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${
          process.env.NEXT_PUBLIC_FRONTEND_URL
        }/feedback/${localStorage.getItem("projectId")}`
      );
      toast.success("Copied");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="h-screen flex text-textOne">
      {isCreate && <CreateProject setIsCreate={setIsCreate} />}

      {/* Sidebar */}
      <aside className="w-[100%] max-w-[18rem] bg-backgroundOne border-r-2 border-r-backgroundThree p-[1.5rem] overflow-y-scroll">
         <h1 className="text-xl font-semibold pl-[1rem] mb-[2rem] flex gap-[0.5rem] ">
          <img src="/images/logo.svg" alt="" />
          TrustFlag.in
        </h1> 
        <div className="relative">
          <CustomSelect
            options={selectOptions}
            default={activeProject}
            onOptionSelect={onOptionSelect}
          />
        </div>
        <nav className="flex flex-col gap-[1rem]">
          <div className="flex flex-col">
            <h2 className="text-[0.85rem] font-semibold mt-[2rem] text-textTwo">
              Inbox
            </h2>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne rounded-[6px] cursor-pointer ${
                filter == "all" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/inbox?filter=all")}
            >
              All
            </span>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne rounded-[6px] cursor-pointer ${
                filter == "issue" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/inbox?filter=issue")}
            >
              Issue
            </span>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne rounded-[6px] cursor-pointer ${
                filter == "suggestion" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/inbox?filter=suggestion")}
            >
              Suggestion
            </span>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne rounded-[6px] cursor-pointer ${
                filter == "liked"
                  ? "bg-backgroundTwo?filter=liked"
                  : ""
              }`}
              onClick={() => router.push("/inbox?filter=liked")}
            >
              Liked
            </span>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne rounded-[6px] cursor-pointer ${
                filter == "others" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/inbox?filter=others")}
            >
              Others
            </span>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[0.85rem] font-semibold  mt-[2rem] text-textTwo">
              Collect and Display
            </h2>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne rounded-[6px] cursor-pointer ${
                pathname === "/form/widget" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/form/widget")}
            >
              Widget
            </span>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne rounded-[6px] cursor-pointer ${
                pathname === "/form/customize" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/form/customize")}
            >
              Customize
            </span>
            <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne rounded-[6px] cursor-pointer ${
                pathname === "/form/integrate" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/form/integrate")}
            >
              Integrate
            </span>
          </div>

          <div className="w-full max-w-md mx-auto bg-backgroundOne rounded-[12px] overflow-hidden border-[2px] border-backgroundThree">
            <div className="p-[1rem] flex flex-col h-full">
              <h2 className="text-[0.9rem] text-start mb-4">
                Start collecting reviews
              </h2>
              <div className="flex-grow"></div>
              <CustomButton
                label={"Share Link"}
                onClick={() => handleCopyLink()}
                type="secondary"
              />
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-backgroundOne border-b-2 border-backgroundThree">
          <div className="flex items-center justify-between px-[3.5rem] py-[1rem]">
            <h1 className="font-semibold">Dashboard</h1>
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

                {isProfileMenuOpen && (
                  <div className="absolute z-50 right-0 mt-2 w-[10rem] bg-backgroundOne rounded-md shadow-sm p-[0.5rem] border-2 border-backgroundThree">
                    <button
                      onClick={() => router.push("/account/setting")}
                      className="block w-[100%] px-[0.5rem] py-2 text-sm text-start text-textOne hover:bg-backgroundThree rounded-[6px]"
                    >
                      Account Setting
                    </button>
                    <button
                      onClick={() => router.push("/account/plan")}
                      className="block w-[100%] px-[0.5rem] py-2 text-sm text-start text-textOne hover:bg-backgroundThree rounded-[6px]"
                    >
                      Manage Plan
                    </button>
                    <button
                      onClick={() => {
                        // Handle logout logic
                        localStorage.clear();
                        router.push("/business/signin");
                      }}
                      className="block w-[100%] px-[0.5rem] py-2 text-sm text-start text-textOne hover:bg-backgroundThree rounded-[6px]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-[3rem]">{children}</main>
      </div>
    </div>
  );
}
