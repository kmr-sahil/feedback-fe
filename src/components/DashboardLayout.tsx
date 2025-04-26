"use client";
import React, { useState, useEffect } from "react";
import {
  Bell,
  UserCircle,
  Plus,
  PaperPlaneTilt,
  Question,
  Gear,
  MoneyWavy,
  Newspaper,
  SignOut,
} from "@phosphor-icons/react";
import CustomSelect from "./CustomSelect";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // Import usePathname to detect the current route
import ThemeSwitch from "./ThemeSwitch";
import CreateProject from "./CreateProject";
import toast from "react-hot-toast";
import { useProjectContext } from "../app/projectContext";
import axios from "axios";

export default function DashboardLayout({ children }: any) {
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<any>("");
  const [isVisible, setIsVisible] = useState("");

  const { activeProject, setActiveProject, projects, stats } =
    useProjectContext();
  const [isCreate, setIsCreate] = React.useState(false);

  const onOptionSelect = (projectId: string) => {
    if (projectId === "0") {
      setIsCreate(true);
    } else {
      const selectedProject = projects.find((p) => p.projectId == projectId);
      setActiveProject(
        projectId,
        selectedProject ? selectedProject.name : "Select Project",
        selectedProject.website
      );
    }
  };

  const selectOptions = [
    ...projects.map(({ name, projectId }) => ({
      name,
      value: projectId,
    })),
    { name: "Create New Project", value: "0", icon: <Plus size={16} /> },
  ];

  useEffect(() => {
    //console.log("heheeh - ", projects);
    const filterValue = searchParams.get("filter");
    //console.log(filterValue)
    setFilter(filterValue);
    //console.log(filterValue);
  }, [searchParams]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/feedback/${
          activeProject ?? ""
        }`
      );
      toast.success("Copied");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Show loader if data is being fetched or no projects
  // if (projects.length == 0) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="h-screen flex text-textOne">
      {isCreate && <CreateProject setIsCreate={setIsCreate} />}

      {/* Sidebar */}
      <aside className="w-[100%] min-w-[10rem] max-w-[17rem] border-r-2 border-r-backgroundThree p-[1rem] overflow-y-scroll customscroll text-sm">
        <h1 className="text-lg font-semibold mb-[2rem] flex gap-[0.5rem] ">
          <img src="/images/logo.svg" alt="" />
          TrustFlag.in
        </h1>
        <div className="relative">
          <CustomSelect
            options={selectOptions}
            default={activeProject ?? ""}
            onOptionSelect={onOptionSelect}
          />
        </div>
        <nav className="flex flex-col gap-[rem] text-zinc-600 h-min-screen">
          <div className="flex flex-col">
            <h2 className="text-[0.85rem] font-semibold mt-[2rem] text-zinc-400">
              Inbox
            </h2>
            <span
              className={`flex justify-between w-full items-center px-[0.5rem] py-[0.5rem] rounded-[6px] cursor-pointer ${
                filter == "all" || (filter == null && pathname == "/inbox")
                  ? "bg-backgroundTwo"
                  : ""
              }`}
              onClick={() => router.push("/inbox?filter=all")}
            >
              <p>All</p>{" "}
              <p className="text-xs font-medium text-zinc-400">
                {stats?.totalResponses}
              </p>
            </span>
            <span
              className={`flex justify-between w-full items-center px-[0.5rem] py-[0.5rem] rounded-[6px] cursor-pointer ${
                filter == "issue" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/inbox?filter=issue")}
            >
              <p>Issue</p>{" "}
              <p className="text-xs font-medium text-zinc-400">
                {stats?.issueCount}
              </p>
            </span>
            <span
              className={`flex justify-between w-full items-center px-[0.5rem] py-[0.5rem] rounded-[6px] cursor-pointer ${
                filter == "suggestion" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/inbox?filter=suggestion")}
            >
              <p>Suggestion</p>{" "}
              <p className="text-xs font-medium text-zinc-400">
                {stats?.suggestionCount}
              </p>
            </span>
            <span
              className={`flex justify-between w-full items-center px-[0.5rem] py-[0.5rem] rounded-[6px] cursor-pointer ${
                filter == "liked" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/inbox?filter=liked")}
            >
              <p>Liked</p>{" "}
              <p className="text-xs font-medium text-zinc-400">
                {stats?.likedCount}
              </p>
            </span>
            <span
              className={`px-[0.5rem] py-[0.5rem] rounded-[6px] cursor-pointer ${
                filter == "others" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/inbox?filter=others")}
            >
              Others
            </span>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[0.85rem] font-semibold  mt-[2rem] text-zinc-400">
              Collect and Display
            </h2>
            <span
              className={`px-[0.5rem] py-[0.5rem] rounded-[6px] cursor-pointer ${
                pathname === "/form/widget" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/form/widget")}
            >
              Widget
            </span>
            {/* <span
              className={`px-[0.5rem] py-[0.5rem] text-textOne rounded-[6px] cursor-pointer ${
                pathname === "/form/customize" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/form/customize")}
            >
              Customize
            </span> */}
            <span
              className={`px-[0.5rem] py-[0.5rem] rounded-[6px] cursor-pointer ${
                pathname === "/form/integrate" ? "bg-backgroundTwo" : ""
              }`}
              onClick={() => router.push("/form/integrate")}
            >
              Integrate
            </span>
          </div>

          <div className="w-full mt-[2rem] rounded-[12px] overflow-hidden border-[2px] border-zinc-200 bg-zinc-50">
            <div className="p-[0.75rem] flex flex-col gap-[0.5rem]">
              <h2 className="text-[0.75rem] text-start ">
                Start collecting reviews, with ease and simplicity. Copy the
                link below
              </h2>
              <div className="flex-grow"></div>
              <button
                onClick={() => handleCopyLink()}
                className="bg-[#379777] px-[1rem] py-[0.4rem] text-white rounded-[6px] text-[0.75rem] flex gap-[0.5rem] justify-center items-center"
              >
                Share now <PaperPlaneTilt size={14} />
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className=" border-b-2 border-r-2 border-zinc-200">
          <div className="flex items-center justify-between px-[1rem] py-[1rem]">
            <h1 className="font-semibold"></h1>
            <div className="flex items-center space-x-4 text-zinc-700">
              <ThemeSwitch />
              <button
                className="relative"
                onClick={() => setIsVisible(isVisible == "help" ? "" : "help")}
              >
                <Question size={24} />
                {isVisible == "help" && (
                  <div className="absolute z-50 right-0 max-w-[13rem] bg-zinc-50 rounded-md shadow-sm p-[0.5rem] border-2 border-zinc-200 text-sm">
                    <p className="text-start text-xs">
                      Need help with intergration, understanding or anything ?
                      Mail us, we try to solve within 3 hours.{" "}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("trustflag.in@gmail.com");
                        toast.success("Email Copied");
                      }}
                      className="mt-[1rem] bg-[#379777] px-[0.5rem] py-[0.4rem] text-white rounded-[6px] text-[0.75rem] flex gap-[0.35rem] justify-center items-center"
                    >
                      trustflag.in@gmail.com <PaperPlaneTilt size={12} />
                    </button>
                  </div>
                )}
              </button>
              <button className="">
                <Bell size={24} />
              </button>

              <div className="relative">
                <button
                  onClick={() =>
                    setIsVisible(isVisible == "profile" ? "" : "profile")
                  }
                  className="flex items-center "
                >
                  <UserCircle size={24} />
                </button>

                {isVisible == "profile" && (
                  <div className="absolute z-50 right-0 mt-2 w-[10rem] bg-zinc-50 rounded-md shadow-sm p-[0.35rem] border-2 border-zinc-200">
                    <button
                      onClick={() => router.push("/account/setting")}
                      className="flex items-center gap-[0.35rem] w-[100%] px-[0.5rem] py-[0.35rem] text-[0.8rem] text-end text-zinc-700 hover:bg-zinc-100 rounded-[6px]"
                    >
                      <Gear size={14} />
                      Account Setting
                    </button>
                    <button
                      onClick={() => router.push("/account/plan")}
                      className="flex items-center gap-[0.35rem] w-[100%] px-[0.5rem] py-[0.35rem] text-[0.8rem] text-start text-zinc-700 hover:bg-zinc-100 rounded-[6px]"
                    >
                      <MoneyWavy size={14} />
                      Manage Plan
                    </button>
                    <button
                      onClick={() => router.push("/account/project")}
                      className="flex items-center gap-[0.35rem] w-[100%] px-[0.5rem] py-[0.35rem] text-[0.8rem] text-start text-zinc-700 hover:bg-zinc-100 rounded-[6px]"
                    >
                      <Newspaper size={14} /> Project
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await axios.post(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
                            {},
                            { withCredentials: true }
                          );
                          localStorage.clear();
                          router.push("/business/signin");
                        } catch (error) {
                          console.error("Logout failed:", error);
                        }
                      }}
                      className="flex items-center gap-[0.35rem] w-[100%] px-[0.5rem] py-[0.35rem] text-[0.8rem] text-start text-zinc-700 hover:bg-zinc-100 rounded-[6px]"
                    >
                      <SignOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-[1.5rem] border-r-2">
          {children}
        </main>
      </div>
    </div>
  );
}
