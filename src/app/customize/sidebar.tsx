import CustomDiv from "@/components/CustomDiv";
import SidebarLayout from "@/components/SidebarLayout";
import { useRouter } from "next/navigation";
import React from "react";

const Sidebar = ({setType}:any) => {
  const router = useRouter();

  return (
    <SidebarLayout>
      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[6px] p-[6px] bg-backgroundOne border-special border-backgroundTwo">
        <CustomDiv
          label={"Setup Form link"}
          onClick={() => setType("form")}
        />
        <CustomDiv
          label={"Setup Widget"}
          onClick={() => setType("widget")}
        />
        <CustomDiv
          label={"Inputs"}
          onClick={() => setType("input")}
        />
        <CustomDiv
          label={"Templates"}
          onClick={() => setType("templates")}
        />
      </div>
    </SidebarLayout>
  );
};

export default Sidebar;
